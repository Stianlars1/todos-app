// Decode JWT payload (using atob available in Edge runtime) and check expiration.
// We treat the token as expired if less than 5 minutes remain.

import { API_REFRESH_TOKEN_URL, ROUTE_ROOT, ROUTE_SIGN_IN } from "@/utils/urls";
import {
  PROTECTED_PATHS,
  PUBLIC_PATHS,
  PUBLIC_PATHS_NO_REDIRECT,
} from "@/middlewarePaths";
import { NextRequest, NextResponse } from "next/server";
import { FIVE_MINUTES, getCookieOptions } from "@/utils/cookies";
import {
  ACCESS_TOKEN_COOKIE_MAX_AGE,
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
  COOKIE_USER_TOKEN,
  REFRESH_TOKEN_COOKIE_MAX_AGE,
} from "@/utils/cookiesConstants";
import { APPLICATION_JSON_V1 } from "@/utils/fetch/fetch";
import { AuthResponse } from "@/types/auth";

// Improved throttling - shorter window and better name
const REFRESH_THROTTLE_COOKIE = "refreshThrottle";
// Use milliseconds for more precision - 5 seconds
const REFRESH_THROTTLE_DURATION = 5000;
// Minimum time before token expiration to trigger a refresh (in seconds)
const REFRESH_BEFORE_EXPIRY = 60;

export function isRootPath(pathname: string): boolean {
  return pathname.toLowerCase() == ROUTE_ROOT.toLowerCase();
}

export function isPublicPath(pathname: string): boolean {
  // First check if it's a protected path
  if (
    PROTECTED_PATHS.some((protectedPath) => pathname.startsWith(protectedPath))
  ) {
    return false;
  }

  // Then check exact matches for static paths
  if (PUBLIC_PATHS.includes(pathname)) {
    return true;
  }

  // For dynamic username routes at root level
  // Check if it's just a single segment path (username)
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 1) {
    // Single segment = username route
    // This is a guessing theory only Todo
    return true;
  }

  // For verify routes
  if (pathname.startsWith("/verify/")) {
    return true;
  }

  return false;
}

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some((protectedPath) =>
    pathname.startsWith(protectedPath),
  );
}

export function isNoRedirectPage(pathname: string): boolean {
  return PUBLIC_PATHS_NO_REDIRECT.some(
    (protectedPath) => pathname === protectedPath,
  );
}

export async function addReturnToCookieToResponse(
  req: NextRequest,
  res: NextResponse,
) {
  const referer = req.headers.get("referer");
  //console.log("referer", req);
  if (referer) {
    const returnPath = new URL(referer).pathname;

    if (isNoRedirectPage(returnPath)) {
      const hasReturnPath = !!req.cookies.get("returnTo")?.value;

      if (hasReturnPath) {
        return res;
      }

      res.cookies.set("returnTo", ROUTE_ROOT, getCookieOptions(FIVE_MINUTES));
      return res;
    }

    res.cookies.set("returnTo", returnPath, getCookieOptions(FIVE_MINUTES));

    return res;
  }

  return res;
}

// Redirect to sign-in page while preserving original path
export async function redirectToSignIn(req: NextRequest) {
  const signInUrl = new URL(ROUTE_SIGN_IN, req.url);
  const path = req.nextUrl.pathname;
  if (path === ROUTE_SIGN_IN) {
    const res = NextResponse.next();
    return addReturnToCookieToResponse(req, res);
  }

  return NextResponse.redirect(signInUrl);
}

/**
 * Improved throttle check - uses milliseconds for more precision
 * and checks the difference between now and last refresh
 */
export function shouldRefreshToken(
  req: NextRequest,
  tokenExpiresInSeconds: number,
): boolean {
  const lastRefresh = req.cookies.get(REFRESH_THROTTLE_COOKIE)?.value;

  // If token is about to expire soon, override throttle
  const isExpiringVeryShortly = tokenExpiresInSeconds < 30;
  if (isExpiringVeryShortly) {
    return true;
  }

  if (!lastRefresh) {
    return true;
  }

  try {
    const lastRefreshTime = parseInt(lastRefresh, 10);
    const currentTime = Date.now();
    const timeSinceLastRefresh = currentTime - lastRefreshTime;

    // Only refresh if enough time has passed since last refresh
    return timeSinceLastRefresh > REFRESH_THROTTLE_DURATION;
  } catch (error) {
    console.error("Error parsing throttle timestamp:", error);
    return true;
  }
}

/**
 * Calculate token expiry time in seconds
 */
export function getTokenExpiryTimeInSeconds(token?: string): number {
  try {
    if (!token) return 0;

    // Get expiry information from token without verification
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString(),
    );

    if (!payload.exp) return 0;

    const expiryTime = payload.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();

    return Math.max(0, Math.floor((expiryTime - currentTime) / 1000));
  } catch (error) {
    console.error("Error calculating token expiry:", error);
    return 0;
  }
}

export function isTokenExpired(token?: string): boolean {
  if (!token) return true;
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    const exp = decoded.exp * 1000;
    return Date.now() >= exp - 5 * 60 * 1000;
  } catch {
    return true;
  }
}

/**
 * Refreshes the access token using the refresh token
 * Uses cache control and proper feedback handling
 */
export async function refreshAccessToken(refreshToken: string) {
  if (!refreshToken || refreshToken === "undefined") {
    return null;
  }

  try {
    const res = await fetch(API_REFRESH_TOKEN_URL, {
      method: "POST",
      headers: {
        ...APPLICATION_JSON_V1,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({ message: "Unknown feedback" }));
      console.error("Error refreshing access token:", errorData);
      return null;
    }

    return (await res.json()) as AuthResponse;
  } catch (error) {
    console.error("Exception refreshing access token:", error);
    return null;
  }
}

/**
 * Sets the throttle timestamp cookie immediately when refresh is attempted
 * This prevents other concurrent requests from also attempting a refresh
 */
function setRefreshThrottleCookie(res: NextResponse): void {
  const cookieOptions = {
    ...getCookieOptions(REFRESH_THROTTLE_DURATION / 1000),
  };

  res.cookies.set(
    REFRESH_THROTTLE_COOKIE,
    Date.now().toString(),
    cookieOptions,
  );
}

/**
 * Handle token refresh with improved throttling logic
 */
export async function handleTokenRefresh(
  req: NextRequest,
  res: NextResponse,
  forceRefresh = false,
) {
  const accessToken = req.cookies.get(COOKIE_ACCESS_TOKEN)?.value;
  const refreshToken = req.cookies.get(COOKIE_REFRESH_TOKEN)?.value;

  // Check if we have a refresh token
  if (!refreshToken) {
    return res;
  }

  const tokenExpiry = getTokenExpiryTimeInSeconds(accessToken);

  // Check if we need to refresh based on token expiry
  const isExpiredOrMissing = !accessToken || isTokenExpired(accessToken);
  const isExpiringSoon = tokenExpiry < REFRESH_BEFORE_EXPIRY;
  const needsRefresh = forceRefresh || isExpiredOrMissing || isExpiringSoon;

  if (needsRefresh && shouldRefreshToken(req, tokenExpiry)) {
    // Set throttle cookie IMMEDIATELY to prevent concurrent refreshes
    setRefreshThrottleCookie(res);

    try {
      const refreshedData = await refreshAccessToken(refreshToken);

      if (!refreshedData || !refreshedData.accessToken) {
        // Clear auth cookies on failed refresh
        res.cookies.delete(COOKIE_ACCESS_TOKEN);
        res.cookies.delete(COOKIE_REFRESH_TOKEN);
        res.cookies.delete(COOKIE_USER_TOKEN);
        return res;
      }

      // Set the new tokens in cookies
      res.cookies.set(
        COOKIE_ACCESS_TOKEN,
        refreshedData.accessToken,
        getCookieOptions(ACCESS_TOKEN_COOKIE_MAX_AGE),
      );

      res.cookies.set(
        COOKIE_REFRESH_TOKEN,
        refreshedData.refreshToken,
        getCookieOptions(REFRESH_TOKEN_COOKIE_MAX_AGE),
      );
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
  } else {
  }

  return res;
}
