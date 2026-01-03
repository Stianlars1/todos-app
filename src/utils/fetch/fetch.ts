import { verifySession } from "@/lib/dal";

export const HTTP_REQUEST = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

export const MULTIPART_FORM_DATA_V1 = {
  "Content-Type": "multipart/form-data",
};
export const APPLICATION_JSON_V1: HeadersInit = {
  "Content-Type": "application/json",
};

export const getAuthHeaders = async () => {
  const { accessToken } = await verifySession();
  return {
    Authorization: `Bearer ${accessToken || ""}`,
    ...APPLICATION_JSON_V1,
  };
};
export const getAuthHeaderOnly = async () => {
  const { accessToken } = await verifySession();
  return {
    Authorization: `Bearer ${accessToken || ""}`,
  };
};
