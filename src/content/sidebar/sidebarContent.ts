import {
  IconBacklog,
  IconDashboard,
  IconDone,
  IconInProgress,
  IconSettings,
  IconTodo,
  LogoutIcon,
} from "@/components/ui/icons/icons";
import { ReactElement } from "react";

export interface sidebarContentListType {
  title: string;
  href: string;
  icon: ReactElement;
  renderMobileOnly?: boolean;
}

export const sidebarContentList: sidebarContentListType[] = [
  {
    title: "Overview",
    href: "/",
    icon: IconDashboard(),
  },
  {
    title: "Backlog",
    href: "/backlog",
    icon: IconBacklog(),
  },
  {
    title: "Todo",
    href: "/todo",
    icon: IconTodo(),
  },
  {
    title: "In Progress",
    href: "/in-progress",
    icon: IconInProgress(),
  },
  {
    title: "Done",
    href: "/done",
    icon: IconDone(),
  },
  {
    title: "Settings",
    href: "/settings",
    icon: IconSettings(),
  },
  {
    title: "Logout",
    href: "/logout",
    icon: LogoutIcon(),
    renderMobileOnly: true,
  },
];
