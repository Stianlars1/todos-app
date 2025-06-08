// Decode JWT payload (using atob available in Edge runtime) and check expiration.
// We treat the token as expired if less than 5 minutes remain.

import { API_REFRESH_TOKEN_URL } from "@/utils/urls";

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
        "Content-Type": "application/json",
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

    return await res.json();
  } catch (error) {
    console.error("Exception refreshing access token:", error);
    return null;
  }
}
