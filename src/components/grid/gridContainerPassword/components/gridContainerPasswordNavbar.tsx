import { TaskBuddyNavbarLogo } from "@/components/navbarLogo/navbarLogo";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
export const GridContainerPasswordNavbar = async () => {
  return (
    <nav className="grid-container-password__navbar">
      <TaskBuddyNavbarLogo />
    </nav>
  );
};
