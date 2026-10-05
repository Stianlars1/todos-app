import "../globals.css";
import { geistSans } from "@/fonts";
import { cx } from "@/utils/cx";
import { AppAnalytics } from "@/components/analytics/appAnalytics";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"en"}>
      <body className={cx(geistSans.className, "password")}>
        {children}
        <AppAnalytics />
      </body>
    </html>
  );
}
