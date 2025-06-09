"use server";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { ApiResponse } from "@/types/fetch";
import { customFetch } from "@/utils/fetch/customFetch";
import { APPLICATION_JSON_V1, HTTP_REQUEST } from "@/utils/fetch/fetch";
import { API_USER_PREFERENCES } from "@/utils/urls";
import { getUserId } from "../user/getUserId";
import { GetUserPreferencesDTO, UserPreferenceUpdateDTO } from "./types";

export const getUserPreferences = async () => {
  const userId = await getUserId();
  const preferencesUrl = `${API_USER_PREFERENCES}/${userId}`;
  return await customFetch<GetUserPreferencesDTO>({
    url: preferencesUrl,
    options: {
      method: HTTP_REQUEST.GET,
    },
    headers: APPLICATION_JSON_V1,
    cacheKey: CacheKeys.USER_PREFERENCES,
    revalidate: 0,
  });
};
export const updateUserPreferences = async ({
  updatedPreferences,
}: {
  updatedPreferences: UserPreferenceUpdateDTO[];
}) => {
  const userId = await getUserId();
  const preferencesUrl = `${API_USER_PREFERENCES}/${userId}`;

  const updateResponse = await customFetch<ApiResponse<null>>({
    url: preferencesUrl,
    options: {
      method: HTTP_REQUEST.PATCH,
      body: JSON.stringify(updatedPreferences),
    },
    headers: APPLICATION_JSON_V1,
    cacheKey: CacheKeys.USER_PREFERENCES,
    revalidate: 0,
  });

  await cacheInvalidate({ cacheKey: CacheKeys.USER_PREFERENCES });
  await cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });

  return updateResponse;
};
