// config/cookies.ts
import { TASKBUDDY_APP_URL } from "@/utils/constants";

export const BASE_DOMAIN = TASKBUDDY_APP_URL;
export const FIVE_MINUTES = 60 * 5;
type CookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  maxAge: number;
  sameSite: "lax" | "strict" | "none";
  path: string;
  priority: "high" | "low" | "medium";
  domain: string | undefined;
};

export const getCookieOptions = (maxAge: number): CookieOptions => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge,
  sameSite: "lax" as const,
  path: "/",
  priority: "high" as const,
  domain:
    process.env.NODE_ENV === "production"
      ? `.${BASE_DOMAIN}` // Note the dot prefix
      : undefined, // Let browser handle it for localhost
});
