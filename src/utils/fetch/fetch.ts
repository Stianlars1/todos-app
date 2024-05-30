import { getToken } from "@/app/actions/session";

export const HTTP_REQUEST = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

export const APPLICATION_JSON_V1: HeadersInit = {
  "Content-Type": "application/json",
};

export const MULTIPART_FORM_DATA_V1 = {
  "Content-Type": "multipart/form-data",
};

export const getAuthHeaders = async () => {
  console.log("\n\n\n\n\n 🟢 ===  getAuthHeaders called === ");
  const tokenDetails = await getToken(); // Assuming getToken is now an async function if you're retrieving token from an async source.
  return {
    Authorization: `Bearer ${tokenDetails?.accessToken || ""}`,
    ...APPLICATION_JSON_V1,
  };
};
export const getAuthHeaderOnly = async () => {
  console.log("\n\n\n\n\n 🟢 ===  getAuthHeaderOnly called === ");
  const tokenDetails = await getToken(); // Assuming getToken is now an async function if you're retrieving token from an async source.
  return {
    Authorization: `Bearer ${tokenDetails?.accessToken || ""}`,
  };
};
