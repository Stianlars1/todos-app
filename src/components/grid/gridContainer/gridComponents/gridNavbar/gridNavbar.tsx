import { HamburgerMenu } from "@/components/hamburger/hamburger";
import { DOMAIN_NAME, SUB_URL } from "@/utils/constants";
import Link from "next/link";
import { TaskBuddyLogo } from "./assets/taskBuddyLogoSvg";
import "./css/gridNavbar.css";
export const GridNavbar = () => {
  return (
    <div className="grid-container__navbar grid-navbar">
      <Link href={SUB_URL} className="grid-navbar__logo">
        <TaskBuddyLogo />
        <span className="grid-navbar__logo__logo-text">{DOMAIN_NAME}</span>
      </Link>
      <HamburgerMenu />
    </div>
  );
};
