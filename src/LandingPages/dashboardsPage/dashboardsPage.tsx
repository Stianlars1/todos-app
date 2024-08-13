import { getOnlyDashboards } from "@/app/actions/dashboards/fetch";
import { ErrorMessage } from "@/components/ui/errorMessage/errorMessage";
import { SuspenseFallback } from "@/components/ui/suspenseFallback/suspenseFallback";
import {
  CreateNewDashboard,
  DashboardLink,
} from "@/LandingPages/mainDashboard/components/dashboardLink/dashboardLink";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import styles from "./css/dashboardsPage.module.css";
export default async function DashboardsPage() {
  const {
    data: allDashboards,
    isLoading,
    isError,
    error,
  } = await getOnlyDashboards();

  console.log("\nDashboardsPage allDashboards", allDashboards);
  const text = await getTranslations("DashboardsPage");

  if (isError) {
    return (
      <>
        <ErrorMessage closeButton errorMessage={error} isError={isError} />
      </>
    );
  }
  return (
    <Suspense fallback={<SuspenseFallback fixed={true} />}>
      <div className={styles.dashboardsPage}>
        <h1 className={styles.h1}>{text("title")}</h1>

        {allDashboards && (
          <ul className={styles.dashboardMain}>
            <CreateNewDashboard />

            {allDashboards.map((dashboard, index) => {
              return (
                <DashboardLink
                  index={index}
                  key={dashboard.dashboardId}
                  dashboard={dashboard}
                />
              );
            })}
          </ul>
        )}
      </div>
    </Suspense>
  );
}
