import { ReactElement } from "react";
import "./css/forgotPasswordButtonsWrapper.css";

export const ForgotPasswordButtonsWrapper = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  return <div className="forgot-password-buttons-wrapper">{children}</div>;
};
