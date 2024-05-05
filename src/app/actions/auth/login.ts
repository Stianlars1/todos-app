import { LoginFormSchema } from "@/app/lib/auth/definitions";
import { redirect } from "next/navigation";
import { createSession } from "../session";
import { authResponseDTO, TokenType } from "../types";
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
  await createSession(token);
  redirect("/");
};
