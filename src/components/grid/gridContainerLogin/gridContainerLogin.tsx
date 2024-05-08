import { GridProps } from "../gridContainer/types";
import { GridContainerLoginOrSignupNavbar } from "./GridContainerLoginOrSignupNavbar/GridContainerLoginOrSignupNavbar";
import "./css/gridContainerLogin.css";

export const GridContainerLogin = ({ children }: GridProps) => {
  return (
    <div className="grid-container-login">
      <GridContainerLoginOrSignupNavbar />
      {children}
    </div>
  );
};
