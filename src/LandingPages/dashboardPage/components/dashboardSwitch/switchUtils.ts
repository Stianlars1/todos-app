import { TodoDTO } from "@/types/types";

export interface DashboardTypeDTO {
  dashboardId: number;
  userId: number;
  name: string;
  isDefault: boolean;
  tasks: TodoDTO[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardType {
  dashboardId: number;
  userId: number;
  name: string;
  isDefault: boolean;
}

export const mapDashboardDTO = (
  dashboard: DashboardTypeDTO[]
): DashboardType[] => {
  return dashboard.map((d) => {
    return {
      dashboardId: d.dashboardId,
      userId: d.userId,
      name: d.name,
      isDefault: d.isDefault,
    };
  });
};
