import { TaskBuddyNavbarLogo } from "@/components/navbarLogo/navbarLogo";
import { Inter } from "next/font/google";
import "./css/login-or-signup-navbar.css";

const inter = Inter({ subsets: ["latin"] });

export const GridContainerLoginOrSignupNavbar = () => {
  return (
    <nav className="login-or-signup-navbar">
      <TaskBuddyNavbarLogo />
    </nav>
  );
};
