"use server";
import { LoginFormSchema } from "@/app/lib/auth/definitions";

import { ROOT_URL } from "@/utils/urls";
import { redirect } from "next/navigation";
import { createSession } from "../session";
import { decodeToken } from "../token";
import { DecryptedToken, TokenType, authResponseDTO } from "../types";
import { loginFetcher } from "./fetches";

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
  const token: TokenType = { refreshToken, accessToken };
  const decryptedToken = decodeToken(JSON.stringify(token)) as DecryptedToken;
  await createSession(token);
  console.log("Login successful,  session created: ", decryptedToken);

  console.log("Decrypted token locale language : ", decryptedToken.locale);

  const userLanguagePreference = decryptedToken.locale;

  if (userLanguagePreference) {
    const locale = userLanguagePreference;
    const redirectUrl = `${ROOT_URL}${locale}`;
    console.log("Redirecting to user locale: ", userLanguagePreference);
    return redirect(redirectUrl);
  }

  console.log("Redirecting to default locale");

  return redirect(ROOT_URL);
};
