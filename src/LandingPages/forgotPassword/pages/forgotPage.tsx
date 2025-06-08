"use client";
import { ROUTE_LOGIN } from "@/utils/urls";
import { Button } from "@stianlarsen/react-ui-kit";
import { useSearchParams } from "next/navigation";
import {
  ForgotPasswordPageContainer,
  ForgotPasswordPageHeader,
} from "../components/common/forgotPasswordCommonComponents";
import { ForgotPasswordSuccessPage } from "../components/forgotPasswordSuccessPage/forgotPasswordSuccessPage";
import { ForgotForm } from "../components/forms/forgotForm/forgotForm";

export const ForgotPage = () => {
  const resetLinkSent = useSearchParams().get("success") === "true";
  // if (state?.success && !state?.message) {
  //   return <SuccessMessage message="" />;
  // }
  const title = "Forgot Password?";
  const description =
    "Enter your email address below, and we'll email you a link to reset your password.";

  if (resetLinkSent) {
    return (
      <>
        <ForgotPasswordSuccessPage
          variant="forgot"
          title="Check Your Inbox!"
          description="🎉 We've sent a password reset link to your email address. Follow the link in the email to reset your password."
        >
          <Button href={ROUTE_LOGIN} variant="link">
            Go to login
          </Button>
        </ForgotPasswordSuccessPage>
      </>
    );
  }
  return (
    <ForgotPasswordPageContainer>
      <ForgotPasswordPageHeader title={title} description={description} />

      {!resetLinkSent && <ForgotForm />}
      {resetLinkSent && (
        <>
          <Button href={ROUTE_LOGIN} variant="link">
            Go back to login
          </Button>
        </>
      )}
    </ForgotPasswordPageContainer>
  );
};
