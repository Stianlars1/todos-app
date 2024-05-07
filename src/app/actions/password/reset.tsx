"use server";

import { redirect } from "next/navigation";
import { resetPasswordFetcher } from "./fetches";
import { ResetPasswordFetcherProps, ResetPasswordResponse } from "./types";

export const resetPassword = async (
  _currentState: unknown,
  formData: FormData
) => {
  const password = formData.get("password")?.toString();
  const token = formData.get("token")?.toString();
  console.log("email", password);

  if (!password || !token) {
    console.log("Please enter a new password");
    return {
      success: false,
      message: "Please enter a new password",
    };
  }

  const resetObject: ResetPasswordFetcherProps = {
    newPassword: password,
    token: token,
  };

  const resetResponse: ResetPasswordResponse = await resetPasswordFetcher(
    resetObject
  ).catch((error) => {
    return {
      success: false,
      message: `${error.message} (VPN? Network issues?)`,
    };
  });

  if (resetResponse.success) {
    redirect("/reset-password?success=true");
  }

  return resetResponse;
};
