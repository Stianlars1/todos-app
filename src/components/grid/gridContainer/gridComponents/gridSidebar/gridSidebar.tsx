import { SidebarContentList } from "./components/sidebarContentList/sidebarContentList";

import { getUserDetails } from "@/app/actions/user/userApi";
import { Backdrop } from "@/components/backdrop/backdrop";
import { GridSidebarToggle } from "./components/gridSidebarToggle/gridSidebarToggle";
import "./css/gridSidebar.css";

export const GridSidebar = async () => {
  const userDetails = await getUserDetails();

  // "--sidebar-width",
  // userDetails?.settings?.sidebarOpen ? "15rem" : "calc(24px + 3.5rem)"

  return (
    <aside className={`grid-container__sidebar sidebar`}>
      <div className="sidebar__header">
        <span>
          <br />
        </span>
      </div>
      <SidebarContentList />

      {/* <GridSidebarFooter userDetails={userDetails.data} /> */}

      <GridSidebarToggle
        key={JSON.stringify(userDetails.data?.settings)}
        userDetails={userDetails.data}
      />
      <Backdrop />
    </aside>
  );
};
