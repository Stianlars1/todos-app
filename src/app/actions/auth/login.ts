"use server";
import { LoginFormSchema } from "@/app/lib/auth/definitions";

import { ROUTE_ROOT } from "@/utils/urls";
import { redirect } from "next/navigation";
import { decodeToken } from "../token";
import { authResponseDTO, DecryptedToken } from "../types";
import { loginFetcher } from "./fetches";
import { createSession } from "@/lib/session";

export const login = async (_currentState: unknown, formData: FormData) => {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const loginResponse: authResponseDTO | { success: boolean; message: string } =
    await loginFetcher({
      email: validatedFields.data.email,
      password: validatedFields.data.password,
    }).catch((error) => {
      return {
        success: false,
        message: `${error.message} (VPN? Network issues?)`,
      };
    });

  if (!loginResponse.success) {
    return {
      isSuccess: false,
      errorMessage: loginResponse.message,
    };
  }

  const refreshToken = (loginResponse as authResponseDTO).data.refreshToken;
  const accessToken = (loginResponse as authResponseDTO).data.accessToken;
  const decryptedToken = decodeToken(accessToken) as DecryptedToken;
  await createSession(accessToken, refreshToken);

  const userLanguagePreference = decryptedToken.locale;

  if (userLanguagePreference) {
    const redirectUrl = `${ROUTE_ROOT}${userLanguagePreference}`;
    return redirect(redirectUrl);
  }

  return redirect(ROUTE_ROOT);
};
