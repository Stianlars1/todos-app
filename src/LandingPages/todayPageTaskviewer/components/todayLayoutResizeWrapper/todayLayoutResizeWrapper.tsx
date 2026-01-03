"use client";
import { useEffect } from "react";

export const TodayLayoutResizeWrapper = ({
  sidebarOpen,
}: {
  sidebarOpen?: boolean;
}) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const width = window.innerWidth;
        if (width <= 1200) {
          const gridContainer = document.getElementById("grid-container");
          if (gridContainer) {
            gridContainer.setAttribute("data-sidebar-open", String(false));
          }
        } else {
          const gridContainer = document.getElementById("grid-container");
          if (gridContainer) {
            gridContainer.setAttribute(
              "data-sidebar-open",
              String(sidebarOpen || true),
            );
          }
        }
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", () => {});
      };
    }
  }, []);
  return null;
};
