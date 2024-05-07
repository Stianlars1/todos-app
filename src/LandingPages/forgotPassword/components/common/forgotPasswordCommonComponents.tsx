import { ReactElement, ReactNode } from "react";
import "./css/forgotPasswordCommonComponents.css";

export const ForgotPasswordPageHeader = ({
  title,
  description,
}: {
  title: string;
  description: string | ReactElement | ReactNode;
}) => {
  return (
    <header className="grid-container-password__main__header">
      <h1 className="grid-container-password__main__header__title">{title}</h1>
      <p className="grid-container-password__main__header__description">
        {description}
      </p>
    </header>
  );
};

export const ForgotPasswordPageContainer = ({
  children,
}: {
  children: ReactElement | ReactElement[] | ReactNode | ReactNode[];
}) => {
  return <div className="grid-container-password__main">{children}</div>;
};
