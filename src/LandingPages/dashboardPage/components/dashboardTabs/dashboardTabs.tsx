"use client";
import { GetUserPreferencesDTO } from "@/app/actions/preferences/types";
import { UserSettingsDTO } from "@/app/actions/user/types";
import { ReactElement, useState } from "react";
import {
  DASHBOARD_TAB_INDEX,
  DashboardHeader,
  OVERVIEW_TAB_INDEX,
} from "../dashboardHeader/dashboardHeader";
import { DashboardType } from "../dashboardSwitch/switchUtils";
import { TaskboardHeader } from "../taskboard/components/taskboardHeader";

interface DashboardTabsProps {
  children: ReactElement | ReactElement[];
  userSettings: UserSettingsDTO | null;
  dashboards: DashboardType[] | null;
  userPreferences: GetUserPreferencesDTO | null;
}

export const DashboardTabs = ({
  children,
  userSettings,
  dashboards,
  userPreferences,
}: DashboardTabsProps) => {
  const [activeTab, setActiveTab] = useState(
    userSettings?.isDashboardTabActive
      ? DASHBOARD_TAB_INDEX
      : OVERVIEW_TAB_INDEX
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
