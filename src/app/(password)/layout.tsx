import "../globals.css";
import { geistSans } from "@/fonts";
import { cx } from "@/utils/cx";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"en"}>
      <body className={cx(geistSans.className, "password")}>{children}</body>
    </html>
  );
}
