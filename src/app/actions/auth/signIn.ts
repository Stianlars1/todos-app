"use server";

import { LoginFormSchema } from "@/app/lib/auth/definitions";
import { API_AUTH_SIGN_IN_URL, ROUTE_ROOT } from "@/utils/urls";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/session";
import { AuthResponse } from "@/types/auth";

import { APPLICATION_JSON_V1, HTTP_REQUEST } from "@/utils/fetch/fetch";
import { AuthActionResponse } from "@/types/signIn";

export async function signIn(
  _prevState: AuthActionResponse | null,
  formData: FormData,
): Promise<AuthActionResponse> {
  try {
    // Validate form data
    const validatedFields = LoginFormSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error: {
          type: "validation",
          message: "Please check your input and try again.",
          fields: validatedFields.error.flatten().fieldErrors,
        },
      };
    }

    // Attempt authentication
    const authResult = await attemptAuthentication(validatedFields.data);

    if (!authResult.success) {
      return authResult;
    }

    // Success - determine redirect location
    const userLanguagePreference = authResult.data?.locale;
    const redirectUrl = userLanguagePreference
      ? `${ROUTE_ROOT}${userLanguagePreference}`
      : ROUTE_ROOT;

    // Redirect on success
    redirect(redirectUrl);
  } catch (error) {
    console.error("Unexpected error during sign in:", error);
    return {
      success: false,
      error: {
        type: "server",
        message: "An unexpected error occurred. Please try again.",
      },
    };
  }
}

async function attemptAuthentication(credentials: {
  email: string;
  password: string;
}): Promise<AuthActionResponse> {
  try {
    const response = await fetch(API_AUTH_SIGN_IN_URL, {
      method: HTTP_REQUEST.POST,
      headers: APPLICATION_JSON_V1,
      body: JSON.stringify(credentials),
      credentials: "include",
    });

    const data: AuthResponse = await response.json();

    // Handle authentication failure
    if (!response.ok) {
      const isAuthError = response.status === 401 || response.status === 403;

      return {
        success: false,
        error: {
          type: isAuthError ? "authentication" : "server",
          message: isAuthError
            ? "Invalid email or password. Please try again."
            : "Server error. Please try again later.",
        },
      };
    }

    // Validate response data
    if (!data.user || !data.accessToken) {
      return {
        success: false,
        error: {
          type: "server",
          message: "Authentication data is incomplete. Please try again.",
        },
      };
    }

    // Create session
    await createSession(data.accessToken, data.refreshToken, data.user);

    return {
      success: true,
      data: data.user,
    };
  } catch (error) {
    console.error("Network error during authentication:", error);
    return {
      success: false,
      error: {
        type: "network",
        message: "Network error. Please check your connection and try again.",
      },
    };
  }
}
