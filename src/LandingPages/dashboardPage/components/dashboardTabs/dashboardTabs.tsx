"use client";
import { UserDTO } from "@/app/actions/user/types";
import { ReactElement, useState } from "react";
import {
  DASHBOARD_TAB_INDEX,
  DashboardHeader,
  OVERVIEW_TAB_INDEX,
} from "../dashboardHeader/dashboardHeader";

export const DashboardTabs = ({
  children,
  userDetails,
}: {
  children: ReactElement[];
  userDetails: UserDTO | null;
}) => {
  const [activeTab, setActiveTab] = useState(
    userDetails?.settings?.isDashboardTabActive
      ? DASHBOARD_TAB_INDEX
      : OVERVIEW_TAB_INDEX
  );
  return (
    <>
      <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {children[activeTab]}
    </>
  );
};
