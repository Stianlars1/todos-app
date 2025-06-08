import { SUB_URL } from "@/utils/constants";
import { Link } from "@/i18/navigation";
import { TaskBuddyLogo } from "../grid/gridContainer/gridComponents/gridNavbar/assets/taskBuddyLogoSvg";
import "./navbarLogo.css";
import { inter } from "@/fonts";

export const TaskBuddyNavbarLogo = () => {
  return (
    <Link href={SUB_URL} className="navbar-logo-link">
      <TaskBuddyLogo />
      <span className={`${inter.className}`}>TaskBuddy</span>
    </Link>
  );
};
