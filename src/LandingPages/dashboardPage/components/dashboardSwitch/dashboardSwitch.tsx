import { getDashboards } from "@/app/actions/dashboards/fetch";
import { getUserSettings } from "@/app/actions/user/userApi";
import { DashboardSelector } from "./components/dashboardSelector/dashboardSelector";
import { mapDashboardDTO } from "./switchUtils";

export const DashboardSwitch = async () => {
  const settings = await getUserSettings();
  const activeDashboardId = settings.data?.activeDashboardId;
  const dashboardsDTO = await getDashboards();
  const dashboards = dashboardsDTO.data
    ? mapDashboardDTO(dashboardsDTO.data)
    : null;

  if (!activeDashboardId) return null;

  return (
    <div>
      <DashboardSelector
        activeDashboardId={activeDashboardId}
        dashboards={dashboards}
      />
    </div>
  );
};
