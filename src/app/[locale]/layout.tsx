import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import "../globals.css";
import { mainPageMeta } from "../metadata";
import { geistSans } from "@/fonts";
import { notFound } from "next/navigation";
import { routing } from "@/i18/routing";

export const metadata: Metadata = mainPageMeta;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <NextIntlClientProvider>
        <body className={geistSans.className}>{children}</body>
      </NextIntlClientProvider>
    </html>
  );
}
