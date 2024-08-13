import { verifySession } from "@/app/actions/session";
import { GridMain } from "@/components/grid/gridContainer/gridComponents/gridMain/gridMain";
import { GridNavbar } from "@/components/grid/gridContainer/gridComponents/gridNavbar/gridNavbar";
import { GridSidebar } from "@/components/grid/gridContainer/gridComponents/gridSidebar/gridSidebar";
import { GridContainer } from "@/components/grid/gridContainer/gridContainer";
import { SuspenseFallback } from "@/components/ui/suspenseFallback/suspenseFallback";
import { LOGIN_URL } from "@/utils/urls";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { mainPageMeta } from "../../metadata";

export const metadata: Metadata = mainPageMeta;

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuth } = await verifySession();
  if (!isAuth) {
    return redirect(LOGIN_URL);
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
