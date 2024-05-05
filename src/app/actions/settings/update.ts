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

  console.log("\n\n Update sort setting\n", updatedSetting);

  return await customFetch<ApiResponse<any>>({
    url: UpdateURL,
    options: {
      method: HTTP_REQUEST.PATCH,
      body: JSON.stringify(updatedSetting),
    },
  });
};
