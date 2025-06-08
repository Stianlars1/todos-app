import { GridMain } from "@/components/grid/gridContainer/gridComponents/gridMain/gridMain";
import { GridNavbar } from "@/components/grid/gridContainer/gridComponents/gridNavbar/gridNavbar";
import { GridSidebar } from "@/components/grid/gridContainer/gridComponents/gridSidebar/gridSidebar";
import { GridContainer } from "@/components/grid/gridContainer/gridContainer";
import { SuspenseFallback } from "@/components/ui/suspenseFallback/suspenseFallback";
import { ROUTE_LOGIN } from "@/utils/urls";
import { Metadata } from "next";
import { Suspense } from "react";
import { mainPageMeta } from "../../metadata";
import { verifySession } from "@/lib/dal";
import { redirect } from "@/i18/navigation";
import { getLocale } from "next-intl/server";

export const metadata: Metadata = mainPageMeta;

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuth } = await verifySession();
  if (!isAuth) {
    console.log("rediredcting");
    return redirect({ locale: await getLocale(), href: ROUTE_LOGIN });
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
