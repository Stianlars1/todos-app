"use server";
import { LoginFormSchema } from "@/app/lib/auth/definitions";

import { API_AUTH_SIGN_IN_URL, ROUTE_ROOT } from "@/utils/urls";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/session";
import { AuthResponse } from "@/types/auth";
import { APPLICATION_JSON_V1, HTTP_REQUEST } from "@/utils/fetch/fetch";

export async function signIn(prevState: unknown, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 1. First handle the sign-in logic and get result
  const result = await handleSignIn(formData);
  console.log("result", result);

  // 3. If there was an feedback, return it
  if ("error" in result) {
    return result;
  }

  const userLanguagePreference = result.user.locale;

  if (userLanguagePreference) {
    const redirectUrl = `${ROUTE_ROOT}${userLanguagePreference}`;
    return redirect(redirectUrl);
  }

  return redirect(ROUTE_ROOT);
}

// Separate function to handle the sign in logic
async function handleSignIn(formData: FormData) {
  try {
    const credentials = {
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
    };

    console.log("signIn", credentials, API_AUTH_SIGN_IN_URL);
    // Make the sign in API call
    const response = await fetch(API_AUTH_SIGN_IN_URL, {
      method: HTTP_REQUEST.POST,
      headers: APPLICATION_JSON_V1,
      body: JSON.stringify(credentials),
      credentials: "include",
    });

    const data: AuthResponse = await response.json();
    console.log("Sign in response data:", data);

    if (!response.ok) {
      return {
        error:
          (data as unknown as Error).message ||
          "Sign in failed. Please try again.",
      };
    }

    // Create session
    await createSession(data.accessToken, data.refreshToken, data.user);

    return { success: true, user: data.user };
  } catch (error) {
    console.error("Sign in feedback:", error);
    return {
      error: "Sign in failed. Please try again.",
    };
  }
}
