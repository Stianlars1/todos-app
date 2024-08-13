import { getOnlyDashboards } from "@/app/actions/dashboards/fetch";
import { getUserSettings } from "@/app/actions/user/userApi";
import { ShowTaskModalContainer } from "@/LandingPages/dashboardPage/components/showTaskModal/showTaskModalContainer";
import { GeistSans } from "geist/font/sans";
import "./css/gridContainer.css";
import { GridProps } from "./types";

export const GridContainer = async ({ children }: GridProps) => {
  const userSettings = await getUserSettings();
  const dashboards = await getOnlyDashboards();
  console.log("dashboardsdashboardsdashboards", dashboards);
  return (
    <div
      data-sidebar-open={String(userSettings?.data?.sidebarOpen)}
      className={`grid-container ${GeistSans.className}`}
      id="grid-container"
    >
      <>
        {children}
        <ShowTaskModalContainer
          userSettings={userSettings.data}
          dashboards={dashboards.data}
        />
      </>
    </div>
  );
};
