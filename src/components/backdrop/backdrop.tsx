"use client";
import { handleCloseNav } from "@/utils/utils";
import { useEffect } from "react";
import "./css/backdrop.css";

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
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <div className="backdrop" onClick={handleCloseNav} />;
};
