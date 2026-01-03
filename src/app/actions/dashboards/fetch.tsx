"use server";

import { CacheKeys } from "@/app/lib/cache/keys";
import {
  DashboardOnlyTypeDTO,
  DashboardTypeDTO,
} from "@/LandingPages/dashboardPage/components/dashboard/dashboardSwitch/switchUtils";
import { ApiResponse } from "@/types/fetch";
import { customFetch } from "@/utils/fetch/customFetch";
import {
  APPLICATION_JSON_V1,
  getAuthHeaderOnly,
  HTTP_REQUEST,
} from "@/utils/fetch/fetch";
import {
  API_DASHBOARD_DELETE_URL,
  API_DASHBOARD_ONLY_URL,
  API_DASHBOARD_UPDATE_URL,
  API_DASHBOARD_URL,
  API_USER_SETTINGS_URL,
} from "@/utils/urls";
import { UserSettings } from "../user/types";
import { getUserId } from "../user/getUserId";

export const getDashboards = async () => {
  return await customFetch<DashboardTypeDTO[]>({
    url: API_DASHBOARD_URL,
    options: {
      method: HTTP_REQUEST.GET,
      headers: await getAuthHeaderOnly(),
    },
    cacheKey: CacheKeys.DASHBOARDS,
  });
};
export const getOnlyDashboards = async () => {
  return await customFetch<DashboardOnlyTypeDTO[]>({
    url: API_DASHBOARD_ONLY_URL,
    options: {
      method: HTTP_REQUEST.GET,
      headers: await getAuthHeaderOnly(),
    },
    cacheKey: CacheKeys.DASHBOARDS,
  });
};

export const getUserSettings = async () => {
  const userId = await getUserId();
  const settingsUrl = `${API_USER_SETTINGS_URL}/${userId}`;

  return await customFetch<UserSettings>({
    url: settingsUrl,
    options: {
      method: HTTP_REQUEST.GET,
      headers: await getAuthHeaderOnly(),
    },
    cacheKey: CacheKeys.USER_SETTINGS,
  });
};

export const createDashboard = async (dashboardName: string) => {
  const settingsUrl = `${API_DASHBOARD_URL}?name=${dashboardName}`;

  return await customFetch<CreateDashboardResponseDTO>({
    url: settingsUrl,
    options: {
      method: HTTP_REQUEST.POST,
      headers: await getAuthHeaderOnly(),
    },
    cacheKey: CacheKeys.DASHBOARDS,
  });
};
export const updateDashboard = async (
  dashboardId: number,
  dashboardName: string,
) => {
  const UPDATE_URL = `${API_DASHBOARD_UPDATE_URL}/${dashboardId}`;
  const authHeader = await getAuthHeaderOnly();
  return await customFetch<ApiResponse<any>>({
    url: UPDATE_URL,
    options: {
      method: HTTP_REQUEST.PUT,
      body: JSON.stringify({ name: dashboardName }),
    },
    headers: { ...authHeader, ...APPLICATION_JSON_V1 },
    cacheKey: CacheKeys.DASHBOARDS,
  });
};
export const deleteDashboardAndTasks = async (dashboardId: number) => {
  const DELETE_URL = `${API_DASHBOARD_DELETE_URL}/${dashboardId}`;
  const authHeader = await getAuthHeaderOnly();
  return await customFetch<ApiResponse<any>>({
    url: DELETE_URL,
    options: {
      method: HTTP_REQUEST.DELETE,
    },
    headers: { ...authHeader, ...APPLICATION_JSON_V1 },
    cacheKey: CacheKeys.DASHBOARDS,
  });
};

interface CreateDashboardResponseDTO {
  dashboardId: number;
  userId: number;
  name: string;
  isDefault: boolean;
  tasks: any[];
  createdAt: any;
  updatedAt: any;
}
