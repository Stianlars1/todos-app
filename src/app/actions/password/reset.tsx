"use server";

import { redirect } from "next/navigation";
import { ResetPasswordSchema } from "./definitions";
import { resetPasswordFetcher } from "./fetches";
import { ResetPasswordFetcherProps, ResetPasswordResponse } from "./types";

export const resetPassword = async (
  _currentState: unknown,
  formData: FormData,
) => {
  // Validate password field
  const validatedFields = ResetPasswordSchema.safeParse({
    password: formData.get("password"),
    token: formData.get("token"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    const failedValidationReturnObject: ResetPasswordResponse = {
      success: false,
      message: "Please enter a new password",
      errors: validatedFields.error.flatten().fieldErrors,
    };

    return failedValidationReturnObject;
  }

  const resetObject: ResetPasswordFetcherProps = {
    newPassword: validatedFields.data.password,
    token: validatedFields.data.token,
  };

  const resetResponse: ResetPasswordResponse =
    await resetPasswordFetcher(resetObject);
  // .catch((error) => {
  //   return {
  //     success: false,
  //     message: `${error.message} (VPN? Network issues?)`,
  //   };
  // });

  if (resetResponse.success) {
    redirect("/reset-password?success=true");
  }

  return {
    success: false,
    message: resetResponse.message,
  };
};

// import { SignupFormSchema } from "@/app/lib/auth/definitions";
// import { redirect } from "next/navigation";
// import { signUpFetcher } from "./fetches";

// export const sign-up = async (_currentState: unknown, formData: FormData) => {
//   // Validate form fields
//   const validatedFields = SignupFormSchema.safeParse({
//     firstName: formData.get("firstname"),
//     lastName: formData.get("lastname"),
//     email: formData.get("email"),
//     password: formData.get("password"),
//     additional: "",
//   });

//   // If any form fields are invalid, return early
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     };
//   }

//   const newUser = {
//     firstName: validatedFields.data.firstName,
//     lastName: validatedFields.data.lastName,
//     email: validatedFields.data.email,
//     password: validatedFields.data.password,
//   };

//   try {
//     const signupResponse = await signUpFetcher(newUser);

//     if (!signupResponse.success) {
//       return {
//         isSuccess: false,
//         errorMessage: signupResponse.message,
//       };
//     }

//     redirect("/signIn?sign-up=success");
//   } catch (error) {
//     if (error instanceof Error && error.message === "NEXT_REDIRECT") {
//       redirect("/signIn?sign-up=success");
//     }

//     if (error instanceof TypeError) {
//       return {
//         isSuccess: false,
//         errorMessage: `${error.message} (VPN? Network issues?)`,
//         error: {
//           additional:
//             "An error occurred. Please Check your network or VPN or try again later.",
//         },
//       };
//     }

//     return {
//       isSuccess: false,
//       error: { additional: "An error occurred. Please try again later." },
//     };
//   }
// };
