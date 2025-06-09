import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import "../globals.css";
import { mainPageMeta } from "../metadata";
import { geistSans } from "@/fonts";

export const metadata: Metadata = mainPageMeta;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;

  console.log("locale", locale);

  return (
    <html lang={locale}>
      <NextIntlClientProvider locale={locale}>
        <body className={geistSans.className}>{children}</body>
      </NextIntlClientProvider>
    </html>
  );
}
