"use server";
import { UpdatedUserDetails } from "@/LandingPages/settingsPage/components/settingsPageHero/components/profile/profile";
import { UpdatePasswordSchema } from "@/app/lib/auth/definitions";
import { ApiResponse } from "@/types/fetch";
import {
  FetchState,
  FetchStateForm,
  customFetch,
} from "@/utils/fetch/customFetch";
import {
  HTTP_REQUEST,
  getAuthHeaderOnly,
  getAuthHeaders,
} from "@/utils/fetch/fetch";
import {
  API_DASHBOARD_UPDATE_ID_URL,
  API_PROFILE_PICTURES_URL,
  API_USER_SETTINGS_URL,
  API_USER_UPDATE_PASSWORD_URL,
  API_USER_URL,
} from "@/utils/urls";
import { UserSettingsDTO } from "./types";
import { getUserId } from "./userUtils";

export const updateUserSettings = async (
  settings: UserSettingsDTO,
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
export const updateActiveDashboardId = async (
  dashboardId: number,
): Promise<boolean> => {
  const URL = `${API_DASHBOARD_UPDATE_ID_URL}?dashboardId=${dashboardId}`;
  const response = await fetch(URL, {
    method: HTTP_REQUEST.PUT,
    headers: await getAuthHeaders(),
  });

  if (!response.ok) {
    console.error("Failed to update active dashboard");
    return false;
  } else {
    return true;
  }
};

export const uploadProfilePicture = async (
  _state: unknown,
  formDataArgument: FormData,
): Promise<FetchState<string>> => {
  // Fetch url
  const userId = await getUserId();
  const Url = `${API_PROFILE_PICTURES_URL}/${userId}`;

  // Define form data
  const formData = new FormData();
  formData.append("file", formDataArgument.get("profilePicture") as File);

  // Get auth header and content type
  const authHeader = await getAuthHeaderOnly();
  const fetchObj = {
    url: Url,
    options: {
      method: HTTP_REQUEST.POST,
      body: formData,
    },
    headers: authHeader,
  };

  return await customFetch<string>(fetchObj);
};

export const updateUserProfile = async (
  _state: unknown,
  formData: FormData,
): Promise<FetchState<string>> => {
  // Fetch url
  const userId = await getUserId();
  const Url = `${API_USER_URL}/${userId}`;
  const updatedUser: UpdatedUserDetails = {
    email: formData.get("email") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
  };
  // Define form data

  // Get auth header and content type
  const authHeader = await getAuthHeaders();
  const fetchObj = {
    url: Url,
    options: {
      method: HTTP_REQUEST.PUT,
      body: JSON.stringify(updatedUser),
    },
    headers: authHeader,
  };

  return await customFetch<string>(fetchObj);
};

export const updateUserPassword = async (
  _state: unknown,
  formData: FormData,
): Promise<FetchStateForm<any> | FetchState<ApiResponse<any>>> => {
  const validatedFields = UpdatePasswordSchema.safeParse({
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      formErrors: validatedFields.error.flatten().fieldErrors.password,
      isLoading: false,
      isSuccess: false,
      isError: true,
      data: null,
      error: "Invalid fields",
    } as FetchStateForm<any>;
  }

  // Fetch url
  const userId = await getUserId();
  const Url = API_USER_UPDATE_PASSWORD_URL;
  const updatedUser: {
    userId: number;
    newPassword: string;
    currentPassword: string;
  } = {
    userId: userId,
    newPassword: validatedFields.data.password as string,
    currentPassword: formData.get("currentPassword") as string,
  };

  // Define form data

  // Get auth header and content type
  const authHeader = await getAuthHeaders();
  const fetchObj = {
    url: Url,
    options: {
      method: HTTP_REQUEST.POST,
      body: JSON.stringify(updatedUser),
    },
    headers: authHeader,
  };

  return await customFetch<ApiResponse<any>>(fetchObj);
};
