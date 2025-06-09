"use client";
import { resetPassword } from "@/app/actions/password/reset";
import { CustomForm } from "@/components/form/components/customForm/customForm";
import {
  CustomInput,
  CustomInputLabel,
  CustomInputLabelWrapper,
} from "@/components/form/components/customInput/customInput";
import { FormContentWrapper } from "@/components/form/formContentWrapper";
import { ErrorMessage } from "@/components/ui/errorMessage/errorMessage";
import { FormError } from "@/components/ui/forms/components/formError/formError";
import { ROUTE_SIGN_IN } from "@/utils/urls";
import { Button } from "@stianlarsen/react-ui-kit";
import { useSearchParams } from "next/navigation";
import { ForgotPasswordButtonsWrapper } from "../../forgotPasswordButtonsWrapper/forgotPasswordButtonsWrapper";
import { ForgotPasswordButton } from "../buttons/resetPasswordButton";
import { useActionState } from "react";

export const ResetForm = () => {
  const token = useSearchParams().get("token");
  const validToken = token ? true : false;
  const [state, dispatch] = useActionState(resetPassword, null);

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
    <CustomForm action={dispatch}>
      <FormContentWrapper>
        <CustomInputLabelWrapper>
          <CustomInputLabel htmlFor="email">New password</CustomInputLabel>
          <CustomInput
            type="password"
            id="password"
            name="password"
            placeholder="Enter your new password..."
            width="100%"
            required
          />

          {state?.errors?.password && (
            <FormError
              style={{ listStyleType: "none", margin: "0" }}
              errorArray={state?.errors?.password}
            />
          )}

          {state?.errors?.token && (
            <FormError
              style={{ listStyleType: "none", margin: "0" }}
              errorArray={state?.errors?.token}
            />
          )}
        </CustomInputLabelWrapper>

        {validToken && token && (
          <input
            type="token"
            id="token"
            name="token"
            defaultValue={token}
            value={token}
            hidden
          />
        )}
      </FormContentWrapper>

      <ErrorMessage
        errorMessage={state?.message.toString() || null}
        isError={state?.success === false}
        margins={false}
      />

      <ForgotPasswordButtonsWrapper>
        <ForgotPasswordButton variant="reset-password" />
        <Button href={ROUTE_SIGN_IN} variant="link">
          Go to login
        </Button>
      </ForgotPasswordButtonsWrapper>
    </CustomForm>
  );
};
