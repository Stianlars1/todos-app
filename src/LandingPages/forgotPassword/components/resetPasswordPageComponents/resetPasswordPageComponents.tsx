import { ReactElement } from "react";

export const ResetPasswordPageHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
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

export const ResetPasswordPageContainer = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  return <div className="grid-container-password__main">{children}</div>;
};
