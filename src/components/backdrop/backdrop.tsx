"use client";
import { handleCloseNav } from "@/utils/utils";
import { useEffect } from "react";
import "./css/backdrop.scss";

export const Backdrop = () => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCloseNav();
    }
  };
  useEffect(() => {
    // Set the data-nav-open attribute to false on initial load
    document.body.setAttribute("data-nav-open", "false");

    // close nav on ESC key click
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <div className="backdrop" onClick={handleCloseNav} />;
};
