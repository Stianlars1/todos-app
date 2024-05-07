import { GeistSans } from "geist/font/sans";
import {
  CSSProperties,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";
import "./css/customInput.css";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: "100%" | "fit-content";
}

interface CustomInputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const CustomInput = ({ width, ...props }: CustomInputProps) => {
  const customStyle: CSSProperties = width ? { width: width } : {};
  return (
    <input
      style={customStyle}
      {...props}
      className={`custom-input ${GeistSans.className} ${
        props.className ? props.className : " "
      }`}
    />
  );
};

export const CustomInputLabel = ({
  children,
  ...props
}: CustomInputLabelProps) => {
  return (
    <label
      {...props}
      className={`custom-input-label ${GeistSans.className} ${
        props.className ? props.className : " "
      }`}
    >
      {children}
    </label>
  );
};

export const CustomInputLabelWrapper = ({
  children,
}: {
  children: ReactElement | ReactElement[] | ReactNode | ReactNode[];
}) => {
  return <div className="custom-input-label-wrapper">{children}</div>;
};
