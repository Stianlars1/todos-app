import { getToken } from "@/lib/session";

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
  const tokenDetails = await getToken(); // Assuming getToken is now an async function if you're retrieving token from an async source.
  return {
    Authorization: `Bearer ${tokenDetails?.accessToken || ""}`,
    ...APPLICATION_JSON_V1,
  };
};
export const getAuthHeaderOnly = async () => {
  const tokenDetails = await getToken(); // Assuming getToken is now an async function if you're retrieving token from an async source.
  return {
    Authorization: `Bearer ${tokenDetails?.accessToken || ""}`,
  };
};
