import { CommonNavbar } from "@/components/commonNavbar/commonNavbar";
import { ReactElement } from "react";
import "./css/gridContainerPassword.css";

export const GridContainerPassword = async ({
  children,
}: {
  children: ReactElement;
}) => {
  return (
    <div className="grid-container-password">
      <CommonNavbar />
      {children}
    </div>
  );
};
