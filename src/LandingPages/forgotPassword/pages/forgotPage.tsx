import {
  ResetPasswordPageContainer,
  ResetPasswordPageHeader,
} from "../components/resetPasswordPageComponents/resetPasswordPageComponents";

export const ForgotPage = () => {
  const title = "Forgot Password?";
  const description =
    "Please enter your email address to reset your password. We will send you an email with a link to follow.";
  return (
    <ResetPasswordPageContainer>
      <ResetPasswordPageHeader title={title} description={description} />
    </ResetPasswordPageContainer>
  );
};
