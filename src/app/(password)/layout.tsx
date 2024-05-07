import { GeistSans } from "geist/font/sans";
import "../globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"en"}>
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
