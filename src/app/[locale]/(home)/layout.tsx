import { GridMain } from "@/components/grid/gridContainer/gridComponents/gridMain/gridMain";
import { GridNavbar } from "@/components/grid/gridContainer/gridComponents/gridNavbar/gridNavbar";
import { GridSidebar } from "@/components/grid/gridContainer/gridComponents/gridSidebar/gridSidebar";
import { GridContainer } from "@/components/grid/gridContainer/gridContainer";
import { SuspenseFallback } from "@/components/ui/suspenseFallback/suspenseFallback";
import { ROUTE_SIGN_IN } from "@/utils/urls";
import { Metadata } from "next";
import { Suspense } from "react";
import { mainPageMeta } from "../../metadata";
import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";

export const metadata: Metadata = mainPageMeta;

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuth } = await verifySession();
  if (!isAuth) {
    return redirect(ROUTE_SIGN_IN);
  }

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
