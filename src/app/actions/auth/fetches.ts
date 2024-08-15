import { APPLICATION_JSON_V1, HTTP_REQUEST } from "@/utils/fetch/fetch";
import { API_AUTH_URL, API_USER_URL } from "@/utils/urls";
import {
  LoginCredentials,
  SignUpCredentials,
  authResponseDTO,
  signupResponseDTO,
} from "../types";

export const loginFetcher = async (
  loginCredentials: LoginCredentials,
): Promise<authResponseDTO> => {
  const response = await fetch(API_AUTH_URL, {
    method: HTTP_REQUEST.POST,
    headers: APPLICATION_JSON_V1,
    body: JSON.stringify(loginCredentials),
    next: { revalidate: 0 },
  });

  const data = await response.json(); // Assuming the server responds with JSON
  return data;
};
export const signUpFetcher = async (
  signupCredentials: SignUpCredentials,
): Promise<signupResponseDTO> => {
  const response = await fetch(API_USER_URL, {
    method: HTTP_REQUEST.POST,
    headers: APPLICATION_JSON_V1,
    body: JSON.stringify(signupCredentials),
    next: { revalidate: 0 },
  });

  const data = await response.json(); // Assuming the server responds with JSON
  return data;
};
