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
export interface DashboardOnlyTypeDTO {
  dashboardId: number;
  userId: number;
  name: string;
  isDefault: boolean;
  totalTasks: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardType {
  dashboardId: number;
  userId: number;
  name: string;
  isDefault: boolean;
}
export interface DashboardOnlyType {
  dashboardId: number;
  userId: number;
  name: string;
  isDefault: boolean;
  totalTasks: number;
  createdAt: Date;
}

export const mapDashboardDTO = (
  dashboard: DashboardOnlyTypeDTO[]
): DashboardType[] => {
  return dashboard.map((d) => {
    return {
      dashboardId: d.dashboardId,
      userId: d.userId,
      name: d.name,
      isDefault: d.isDefault,
      createdAt: d.createdAt,
    };
  });
};
export const mapDashboardOnlyDTO = (
  dashboard: DashboardOnlyTypeDTO[]
): DashboardType[] => {
  return dashboard.map((d) => {
    return {
      dashboardId: d.dashboardId,
      userId: d.userId,
      name: d.name,
      isDefault: d.isDefault,
      totalTasks: d.totalTasks,
    };
  });
};
