import { SUB_URL } from "@/utils/constants";
import { Inter } from "next/font/google";
import Link from "next/link";
import { TaskBuddyLogo } from "../grid/gridContainer/gridComponents/gridNavbar/assets/taskBuddyLogoSvg";
import "./navbarLogo.css";
const inter = Inter({ subsets: ["latin"] });
export const TaskBuddyNavbarLogo = () => {
  return (
    <Link href={SUB_URL} className="navbar-logo-link">
      <TaskBuddyLogo />
      <span className={`${inter.className}`}>TaskBuddy</span>
    </Link>
  );
};
