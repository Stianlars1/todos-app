import { GridProps } from "../gridContainer/types";
import "./css/gridContainerLogin.css";

export const GridContainerLogin = ({ children }: GridProps) => {
  return <div className="grid-container-login">{children}</div>;
};
