import { getCookieOptions } from "@/utils/cookies";

export const COOKIE_ACCESS_TOKEN = "accessToken";
export const COOKIE_REFRESH_TOKEN = "refreshToken";
export const COOKIE_SESSION_TOKEN = "session";
export const COOKIE_USER_TOKEN = "userToken";

// Or if you prefer more readable constants:
const SECONDS_IN_HOUR = 60 * 60;
const SECONDS_IN_DAY = SECONDS_IN_HOUR * 24;

export const ACCESS_TOKEN_COOKIE_MAX_AGE = SECONDS_IN_HOUR; // 1 hour
export const REFRESH_TOKEN_COOKIE_MAX_AGE = SECONDS_IN_DAY * 30; // 30 days
export const USER_TOKEN_COOKIE_MAX_AGE = REFRESH_TOKEN_COOKIE_MAX_AGE;
export const COOKIE_OPTIONS = getCookieOptions(ACCESS_TOKEN_COOKIE_MAX_AGE);

export const REVALIDATE_TIME = 60 * 5; // 5 minutes
export const REVALIDATE_TIME_1_MINUTE = 60; // 5 minutes
