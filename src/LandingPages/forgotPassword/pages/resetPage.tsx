"use client";
import { FORGOT_URL, LOGIN_URL } from "@/utils/urls";
import { Button } from "@stianlarsen/react-ui-kit";
import { useSearchParams } from "next/navigation";
import {
  ForgotPasswordPageContainer,
  ForgotPasswordPageHeader,
} from "../components/common/forgotPasswordCommonComponents";
import { ForgotPasswordSuccessPage } from "../components/forgotPasswordSuccessPage/forgotPasswordSuccessPage";
import { ResetForm } from "../components/forms/resetForm/resetForm";

export const ResetPage = () => {
  const passwordUpdatedWithSuccess =
    useSearchParams().get("success") === "true";
  const resetToken = useSearchParams().get("token");
  // if (state?.success && !state?.message) {
  //   return <SuccessMessage message="" />;
  // }
  const title = "Reset Your Password 🔑";
  const description =
    "Please enter your new password below. Make sure it's strong and secure to protect your account.";

  if (passwordUpdatedWithSuccess) {
    return (
      <>
        <ForgotPasswordSuccessPage
          title="Password Updated Successfully!"
          description="🎉 Your password has been successfully updated. You can now use your new password to log in."
        >
          <Button href={LOGIN_URL} variant="link">
            Go to login
          </Button>
        </ForgotPasswordSuccessPage>
      </>
    );
  }

  if (!resetToken) {
    return (
      <ForgotPasswordPageContainer>
        <ForgotPasswordPageHeader
          title="Invalid or Expired Link"
          description={<InvalidTokenDescription />}
        />
      </ForgotPasswordPageContainer>
    );
  }

  return (
    <ForgotPasswordPageContainer>
      <ForgotPasswordPageHeader title={title} description={description} />

      {!passwordUpdatedWithSuccess && <ResetForm />}
      {passwordUpdatedWithSuccess && (
        <>
          <Button href={LOGIN_URL} variant="link">
            Go back to login
          </Button>
        </>
      )}
    </ForgotPasswordPageContainer>
  );
};

const InvalidTokenDescription = () => {
  return (
    <>
      <span>
        The link has either expired or is not valid. Please{" "}
        <a
          style={{
            fontFamily: "inherit",
            color: "hsl(var(--muted-foreground))",
            whiteSpace: "nowrap",
          }}
          href={FORGOT_URL}
        >
          try again
        </a>{" "}
        to reset your password. Or , if this was a mistake, head back to the{" "}
        <a
          style={{
            fontFamily: "inherit",
            color: "hsl(var(--muted-foreground))",
            whiteSpace: "nowrap",
          }}
          href={LOGIN_URL}
        >
          login page
        </a>
      </span>
    </>
  );
};