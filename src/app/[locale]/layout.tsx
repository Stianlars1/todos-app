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
  params: Promise<{
    locale: string;
  }>;
}) {
  const locale = (await params)?.locale || "en";
  console.log("RootLayout params:", locale);

  console.log("RootLayout messages:");
  if (!hasLocale(routing.locales, locale)) {
    console.error(
      `Locale "${locale}" is not supported. Supported locales are: ${routing.locales.join(
        ", ",
      )}`,
    );
    notFound();
  }

  return (
    <html lang={locale}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <body className={geistSans.className}>{children}</body>
      </NextIntlClientProvider>
    </html>
  );
}
