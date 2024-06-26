"use client";
import { login } from "@/app/actions/auth/login";
import { CustomForm } from "@/components/form/components/customForm/customForm";
import {
  CustomInput,
  CustomInputLabel,
  CustomInputLabelWrapper,
} from "@/components/form/components/customInput/customInput";
import { FormContentWrapper } from "@/components/form/formContentWrapper";
import { GeistSans } from "geist/font/sans";
import { useFormState } from "react-dom";
import { ErrorMessage } from "../errorMessage/errorMessage";
import { LoginButton } from "./components/LoginButton";
export const LoginForm = () => {
  const [state, dispatch] = useFormState(login, null);
  const errorMessage = state?.errorMessage
    ? getErrorMessage(state.errorMessage)
    : null;

  return (
    <CustomForm action={dispatch}>
      <FormContentWrapper>
        <CustomInputLabelWrapper>
          <CustomInputLabel htmlFor="email">Email</CustomInputLabel>
          <CustomInput
            className={GeistSans.className}
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
            className={GeistSans.className}
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
      <ErrorMessage
        errorMessage={errorMessage}
        isError={Boolean(state?.errorMessage)}
        margins={false}
      />
      <LoginButton />
    </CustomForm>
  );
};

const getErrorMessage = (errorMessage: string) => {
  switch (errorMessage) {
    case "Authentication failed: Bad credentials":
      return "Invalid email or password";
    case "fetch failed (VPN? Network issues?)":
      return "Network error. Please check your internet connection, firewall, or VPN.";
    default:
      return "An error occurred, please try again or come back another time. We're sorry for the inconvenience.";
  }
};
