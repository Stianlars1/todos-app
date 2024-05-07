"use client";
import { resetPassword } from "@/app/actions/password/reset";
import { ErrorMessage } from "@/components/ui/errorMessage/errorMessage";
import { GeistSans } from "geist/font/sans";
import { useSearchParams } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { ResetPasswordButton } from "../buttons/resetPasswordButton";

export const ResetForm = () => {
  const token = useSearchParams().get("token");
  const validToken = token ? true : false;
  const [state, dispatch] = useFormState(resetPassword, null);
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

  if (!validToken) {
    return (
      <ErrorMessage
        errorMessage={
          "The link has either expired or is not valid. Please try again"
        }
        isError={!validToken}
      />
    );
  }
  return (
    <form action={dispatch} className="form-card-reset-password__form">
      <div className="form-card-reset-password__form__group">
        <label htmlFor="email">New password</label>
        <input
          className={GeistSans.className}
          autoComplete="email"
          type="password"
          id="password"
          name="password"
          required
        />
        {validToken && token && (
          <input
            className={GeistSans.className}
            autoComplete="email"
            type="token"
            id="token"
            name="token"
            value={token}
            hidden
          />
        )}
      </div>
      <ErrorMessage
        errorMessage={state?.message.toString() || null}
        isError={state?.success === false}
        margins={false}
      />
      {pending && <p>Loading</p>}
      <ResetPasswordButton variant="reset-password" />
    </form>
  );
};
