import { TaskBuddyLogo } from "../grid/gridContainer/gridComponents/gridNavbar/assets/taskBuddyLogoSvg";
import "./navbarLogo.css";
import { inter } from "@/fonts";
import { ROUTE_ROOT } from "@/utils/urls";
import Link from "next/link";

export const TaskBuddyNavbarLogo = () => {
  return (
    <Link href={ROUTE_ROOT} className="navbar-logo-link">
      <TaskBuddyLogo />
      <span className={`${inter.className}`}>TaskBuddy</span>
    </Link>
  );
};
