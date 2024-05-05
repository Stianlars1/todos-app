"use server";
import { ApiResponse } from "@/types/fetch";
import { HTTP_REQUEST, getAuthHeaders } from "@/utils/fetch/fetch";
import { API_USER_SETTINGS_URL } from "@/utils/urls";
import { UserSettingsDTO } from "./types";
import { getUserId } from "./userUtils";

export const updateUserSettings = async (
  settings: UserSettingsDTO
): Promise<ApiResponse<UserSettingsDTO | null>> => {
  const userId = await getUserId();
  const userSettingsUrl = `${API_USER_SETTINGS_URL}/${userId}`;
  try {
    const updatedSettingsResponse = await fetch(userSettingsUrl, {
      method: HTTP_REQUEST.PATCH,
      headers: await getAuthHeaders(),
      body: JSON.stringify(settings),
    });
    const updatedSettings: UserSettingsDTO =
      await updatedSettingsResponse.json();
    return {
      success: true,
      message: "User settings updated",
      data: updatedSettings,
    };
  } catch (error) {
    console.error("Error updating user settings", error);
    return {
      success: false,
      message: "Error updating user settings",
      data: null,
    };
  }
};
