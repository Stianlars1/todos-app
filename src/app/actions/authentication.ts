"use server";
import { redirect } from "next/navigation";
import { LoginFormSchema, SignupFormSchema } from "../lib/definitions";
import { createSession, deleteSession } from "../lib/sessions";
import { loginFetcher, signUpFetcher } from "./api";

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

  const loginResponse = await loginFetcher({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  });

  if (!loginResponse.success) {
    return {
      isSuccess: false,
      errorMessage: loginResponse.message,
    };
  }

  const refreshToken = loginResponse.data.refreshToken;
  await createSession(refreshToken);
  redirect("/");
};
export const signup = async (_currentState: unknown, formData: FormData) => {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    firstName: formData.get("firstname"),
    lastName: formData.get("lastname"),
    email: formData.get("email"),
    password: formData.get("password"),
    additional: "",
  });

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

  console.log("\n first");
  try {
    const signupResponse = await signUpFetcher(newUser);
    console.log("\n second");

    console.log("== signup\n signupResponse", signupResponse);

    if (!signupResponse.success) {
      return {
        isSuccess: false,
        errorMessage: signupResponse.message,
      };
    }

    redirect("/login?signup=success");
  } catch (error) {
    console.log("== signup\n error", error);

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

export const logout = async () => {
  await deleteSession();
  redirect("/login");
};
