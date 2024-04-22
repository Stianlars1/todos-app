import { Footer } from "@/components/footer/footer";
import { GridNavbar } from "@/components/grid/gridComponents/gridNavbar/gridNavbar";
import { GridContainer } from "@/components/grid/gridContainer";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { mainPageMeta } from "./metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = mainPageMeta;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <GridContainer>
          <GridNavbar />
          {children}
          <Footer />
        </GridContainer>
      </body>
    </html>
  );
}
