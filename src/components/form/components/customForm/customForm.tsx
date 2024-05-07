import { FormHTMLAttributes, ReactElement, ReactNode } from "react";
import "./css/customForm.css";
interface CustomFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode | ReactNode[] | ReactElement | ReactElement[];
}
export const CustomForm = ({ children, ...props }: CustomFormProps) => {
  return (
    <form {...props} className="custom-form">
      {children}
    </form>
  );
};
