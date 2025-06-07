import { ReCaptchaProvider } from "next-recaptcha-v3";
import { ReactNode } from "react";

export const RecaptchaProvider = ({ children }: { children: ReactNode }) => {
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  return <ReCaptchaProvider reCaptchaKey={key}>{children}</ReCaptchaProvider>;
};
