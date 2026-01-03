import type { Metadata } from "next";
import "../globals.css";
import { mainPageMeta } from "../metadata";
import { RecaptchaProvider } from "@/app/(auth)/recaptcha/recaptchaProvider";
import { geistSans } from "@/fonts";

export const metadata: Metadata = mainPageMeta;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"en"}>
      <body className={geistSans.className}>
        <RecaptchaProvider>{children}</RecaptchaProvider>
      </body>
    </html>
  );
}
