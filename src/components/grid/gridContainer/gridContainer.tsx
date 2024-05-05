import { getUserSettings } from "@/app/actions/user/userApi";
import "./css/gridContainer.css";
import { GridProps } from "./types";

export const GridContainer = async ({ children }: GridProps) => {
  const userSettings = await getUserSettings();
  return (
    <div
      data-sidebar-open={String(userSettings?.data?.sidebarOpen)}
      className="grid-container"
      id="grid-container"
    >
      {children}
    </div>
  );
};
