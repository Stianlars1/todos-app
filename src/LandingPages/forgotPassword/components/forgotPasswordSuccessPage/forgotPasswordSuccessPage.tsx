import {
  EmailSentAnimation,
  SuccessAnimation,
} from "@/content/lotties/lotties";
import { ReactElement, ReactNode } from "react";

interface ForgotPasswordSuccessPage {
  children: ReactNode | ReactNode[] | ReactElement | ReactElement[];
  title: string;
  description: string;
  variant: "forgot" | "reset";
}
export const ForgotPasswordSuccessPage = ({
  children,
  title,
  description,
  variant,
}: ForgotPasswordSuccessPage) => {
  const Animation =
    variant === "forgot" ? EmailSentAnimation : SuccessAnimation;
  return (
    <div className="grid-container-password__main-success">
      <header className="grid-container-password__main-success__header">
        <Animation widthHeight={150} />
        <h1>
          <span>{title}</span>
        </h1>
        <p>{description}</p>
      </header>
      {children}
    </div>
  );
};
