"use client";
import { forgotPassword } from "@/app/actions/password/forgot";
import { ErrorMessage } from "@/components/ui/errorMessage/errorMessage";
import { GeistSans } from "geist/font/sans";
import { useFormState, useFormStatus } from "react-dom";
import { ResetPasswordButton } from "../buttons/resetPasswordButton";

export const ForgotForm = () => {
  const [state, dispatch] = useFormState(forgotPassword, null);
  const { pending } = useFormStatus();

  console.log("state", state);

  if (state?.success && state?.message) {
    return (
      <div className="form-card-reset-password__form">
        <p className="form-card-reset-password__form__success-message">
          {state.message}
        </p>
      </div>
    );
  }
  return (
    <form action={dispatch} className="form-card-reset-password__form">
      <div className="form-card-reset-password__form__group">
        <label htmlFor="email">Email</label>
        <input
          className={GeistSans.className}
          autoComplete="email"
          type="email"
          id="email"
          name="email"
          required
        />
      </div>
      <ErrorMessage
        errorMessage={state?.message.toString() || null}
        isError={state?.success === false}
        margins={false}
      />
      {pending && <p>Loading</p>}
      <ResetPasswordButton variant="forgot-password" />
    </form>
  );
};
