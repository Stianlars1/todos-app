import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
// middleware.ts
import { NextRequest, NextResponse } from "next/server";

import {
  addReturnToCookieToResponse,
  handleTokenRefresh,
  isProtectedPath,
  isPublicPath,
  isRootPath,
  isTokenExpired,
  redirectToSignIn,
} from "@/middlewareUtils";
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
} from "@/utils/cookiesConstants";
import { createUrl } from "@/utils/createUrl";
import { getBasicUser } from "@/app/actions/user/getBasicUser";

export default createMiddleware(routing);

// --- Middleware Main Function ---
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware for static files or assets
  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // Get tokens from cookies
  const accessToken = req.cookies.get(COOKIE_ACCESS_TOKEN)?.value;
  const refreshToken = req.cookies.get(COOKIE_REFRESH_TOKEN)?.value;

  // Initial response
  let res = NextResponse.next();

  // Add return-to cookie if needed
  res = await addReturnToCookieToResponse(req, res);

  // Handle public paths
  if (isPublicPath(pathname)) {
    const isPathRoot = isRootPath(pathname);
    if (isPathRoot) {
      const user = await getBasicUser();

      const url = createUrl(`/${user && user.locale ? user.locale : "en"}`);
      return NextResponse.redirect(new URL(createUrl(url, true)));
    }
    // Only do background refresh for authenticated users on public paths
    if (refreshToken) {
      return handleTokenRefresh(req, res, false);
    }

    return res;
  }

  // Handle protected paths
  if (isProtectedPath(pathname)) {
    // If no tokens exist at all, force a sign-in
    if (!accessToken && !refreshToken) {
      console.log("No access or refresh token, redirecting to sign-in");
      return redirectToSignIn(req);
    }

    // Check if token is expired or soon to expire
    if (!accessToken || isTokenExpired(accessToken)) {
      if (!refreshToken) {
        return redirectToSignIn(req);
      }

      // Try to refresh tokens
      res = await handleTokenRefresh(req, res, true);

      // Check if we have a valid access token after refresh attempt
      const newAccessToken = res.cookies.get(COOKIE_ACCESS_TOKEN)?.value;
      if (!newAccessToken) {
        return redirectToSignIn(req);
      }
    }
  }

  return res;
}

// --- Matcher Config ---
// Apply middleware to all routes except static files, API routes, etc.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    //"/(!signIn|logout|sign-up)",
    //"/(nb|en)/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|logo|logo2).*)",
    `/((?!logo|logo2|spline|_next/static|favicon.ico|web-app-manifest-192x192|web-app-manifest-512x512).*)`,
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  ],
};
