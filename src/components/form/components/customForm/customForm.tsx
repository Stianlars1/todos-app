import { FormHTMLAttributes, ReactElement, ReactNode } from "react";
import styles from "./css/customForm.module.scss";

interface CustomFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode | ReactNode[] | ReactElement | ReactElement[];
}
export const CustomForm = ({ children, ...props }: CustomFormProps) => {
  return (
    <form
      {...props}
      className={`${styles.customForm} ${props.className || " "}`}
    >
      {children}
    </form>
  );
};
