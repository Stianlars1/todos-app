import { ReactNode } from "react";
import "./css/headings.css";

interface Heading1Props {
  children: ReactNode;
  position?: "center" | "left" | "right";
  className?: string;
}
export const Heading1 = ({
  children,
  position = "center",
  className = " ",
}: Heading1Props) => {
  return <h1 className={`heading1 ${position} ${className}`}>{children}</h1>;
};
