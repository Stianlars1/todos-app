"use client";
import { updateUserSettings } from "@/app/actions/user/api";
import { UserSettings } from "@/app/actions/user/types";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { useEffect, useState } from "react";
import "./css/gridSidebarToggle.css";

export const GridSidebarToggle = ({
  userDetails,
}: {
  userDetails: UserSettings | null;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(
    userDetails?.sidebarOpen || false,
  );

  // Effect to synchronize sidebarOpen state with userDetails.settings.sidebarOpen
  useEffect(() => {
    if (userDetails && userDetails.sidebarOpen !== undefined) {
      setSidebarOpen(userDetails.sidebarOpen);
    }
  }, [userDetails]);

  // Effect to update the data attribute on the grid container
  useEffect(() => {
    const GridContainerId = "grid-container";
    const gridContainer = document.getElementById(GridContainerId);
    if (gridContainer) {
      gridContainer.setAttribute("data-sidebar-open", String(sidebarOpen));
    }
  }, [sidebarOpen]);

  // Effect to add the keydown event listener for CMD + B or CTRL + B
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleKeydown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "b") {
        event.preventDefault(); // Prevent default browser action (usually bold text)
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [sidebarOpen]);

  const toggleSidebar = async () => {
    const newSidebarOpen = !sidebarOpen;
    setSidebarOpen(newSidebarOpen);

    const updated = await updateUserSettings({ sidebarOpen: newSidebarOpen });
    if (updated.success) {
      cacheInvalidate({ cacheKey: CacheKeys.USER_SETTINGS });
    }
  };

  return (
    <div onClick={toggleSidebar} id="dragButton" className="sidebar-toggle">
      <div className="sidebar-toggle__firstLine sidebar-toggle__lines" />
      <div className="sidebar-toggle__secondLine sidebar-toggle__lines" />
    </div>
  );
};
