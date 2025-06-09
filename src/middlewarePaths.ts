// Define public routes that don't need authentication
import { routing } from "@/i18n/routing";

export const PUBLIC_PATHS = [
  "/signIn",
  "/sign-up",
  "/logout",
  "/forgot-password",
  "/reset-password",
  "/public",
  "/verify/", // Just check verify/ prefix
  "/upload",
  "/",
];

export const PROTECTED_PATHS = [
  ...routing.locales.map((locale) => `/${locale}`),
  ...routing.locales.map((locale) => `/${locale}/settings`),
];

export const PUBLIC_PATHS_NO_REDIRECT = [
  "/signIn",
  "/logout",
  "/sign-up",
  "/goodbye",
  "/verify",
  "/verify/email",
  "/verify/email/resend",
  "/forgot-password",
  "/reset-password",
];
