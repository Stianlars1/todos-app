"use server";
import { SignupFormSchema } from "@/app/lib/auth/definitions";
import { permanentRedirect, redirect } from "next/navigation";
import { AuthResponse } from "@/types/auth";
import { createSession } from "@/lib/session";
import { API_AUTH_SIGN_UP_URL, ROUTE_SIGN_IN } from "@/utils/urls";
import { APPLICATION_JSON_V1, HTTP_REQUEST } from "@/utils/fetch/fetch";

const verifyRecaptcha = async (token: string) => {
  const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;

  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  const response = await fetch(verificationUrl, {
    method: "POST",
  });

  return await response.json();
};

type ErrorResponse = {
  message: string;
  // Add other feedback fields your backend might return
  status?: number;
  code?: string;
};

export async function signUp(prevState: unknown, formData: FormData) {
  // 1. First verify reCAPTCHA

  const recaptchaToken = formData.get("recaptcha") as string;
  const tokenVerification = await verifyRecaptcha(recaptchaToken);

  if (!tokenVerification.success || tokenVerification.score < 0.5) {
    return { errorMessage: "Recaptcha verification failed", errors: null };
  }

  const rawFormData = SignupFormSchema.safeParse({
    firstName: formData.get("firstname"),
    lastName: formData.get("lastname"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const validationResult = SignupFormSchema.safeParse(rawFormData);

  if (!validationResult.success) {
    return {
      errorMessage: null,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  // 2. First handle the registration logic and get result
  const result = await handleRegistration(validationResult.data);

  // 3. If there was an feedback, return it
  if ("error" in result) {
    console.error("sign-up error", result);
    return { errorMessage: result.error, errors: null };
  }

  // 4. If successful, redirect
  permanentRedirect("/?register=success");
}

// Separate function to handle the registration logic
async function handleRegistration(newUser: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  try {
    // Make the API call
    const response = await fetch(API_AUTH_SIGN_UP_URL, {
      method: HTTP_REQUEST.POST,
      headers: APPLICATION_JSON_V1,
      body: JSON.stringify(newUser),
      credentials: "include",
    });

    if ("error" in response) {
      console.error("error in response :72", response);
      if ("message" in response) {
        return {
          isSuccess: false,
          errors: null,
          errorMessage: response.message || "Registration failed",
        };
      }
    }

    if (!response.ok) {
      return {
        isSuccess: false,
        errors: null,
        errorMessage:
          (response as unknown as ErrorResponse).message ||
          "Registration failed",
      };
    }

    const data: AuthResponse = await response.json();
    // Create session
    await createSession(data.accessToken, data.refreshToken, data.user);

    return redirect(`${ROUTE_SIGN_IN}?signup=success`);
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      redirect("/login?signup=success");
    }

    if (error instanceof TypeError) {
      return {
        isSuccess: false,
        errorMessage: `${error.message} (VPN? Network issues?)`,
        errors: [
          "An error occurred. Please Check your network or VPN or try again later.",
        ],
      };
    }

    return {
      isSuccess: false,
      errors: ["An error occurred. Please try again later."],
      errorMessage: "An error occurred. Please try again later.",
    };
  }
}
