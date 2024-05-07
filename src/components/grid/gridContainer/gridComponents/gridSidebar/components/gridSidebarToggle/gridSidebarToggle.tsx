"use client";

import { updateUserSettings } from "@/app/actions/user/api";
import { useEffect, useState } from "react";
import "./css/gridSidebarToggle.css";
import { UserDTO } from "@/app/actions/user/types";

export const GridSidebarToggle = ({
  userDetails,
}: {
  userDetails: UserDTO | null;
}) => {
  const userSettings = Boolean(userDetails?.settings?.sidebarOpen);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(userSettings);

  // Effect to synchronize sidebarOpen state with userDetails.settings.sidebarOpen
  useEffect(() => {
    if (
      userDetails &&
      userDetails.settings &&
      userDetails.settings.sidebarOpen
    ) {
      setSidebarOpen(userDetails.settings.sidebarOpen);
    }
  }, [userSettings]); // Depend on userDetails

  useEffect(() => {
    const GridContainerId = "grid-container";
    document
      ?.getElementById(GridContainerId)
      ?.setAttribute("data-sidebar-open", String(sidebarOpen));
  }, [sidebarOpen]);

  const toggleSidebar = async () => {
    const newSidebarOpen = !sidebarOpen;
    setSidebarOpen(newSidebarOpen);
    await updateUserSettings({ sidebarOpen: newSidebarOpen });
  };
  return (
    <div onClick={toggleSidebar} id="dragButton" className="sidebar-toggle">
      <div className="sidebar-toggle__firstLine sidebar-toggle__lines" />
      <div className="sidebar-toggle__secondLine sidebar-toggle__lines" />
    </div>
  );
};
