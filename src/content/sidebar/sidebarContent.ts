import {
  IconBacklog,
  IconDashboard,
  IconDone,
  IconInProgress,
  IconSettings,
  IconToday,
  IconTodo,
  LogoutIcon,
} from "@/components/ui/icons/icons";
import { ReactElement } from "react";

export interface sidebarContentListType {
  title: string;
  href: string;
  icon: ReactElement;
  render: boolean;
  renderMobileOnly?: boolean;
}

export const sidebarContentList: sidebarContentListType[] = [
  {
    title: "Overview",
    href: "/",
    icon: IconDashboard(),
    render: true,
  },
  {
    title: "Today",
    href: "/today",
    icon: IconToday(),
    render: true,
  },
  {
    title: "Backlog",
    href: "/backlog",
    icon: IconBacklog(),
    render: false,
  },
  {
    title: "Todo",
    href: "/todo",
    icon: IconTodo(),
    render: false,
  },
  {
    title: "In Progress",
    href: "/in-progress",
    icon: IconInProgress(),
    render: false,
  },
  {
    title: "Done",
    href: "/done",
    icon: IconDone(),
    render: false,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: IconSettings(),
    render: true,
  },
  {
    title: "Logout",
    href: "/logout",
    icon: LogoutIcon(),
    render: true,
    renderMobileOnly: true,
  },
];
