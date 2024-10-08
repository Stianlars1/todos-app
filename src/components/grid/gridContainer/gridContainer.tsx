import { getOnlyDashboards } from "@/app/actions/dashboards/fetch";
import { UserSettingsDTO } from "@/app/actions/user/types";
import { getUserSettings } from "@/app/actions/user/userApi";
import { ToastContainer } from "@/components/ui/toast/toast";
import { DashboardOnlyTypeDTO } from "@/LandingPages/dashboardPage/components/dashboardSwitch/switchUtils";
import { ShowTaskModalContainer } from "@/LandingPages/dashboardPage/components/showTaskModal/showTaskModalContainer";
import { GeistSans } from "geist/font/sans";
import "./css/gridContainer.css";
import { ActiveDashboardName } from "./gridComponents/activeDashboardName/activeDashboardName";
import { GridProps } from "./types";

export const GridContainer = async ({ children }: GridProps) => {
  const userSettings = await getUserSettings();
  const dashboards = await getOnlyDashboards();
  const activeDashboardName = getActiveDashboardName(
    dashboards.data,
    userSettings.data,
  );
  return (
    <div
      data-sidebar-open={String(userSettings?.data?.sidebarOpen)}
      className={`grid-container ${GeistSans.className}`}
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
  userSettings: UserSettingsDTO | null,
) => {
  return dashboards?.find(
    (board) => board.dashboardId === userSettings?.activeDashboardId,
  )?.name;
};
