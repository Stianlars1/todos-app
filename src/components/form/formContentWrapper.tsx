import { ReactElement, ReactNode } from "react";
import "./css/formContentWrapper.css";

export const FormContentWrapper = ({
  children,
  className = "",
  gapSizeInREM,
}: {
  children: ReactElement | ReactElement[] | ReactNode | ReactNode[];
  className?: string;
  gapSizeInREM?: number;
}) => {
  return (
    <div
      style={{ gap: gapSizeInREM ? `${gapSizeInREM}rem` : "1.625rem" }}
      className={`form-content-wrapper ${className}`}
    >
      {children}
    </div>
  );
};
