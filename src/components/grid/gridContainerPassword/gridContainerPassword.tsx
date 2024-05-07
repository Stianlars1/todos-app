import { ReactElement } from "react";
import { GridContainerPasswordNavbar } from "./components/gridContainerPasswordNavbar";
import "./css/gridContainerPassword.css";

export const GridContainerPassword = async ({
  children,
}: {
  children: ReactElement;
}) => {
  return (
    <div className="grid-container-password">
      <GridContainerPasswordNavbar />
      {children}
    </div>
  );
};
