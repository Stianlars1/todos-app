"use client";
import { GetUserPreferencesDTO } from "@/app/actions/preferences/types";
import { UserSettings } from "@/app/actions/user/types";
import { ReactElement, useState } from "react";
import {
  DASHBOARD_TAB_INDEX,
  DashboardHeader,
  OVERVIEW_TAB_INDEX,
} from "../dashboardHeader/dashboardHeader";
import { DashboardOnlyType } from "../dashboardSwitch/switchUtils";
import { TaskboardHeader } from "@/LandingPages/dashboardPage/components/dashboard/kanbanBoard/components/taskboardHeader/taskboardHeader";

interface DashboardTabsProps {
  children: ReactElement | ReactElement[];
  userSettings: UserSettings;
  dashboards: DashboardOnlyType[] | null;
  userPreferences: GetUserPreferencesDTO | null;
}

export const DashboardTabs = ({
  children,
  userSettings,
  dashboards,
  userPreferences,
}: DashboardTabsProps) => {
  const [activeTab, setActiveTab] = useState(
    userSettings.isDashboardTabActive
      ? DASHBOARD_TAB_INDEX
      : OVERVIEW_TAB_INDEX,
  );

  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <>
      <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab}>
        <TaskboardHeader
          userPreferences={userPreferences}
          dashboards={dashboards || null}
          userSettings={userSettings}
        />
      </DashboardHeader>

      {childrenArray[activeTab] || null}
    </>
  );
};
