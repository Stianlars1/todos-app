import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
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
  return (
    <html lang={locale}>
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
