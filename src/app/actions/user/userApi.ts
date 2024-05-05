import { customFetch } from "@/utils/fetch/customFetch";
import { HTTP_REQUEST, getAuthHeaderOnly } from "@/utils/fetch/fetch";
import { LanguageType } from "@/utils/i18/types";
import {
  API_PROFILE_PICTURES_URL,
  API_USER_SETTINGS_URL,
  API_USER_URL,
} from "@/utils/urls";
import { UserDTO, UserSettingsDTO } from "./types";
import { getUserId } from "./userUtils";

export const getUserDetails = async () => {
  const userDetails = await customFetch<UserDTO>({
    url: API_USER_URL,
    options: {
      method: HTTP_REQUEST.GET,
    },
    revalidate: 0,
  });

  // let error = "";

  // if (userDetails.isError) {
  //   error = "Couldn't get user details";
  // }

  return { ...userDetails };
};

export const getProfilePicture = async () => {
  const userId = await getUserId();
  const fetchUrl = `${API_PROFILE_PICTURES_URL}/${userId}`;
  const authHeader = await getAuthHeaderOnly();

  const imageResponse = await fetch(fetchUrl, {
    method: HTTP_REQUEST.GET,
    headers: authHeader,
  });

  const imageUrl = await imageResponse.text();

  return imageUrl;
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
  });
};

export const getLanguageFromServer = async (): Promise<LanguageType> => {
  const res = await getUserSettings();

  return res.data?.language || "en";
};
