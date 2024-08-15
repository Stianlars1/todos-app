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
  const isAtDashboardPage = checkIfPathIsAtDashboard(pathName, dashboards);

  if (!activeDashboardName || isAtDashboardPage) return null;

  return (
    <div className="grid-container__activeDashboardName">
      {activeDashboardName}
    </div>
  );
};

const checkIfPathIsAtDashboard = (
  pathName: string,
  dashboards: DashboardOnlyTypeDTO[] | null,
) => {
  const match = dashboards?.some((board) => pathName.includes(board.name));
  return match;
};
