import { GridMain } from "@/components/grid/gridContainer/gridComponents/gridMain/gridMain";
import { GridNavbar } from "@/components/grid/gridContainer/gridComponents/gridNavbar/gridNavbar";
import { GridSidebar } from "@/components/grid/gridContainer/gridComponents/gridSidebar/gridSidebar";
import { GridContainer } from "@/components/grid/gridContainer/gridContainer";
import { SuspenseFallback } from "@/components/ui/suspenseFallback/suspenseFallback";
import { Metadata } from "next";
import { Suspense } from "react";
import { getLanguageFromServer } from "../actions/user/userApi";
import { mainPageMeta } from "../metadata";

export const metadata: Metadata = mainPageMeta;

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<SuspenseFallback fixed />}>
      <GridContainer>
        <GridNavbar />
        <GridSidebar />
        <GridMain>{children}</GridMain>
      </GridContainer>
    </Suspense>
  );
}
