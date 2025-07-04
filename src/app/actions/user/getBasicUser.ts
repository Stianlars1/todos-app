"use server";
import { UserBasic } from "@/app/actions/user/types";
import { API_USER_BASIC_URL } from "@/utils/urls";
import { HTTP_REQUEST } from "@/utils/fetch/fetch";
import { fetchWithAuth } from "@/utils/fetch/fetchWithAuth";
import { CacheKeys } from "@/app/lib/cache/keys";

export const getBasicUser = async () => {
  const user = await fetchWithAuth<UserBasic>(API_USER_BASIC_URL, {
    method: HTTP_REQUEST.GET,
    next: {
      tags: [CacheKeys.USER_BASIC],
    },
  });

  if (user.error) {
    return null;
  }

  return user.data;
};
