"use client";
import { DashboardOnlyTypeDTO } from "@/LandingPages/dashboardPage/components/dashboardSwitch/switchUtils";
import { usePathname } from "next/navigation";

export const ActiveDashboardName = ({
  activeDashboardName,
  dashboards,
}: {
  activeDashboardName: string | undefined;
  dashboards: DashboardOnlyTypeDTO[] | null;
}) => {
  const pathName = usePathname();
  const isAtDashboardPage = checkIfPathIsAtDashboard(
    decodeURI(pathName),
    dashboards
  );
  if (!activeDashboardName || isAtDashboardPage) return null;

  return (
    <div className="grid-container__activeDashboardName">
      <div className="grid-container__activeDashboardName__circle" />
      <div className="grid-container__activeDashboardName__name">
        {activeDashboardName}
      </div>
    </div>
  );
};

const checkIfPathIsAtDashboard = (
  pathName: string,
  dashboards: DashboardOnlyTypeDTO[] | null
) => {
  const match = dashboards?.some((board) => pathName.includes(board.name));
  return match;
};
