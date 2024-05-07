"use server";

import { redirect } from "next/navigation";
import { forgotPasswordFetcher } from "./fetches";
import { ForgotPasswordFetcherProps, ResetPasswordResponse } from "./types";

export const forgotPassword = async (
  _currentState: unknown,
  formData: FormData
) => {
  const email = formData.get("email")?.toString();
  console.log("email", email);

  if (!email) {
    console.log("Please enter your email address");
    return {
      success: false,
      message: "Please enter your email address",
    };
  }

  const forgotObject: ForgotPasswordFetcherProps = {
    email: email,
  };

  const forgotResponse: ResetPasswordResponse = await forgotPasswordFetcher(
    forgotObject
  ).catch((error) => {
    return {
      success: false,
      message: `${error.message} (VPN? Network issues?)`,
    };
  });

  if (forgotResponse.success) {
    redirect("/forgot-password?success=true");
  }

  return forgotResponse;
};
