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

  if (response.status === 400) {
    console.log("error was 400", response);
    return {
      success: false,
      message:
        "The password has already been reset, or the link is not valid in our systems.",
    };
  }

  if (!response.ok) {
    console.log("!response.ok", response);

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }

  const res = await response.text();

  if (res === passwordWasTheSameError || res === passwordHasBeenReset) {
    return {
      success: false,
      message: res,
    };
  }

  return {
    success: true,
    message: res,
  };
};

const forgotPasswordSuccessMessage =
  "Password reset link has been sent to your email.";

const passwordHasBeenReset = "Password has already been reset.";
const passwordWasTheSameError = "You cannot use the same password.";
