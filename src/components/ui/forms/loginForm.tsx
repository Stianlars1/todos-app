"use client";

import { signIn } from "@/app/actions/auth/signIn";
import { CustomForm } from "@/components/form/components/customForm/customForm";
import {
  CustomInput,
  CustomInputLabel,
  CustomInputLabelWrapper,
} from "@/components/form/components/customInput/customInput";
import { FormContentWrapper } from "@/components/form/formContentWrapper";
import { LoginButton } from "./components/LoginButton";
import { geistSans } from "@/fonts";
import { useActionState } from "react";
import { AuthActionResponse } from "@/types/signIn";
import { FormErrorDisplay } from "@/components/ui/forms/components/FormErrorDisplay/FormErrorDisplay";

export const LoginForm = () => {
  const [state, dispatch] = useActionState<AuthActionResponse | null, FormData>(
    signIn,
    null,
  );

  const hasError = state && !state.success;
  const error = hasError ? state.error : undefined;

  return (
    <CustomForm action={dispatch}>
      <FormContentWrapper>
        <CustomInputLabelWrapper>
          <CustomInputLabel htmlFor="email">Email</CustomInputLabel>
          <CustomInput
            className={geistSans.className}
            autoComplete="email"
            type="email"
            id="email"
            name="email"
            width="100%"
            placeholder="Enter your email address.."
            required
            aria-invalid={error?.fields?.email ? "true" : "false"}
            aria-describedby={error?.fields?.email ? "email-error" : undefined}
          />
          {error?.fields?.email && (
            <div id="email-error" className="field-error">
              {error.fields.email.map((message, index) => (
                <span key={index}>{message}</span>
              ))}
            </div>
          )}
        </CustomInputLabelWrapper>

        <CustomInputLabelWrapper>
          <CustomInputLabel htmlFor="password">Password</CustomInputLabel>
          <CustomInput
            className={geistSans.className}
            autoComplete="current-password"
            type="password"
            id="password"
            name="password"
            width="100%"
            placeholder="Enter your password.."
            required
            aria-invalid={error?.fields?.password ? "true" : "false"}
            aria-describedby={
              error?.fields?.password ? "password-error" : undefined
            }
          />
          {error?.fields?.password && (
            <div id="password-error" className="field-error">
              {error.fields.password.map((message, index) => (
                <span key={index}>{message}</span>
              ))}
            </div>
          )}
        </CustomInputLabelWrapper>
      </FormContentWrapper>

      {error && (
        <FormErrorDisplay
          error={error}
          showFieldErrors={false} // Field errors are shown inline
        />
      )}

      <LoginButton />
    </CustomForm>
  );
};
