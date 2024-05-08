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
import { LOGIN_URL } from "@/utils/urls";
import { Button } from "@stianlarsen/react-ui-kit";
import { useFormState } from "react-dom";
import { ForgotPasswordButtonsWrapper } from "../../forgotPasswordButtonsWrapper/forgotPasswordButtonsWrapper";
import { ForgotPasswordButton } from "../buttons/resetPasswordButton";

export const ForgotForm = () => {
  const [state, dispatch] = useFormState(forgotPassword, null);

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
        <Button href={LOGIN_URL} variant="link">
          Go to login
        </Button>
      </ForgotPasswordButtonsWrapper>
    </CustomForm>
  );
};
