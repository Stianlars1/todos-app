import { ReactElement, ReactNode } from "react";
import { MdCheck } from "react-icons/md";

interface ForgotPasswordSuccessPage {
  children: ReactNode | ReactNode[] | ReactElement | ReactElement[];
  title: string;
  description: string;
}
export const ForgotPasswordSuccessPage = ({
  children,
  title,
  description,
}: ForgotPasswordSuccessPage) => {
  return (
    <div className="grid-container-password__main-success">
      <header className="grid-container-password__main-success__header">
        <h1>
          <span>
            <MdCheck /> {title}
          </span>
        </h1>
        <p>{description}</p>
      </header>
      {children}
    </div>
  );
};
