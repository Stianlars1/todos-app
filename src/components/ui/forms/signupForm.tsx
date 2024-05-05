"use client";
import { signup } from "@/app/actions/auth/signup";
import { SignUpButton } from "@/components/ui/forms/components/signupButton";
import { GeistSans } from "geist/font/sans";
import { useFormState } from "react-dom";
import { FormError } from "./components/formError/formError";
export const SignUpForm = () => {
  const [state, dispatch] = useFormState(signup, null);
  console.log("== SignUpForm\nstate", state);
  return (
    <>
      {state?.error?.additional && (
        <FormError
          style={{ listStyleType: "none", margin: "0" }}
          errorArray={[state.error.additional]}
        />
      )}
      {state?.errorMessage && (
        <FormError
          style={{ listStyleType: "none", margin: "0" }}
          errorArray={[state.errorMessage]}
        />
      )}
      <form className={`form ${GeistSans.className}`} action={dispatch}>
        <div className="form__group">
          <label htmlFor="firstname">First Name</label>
          <input type="text" id="firstname" name="firstname" required />
          <FormError errorArray={state?.errors?.firstName} />
        </div>
        <div className="form__group">
          <label htmlFor="lastname">Last Name</label>
          <input type="text" id="lastname" name="lastname" required />
          <FormError errorArray={state?.errors?.lastName} />
        </div>
        <div className="form__group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
          <FormError errorArray={state?.errors?.email} />
        </div>
        <div className="form__group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
          <FormError errorArray={state?.errors?.password} />
        </div>
        <SignUpButton />
      </form>
    </>
  );
};
