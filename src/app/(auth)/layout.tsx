import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "../globals.css";
import { mainPageMeta } from "../metadata";
import { RecaptchaProvider } from "@/app/(auth)/recaptcha/recaptchaProvider";

export const metadata: Metadata = mainPageMeta;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"en"}>
      <body className={GeistSans.className}>
        <RecaptchaProvider>{children}</RecaptchaProvider>
      </body>
    </html>
  );
}
