import { getOnlyDashboards } from "@/app/actions/dashboards/fetch";
import { UserSettings } from "@/app/actions/user/types";
import { getUserSettings } from "@/app/actions/user/userApi";
import { ToastContainer } from "@/components/ui/toast/toast";
import { DashboardOnlyTypeDTO } from "@/LandingPages/dashboardPage/components/dashboard/dashboardSwitch/switchUtils";
import { ShowTaskModalContainer } from "@/LandingPages/dashboardPage/components/showTaskModal/showTaskModalContainer";

import "./css/gridContainer.css";
import { ActiveDashboardName } from "./gridComponents/activeDashboardName/activeDashboardName";
import { GridProps } from "./types";
import { geistSans } from "@/fonts";

export const GridContainer = async ({ children }: GridProps) => {
  const userSettings = await getUserSettings();
  const dashboards = await getOnlyDashboards();
  const activeDashboardName = getActiveDashboardName(
    dashboards.data,
    userSettings.data,
  );
  return (
    <div
      data-sidebar-open={String(userSettings.data?.sidebarOpen)}
      className={`grid-container ${geistSans.className}`}
      id="grid-container"
    >
      <>
        <ActiveDashboardName
          dashboards={dashboards.data}
          activeDashboardName={activeDashboardName}
        />
        {children}
        <ShowTaskModalContainer
          userSettings={userSettings.data}
          dashboards={dashboards.data}
        />
        <ToastContainer />
      </>
    </div>
  );
};

const getActiveDashboardName = (
  dashboards: DashboardOnlyTypeDTO[] | null,
  userSettings: UserSettings | null,
) => {
  return dashboards?.find(
    (board) => board.dashboardId === userSettings?.activeDashboardId,
  )?.name;
};
