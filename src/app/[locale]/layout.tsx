import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import { mainPageMeta } from "../metadata";

export const metadata: Metadata = mainPageMeta;

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body className={GeistSans.className}>
          <div className="modal-root" id="modal-root" />
          {children}
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
