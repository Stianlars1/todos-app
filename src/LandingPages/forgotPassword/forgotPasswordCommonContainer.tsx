import "./css/forgotOrResetPage.css";
import { ForgotPage } from "./pages/forgotPage";
import { ResetPage } from "./pages/resetPage";
export const ForgotPasswordCommonContainer = ({
  variant,
}: {
  variant: "forgot-password" | "reset-password";
}) => {
  const isForgotPage = variant === "forgot-password";
  // const isSuccess = useSearchParams().get("success");
  // const forgotPasswordResetLinkSentWithSuccess =
  //   isForgotPage && isSuccess === "true"
  //     ? true
  //     : isForgotPage && isSuccess === "false"
  //     ? false
  //     : undefined;
  // const resetPasswordSuccess =
  //   isResetPage && isSuccess === "true"
  //     ? true
  //     : isResetPage && isSuccess === "false"
  //     ? false
  //     : undefined;

  if (isForgotPage) return <ForgotPage />;
  return <ResetPage />;

  // return (
  //   <div className="grid-container-password__main">
  //     <header className="grid-container-password__main__header">
  //       <h1 className="grid-container-password__main__header__title">
  //         {forgotPasswordResetLinkSentWithSuccess === true &&
  //           "Reset link was sent successfully"}
  //         {resetPasswordSuccess === true && "Password updated successfully"}
  //         {isForgotPage &&
  //           !forgotPasswordResetLinkSentWithSuccess &&
  //           "Reset your TaskBuddy Password"}
  //         {isResetPage &&
  //           !forgotPasswordResetLinkSentWithSuccess &&
  //           !resetPasswordSuccess &&
  //           "Create a new password"}
  //       </h1>
  //       <p className="grid-container-password__main__header__description">
  //         {isForgotPage &&
  //           !forgotPasswordResetLinkSentWithSuccess &&
  //           "Please enter your email address to reset your password. We will send you an email with a link to follow."}
  //         {isResetPage &&
  //           !forgotPasswordResetLinkSentWithSuccess &&
  //           "Please enter your new password. Make sure it's at least 8 characters long, and includes a number."}

  //         {forgotPasswordResetLinkSentWithSuccess &&
  //           "A reset password link has been sent to the email's recipient. Please follow the link to create a new password."}
  //         {resetPasswordSuccess &&
  //           "The password has been updated, and you can now log in with your new password."}
  //       </p>
  //     </header>
  //     {forgotPasswordResetLinkSentWithSuccess && (
  //       <>
  //         <SuccessMessage message={"Reset link sent successfully"} />

  //         <Button href={LOGIN_URL} variant="link">
  //           Go back
  //         </Button>
  //       </>
  //     )}
  //     {resetPasswordSuccess && (
  //       <>
  //         <SuccessMessage message={"Password updated successfully"} />

  //         <Button href={LOGIN_URL} variant="link">
  //           Login
  //         </Button>
  //       </>
  //     )}

  //     {!forgotPasswordResetLinkSentWithSuccess && !resetPasswordSuccess && (
  //       <ForgotOrResetForm variant={variant} />
  //     )}
  //   </div>
  // );
};
