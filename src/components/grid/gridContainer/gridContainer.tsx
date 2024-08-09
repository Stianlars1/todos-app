import { getDashboards } from "@/app/actions/dashboards/fetch";
import { getUserSettings } from "@/app/actions/user/userApi";
import { ShowTaskModalContainer } from "@/LandingPages/dashboardPage/components/showTaskModal/showTaskModal";
import "./css/gridContainer.css";
import { GridProps } from "./types";

export const GridContainer = async ({ children }: GridProps) => {
  const userSettings = await getUserSettings();
  const dashboards = await getDashboards();
  return (
    <div
      data-sidebar-open={String(userSettings?.data?.sidebarOpen)}
      className="grid-container"
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
