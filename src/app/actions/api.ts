import {
  API_AUTH_URL,
  API_USER_URL,
  HTTP_HEADERS,
  HTTP_REQUEST,
} from "@/utils/constants";
import {
  LoginCredentials,
  SignUpCredentials,
  authResponseDTO,
  signupResponseDTO,
} from "./types";

export const loginFetcher = async (
  loginCredentials: LoginCredentials
): Promise<authResponseDTO> => {
  const response = await fetch(API_AUTH_URL, {
    method: HTTP_REQUEST.POST,
    headers: HTTP_HEADERS,
    body: JSON.stringify(loginCredentials),
  });

  const data = await response.json(); // Assuming the server responds with JSON
  return data;
};
export const signUpFetcher = async (
  signupCredentials: SignUpCredentials
): Promise<signupResponseDTO> => {
  console.log("\n\n== signUpFetcher\nsignupCredentials", signupCredentials);
  console.log("API_USER_URL", API_USER_URL);
  const response = await fetch(API_USER_URL, {
    method: HTTP_REQUEST.POST,
    headers: HTTP_HEADERS,
    body: JSON.stringify(signupCredentials),
  });

  const data = await response.json(); // Assuming the server responds with JSON
  return data;
};
