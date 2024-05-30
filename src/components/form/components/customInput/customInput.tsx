import { GeistSans } from "geist/font/sans";
import {
  CSSProperties,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactElement,
  ReactNode,
  forwardRef,
} from "react";
import "./css/customInput.css";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: "100%" | "fit-content";
}

interface CustomInputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ width, ...props }, ref) => {
    const customStyle: CSSProperties = width ? { width: width } : {};

    return (
      <input
        style={customStyle}
        {...props}
        ref={ref}
        className={`custom-input ${props.className ? props.className : " "}`}
      />
    );
  }
);

CustomInput.displayName = "CustomInput";

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
  style = {},
  className = "",
}: {
  children: ReactElement | ReactElement[] | ReactNode | ReactNode[];
  style?: CSSProperties;
  className?: string;
}) => {
  return (
    <div
      style={style}
      suppressHydrationWarning
      className={`custom-input-label-wrapper ${className}`}
    >
      {children}
    </div>
  );
};
