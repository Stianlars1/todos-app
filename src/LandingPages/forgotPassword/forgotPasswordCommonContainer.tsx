import { ForgotPage } from "./pages/forgotPage";
import { ResetPage } from "./pages/resetPage";
export const ForgotPasswordCommonContainer = ({
  variant,
}: {
  variant: "forgot-password" | "reset-password";
}) => {
  const isForgotPage = variant === "forgot-password";

  if (isForgotPage) return <ForgotPage />;
  return <ResetPage />;
};
