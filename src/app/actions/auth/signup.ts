"use server";
import { SignupFormSchema } from "@/app/lib/auth/definitions";
import { redirect } from "next/navigation";
import { signUpFetcher } from "./fetches";

export const signup = async (_currentState: unknown, formData: FormData) => {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    firstName: formData.get("firstname"),
    lastName: formData.get("lastname"),
    email: formData.get("email"),
    password: formData.get("password"),
    additional: "",
  });

  const recaptchaToken = formData.get("recaptcha") as string;
  const tokenVerification = await verifyRecaptcha(recaptchaToken);

  // Check reCAPTCHA score
  if (!tokenVerification.success || tokenVerification.score < 0.5) {
    console.error(
      "Recaptcha verification failed or score too low",
      tokenVerification.score,
    );
    return {
      isSuccess: false,
      errorMessage: "Recaptcha verification failed",
    };
  }

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const newUser = {
    firstName: validatedFields.data.firstName,
    lastName: validatedFields.data.lastName,
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  };

  try {
    const signupResponse = await signUpFetcher(newUser);

    if (!signupResponse.success) {
      return {
        isSuccess: false,
        errorMessage: signupResponse.message,
      };
    }

    redirect("/login?signup=success");
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      redirect("/login?signup=success");
    }

    if (error instanceof TypeError) {
      return {
        isSuccess: false,
        errorMessage: `${error.message} (VPN? Network issues?)`,
        error: {
          additional:
            "An error occurred. Please Check your network or VPN or try again later.",
        },
      };
    }

    return {
      isSuccess: false,
      error: { additional: "An error occurred. Please try again later." },
    };
  }
};

const verifyRecaptcha = async (token: string) => {
  const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;

  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  const response = await fetch(verificationUrl, {
    method: "POST",
  });

  return await response.json();
};
