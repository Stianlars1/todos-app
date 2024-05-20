"use server";
import { ApiResponse } from "@/types/fetch";
import { customFetch } from "@/utils/fetch/customFetch";
import { HTTP_REQUEST } from "@/utils/fetch/fetch";
import { API_USER_SETTINGS_URL } from "@/utils/urls";
import { UserSettingsSortKey } from "../user/types";
import { getUserId } from "../user/userUtils";

export const updateSortSetting = async ({
  settingKey,
  newSortOrder,
}: {
  settingKey: UserSettingsSortKey;
  newSortOrder: string;
}) => {
  const userId = await getUserId();
  const UpdateURL = `${API_USER_SETTINGS_URL}/${userId}`;

  const updatedSetting = {
    [settingKey]: newSortOrder,
  };

  return await customFetch<ApiResponse<any>>({
    url: UpdateURL,
    options: {
      method: HTTP_REQUEST.PATCH,
      body: JSON.stringify(updatedSetting),
    },
  });
};
export const updateManualSortSetting = async ({
  newSortManualValue,
}: {
  newSortManualValue: boolean;
}) => {
  const userId = await getUserId();
  const UpdateURL = `${API_USER_SETTINGS_URL}/${userId}`;

  const updatedSetting = {
    sortManual: newSortManualValue,
  };

  return await customFetch<ApiResponse<any>>({
    url: UpdateURL,
    options: {
      method: HTTP_REQUEST.PATCH,
      body: JSON.stringify(updatedSetting),
    },
  });
};
export const updateColumnLayoutSettings = async ({
  isColumnLayout,
}: {
  isColumnLayout: boolean;
}) => {
  const userId = await getUserId();
  const UpdateURL = `${API_USER_SETTINGS_URL}/${userId}`;

  const updatedSetting = {
    isColumnLayout: isColumnLayout,
  };

  return await customFetch<ApiResponse<any>>({
    url: UpdateURL,
    options: {
      method: HTTP_REQUEST.PATCH,
      body: JSON.stringify(updatedSetting),
    },
  });
};
