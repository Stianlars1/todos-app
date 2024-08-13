"use server";

import { CacheKeys } from "@/app/lib/cache/keys";
import {
  DashboardOnlyTypeDTO,
  DashboardTypeDTO,
} from "@/LandingPages/dashboardPage/components/dashboardSwitch/switchUtils";
import { customFetch } from "@/utils/fetch/customFetch";
import { HTTP_REQUEST, getAuthHeaderOnly } from "@/utils/fetch/fetch";
import {
  API_DASHBOARD_ONLY_URL,
  API_DASHBOARD_URL,
  API_USER_SETTINGS_URL,
} from "@/utils/urls";
import { UserSettingsDTO } from "../user/types";
import { getUserId } from "../user/userUtils";

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

  return await customFetch<UserSettingsDTO>({
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

interface CreateDashboardResponseDTO {
  dashboardId: number;
  userId: number;
  name: string;
  isDefault: boolean;
  tasks: any[];
  createdAt: any;
  updatedAt: any;
}
