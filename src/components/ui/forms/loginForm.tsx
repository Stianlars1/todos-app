"use client";
import { signIn } from "@/app/actions/auth/signIn";
import { CustomForm } from "@/components/form/components/customForm/customForm";
import {
  CustomInput,
  CustomInputLabel,
  CustomInputLabelWrapper,
} from "@/components/form/components/customInput/customInput";
import { FormContentWrapper } from "@/components/form/formContentWrapper";
import { ErrorMessage } from "../errorMessage/errorMessage";
import { LoginButton } from "./components/LoginButton";
import { geistSans } from "@/fonts";
import { useActionState } from "react";

export const LoginForm = () => {
  const [state, dispatch] = useActionState(signIn, null);
  const errorMessage = state?.errorMessage;

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
          />
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
          />
        </CustomInputLabelWrapper>
      </FormContentWrapper>
      {errorMessage && (
        <ErrorMessage
          errorMessage={errorMessage}
          isError={Boolean(errorMessage)}
          margins={false}
        />
      )}
      <LoginButton />
    </CustomForm>
  );
};
