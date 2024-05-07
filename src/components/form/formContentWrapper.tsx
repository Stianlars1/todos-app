import { ReactElement, ReactNode } from "react";
import "./css/formContentWrapper.css";

export const FormContentWrapper = ({
  children,
}: {
  children: ReactElement | ReactElement[] | ReactNode | ReactNode[];
}) => {
  return <div className="form-content-wrapper">{children}</div>;
};
