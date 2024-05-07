import { APPLICATION_JSON_V1, HTTP_REQUEST } from "@/utils/fetch/fetch";
import { API_PASSWORD_FORGOT_URL, API_PASSWORD_RESET_URL } from "@/utils/urls";
import { ForgotPasswordFetcherProps, ResetPasswordFetcherProps } from "./types";

export const forgotPasswordFetcher = async (
  forgotObject: ForgotPasswordFetcherProps
): Promise<{
  success: boolean;
  message: string;
}> => {
  const response = await fetch(API_PASSWORD_FORGOT_URL, {
    method: HTTP_REQUEST.POST,
    headers: APPLICATION_JSON_V1,
    body: JSON.stringify(forgotObject),
    next: { revalidate: 0 },
  });

  if (response.status === 400) {
    console.log("error was 400", response);
    return {
      success: false,
      message: "Email address not found.",
    };
  }

  if (!response.ok) {
    console.log("!response.ok", response);

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }

  console.log("response", response);

  return {
    success: true,
    message: forgotPasswordSuccessMessage,
  };
};
export const resetPasswordFetcher = async (
  forgotObject: ResetPasswordFetcherProps
): Promise<{
  success: boolean;
  message: string;
}> => {
  const response = await fetch(API_PASSWORD_RESET_URL, {
    method: HTTP_REQUEST.POST,
    headers: APPLICATION_JSON_V1,
    body: JSON.stringify(forgotObject),
    next: { revalidate: 0 },
  });

  const responseText = await response.text(); // Fetch the response text to use it in logic

  if (!response.ok) {
    let errorMessage = "Something went wrong. Please try again later."; // Default error message
    if (response.status === 400) {
      if (responseText.includes("Password has already been reset")) {
        errorMessage =
          "The password reset link is no longer valid or has already been used. Please request a new one.";
      } else if (responseText.includes("You cannot use the same password")) {
        errorMessage = "You cannot use the same password as your current one.";
      } else if (responseText.includes("Invalid or expired token")) {
        errorMessage = "The password reset token is invalid or has expired.";
      }
    }
    console.error("Fetch error: ", response.status, responseText);
    return {
      success: false,
      message: errorMessage,
    };
  }

  return {
    success: true,
    message: "Your password has been successfully reset.",
  };
};

const forgotPasswordSuccessMessage =
  "Password reset link has been sent to your email.";

const passwordHasBeenReset = "Password has already been reset.";
const passwordWasTheSameError = "You cannot use the same password.";
