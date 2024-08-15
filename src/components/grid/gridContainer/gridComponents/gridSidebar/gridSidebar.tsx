import { SidebarContentList } from "./components/sidebarContentList/sidebarContentList";

import { getUserSettings } from "@/app/actions/user/userApi";
import { Backdrop } from "@/components/backdrop/backdrop";
import { GridSidebarToggle } from "./components/gridSidebarToggle/gridSidebarToggle";
import "./css/gridSidebar.css";

export const GridSidebar = async () => {
  // const userDetails = await getUserDetails();
  const userSettings = await getUserSettings();

  // "--sidebar-width",
  // userDetails?.settings?.sidebarOpen ? "15rem" : "calc(24px + 3.5rem)"

  return (
    <aside className={`grid-container__sidebar sidebar`}>
      <SidebarContentList />

      {/* <GridSidebarFooter userDetails={userDetails.data} /> */}

      <GridSidebarToggle userDetails={userSettings.data} />
      <Backdrop />
    </aside>
  );
};
