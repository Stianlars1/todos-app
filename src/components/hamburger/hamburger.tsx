"use client";
import { iconSize } from "@/utils/constants";
import { Button } from "@stianlarsen/react-ui-kit";
import { useEffect } from "react";
import "./css/hamburger.css";
export const HamburgerMenu = ({ className = " " }: { className?: string }) => {
  const handleMenuClick = () => {
    const isOpen =
      document.body.getAttribute("data-nav-open") === "true" || false;
    document.body.setAttribute("data-nav-open", String(!isOpen));

    if (!isOpen) {
      document.body.style.setProperty("--sidebar-width", "15rem");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const isOpen =
        document.body.getAttribute("data-nav-open") === "true" || false;
      if (window.innerWidth >= 768 && isOpen) {
        document.body.setAttribute("data-nav-open", String(false));
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Button className={className} variant="icon" onClick={handleMenuClick}>
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        height={iconSize}
        width={iconSize}
        xmlns="http://www.w3.org/2000/svg"
        className="hamburger-menu"
      >
        <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"></path>
      </svg>
    </Button>
  );
};
