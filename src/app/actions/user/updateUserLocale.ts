"use server";
import { LanguageType } from "@/app/actions/user/types";
import { fetchWithAuth } from "@/utils/fetch/fetchWithAuth";
import { API_USER_URL } from "@/utils/urls";
import { getUserId } from "@/app/actions/user/getUserId";
import { APPLICATION_JSON_V1, HTTP_REQUEST } from "@/utils/fetch/fetch";
import { UserDTO } from "@/types/auth";

export const updateUserLocale = async (locale: LanguageType) => {
  const userId = await getUserId();
  const Url = `${API_USER_URL}/${userId}`;
  const res = await fetchWithAuth<UserDTO>(Url, {
    method: HTTP_REQUEST.PUT,
    headers: {
      ...APPLICATION_JSON_V1,
    },
    body: JSON.stringify({ locale }),
  });

  if (!res.data || res.error) {
    console.error("Failed to update user locale");
    return {
      success: false,
      message: "Failed to update user locale",
      data: null,
    };
  }

  return {
    success: true,
    message: "User locale updated successfully",
    data: res.data,
  };
};
