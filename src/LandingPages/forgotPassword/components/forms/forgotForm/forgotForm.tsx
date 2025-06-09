"use client";
import { forgotPassword } from "@/app/actions/password/forgot";
import { CustomForm } from "@/components/form/components/customForm/customForm";
import {
  CustomInput,
  CustomInputLabel,
  CustomInputLabelWrapper,
} from "@/components/form/components/customInput/customInput";
import { FormContentWrapper } from "@/components/form/formContentWrapper";
import { ErrorMessage } from "@/components/ui/errorMessage/errorMessage";
import { ROUTE_SIGN_IN } from "@/utils/urls";
import { Button } from "@stianlarsen/react-ui-kit";
import { ForgotPasswordButtonsWrapper } from "../../forgotPasswordButtonsWrapper/forgotPasswordButtonsWrapper";
import { ForgotPasswordButton } from "../buttons/resetPasswordButton";
import { useActionState } from "react";

export const ForgotForm = () => {
  const [state, dispatch] = useActionState(forgotPassword, null);

  return (
    <CustomForm action={dispatch}>
      <FormContentWrapper>
        <CustomInputLabelWrapper>
          <CustomInputLabel htmlFor="email">Email Address</CustomInputLabel>
          <CustomInput
            type="email"
            autoComplete="email"
            id="email"
            name="email"
            placeholder="Enter your email address..."
            width="100%"
            required
          />
        </CustomInputLabelWrapper>
      </FormContentWrapper>

      <ErrorMessage
        errorMessage={state?.message.toString() || null}
        isError={state?.success === false}
        margins={false}
      />

      <ForgotPasswordButtonsWrapper>
        <ForgotPasswordButton variant="forgot-password" />
        <Button href={ROUTE_SIGN_IN} variant="link">
          Go to login
        </Button>
      </ForgotPasswordButtonsWrapper>
    </CustomForm>
  );
};
