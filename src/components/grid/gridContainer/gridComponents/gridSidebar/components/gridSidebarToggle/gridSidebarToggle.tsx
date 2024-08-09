"use client";

import { updateUserSettings } from "@/app/actions/user/api";
import { UserDTO } from "@/app/actions/user/types";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { useEffect, useState } from "react";
import "./css/gridSidebarToggle.css";

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

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleKeydown = async (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "b") {
        console.log(event);
        await toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const toggleSidebar = async () => {
    console.log("toggleSidebar");
    const newSidebarOpen = !sidebarOpen;
    setSidebarOpen(newSidebarOpen);
    const updated = await updateUserSettings({ sidebarOpen: newSidebarOpen });
    console.log(updated);
    if (updated.success) {
      cacheInvalidate({ cacheKey: CacheKeys.USER_DETAILS });
    }
  };
  return (
    <div onClick={toggleSidebar} id="dragButton" className="sidebar-toggle">
      <div className="sidebar-toggle__firstLine sidebar-toggle__lines" />
      <div className="sidebar-toggle__secondLine sidebar-toggle__lines" />
    </div>
  );
};
