"use client";

import { updateUserSettings } from "@/app/actions/user/api";
import { UserSettingsDTO } from "@/app/actions/user/types";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { useEffect, useState } from "react";
import "./css/gridSidebarToggle.css";

export const GridSidebarToggle = ({
  userDetails,
}: {
  userDetails: UserSettingsDTO | null;
}) => {
  const userSettings = Boolean(userDetails);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(userSettings);
  console.log("userDetails ", userDetails);
  // Effect to synchronize sidebarOpen state with userDetails.settings.sidebarOpen
  useEffect(() => {
    if (userDetails && userDetails.sidebarOpen !== undefined) {
      setSidebarOpen(userDetails.sidebarOpen);
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
