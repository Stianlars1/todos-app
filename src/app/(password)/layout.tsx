import "../globals.css";
import { geistSans } from "@/fonts";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"en"}>
      <body className={geistSans.className}>{children}</body>
    </html>
  );
}
