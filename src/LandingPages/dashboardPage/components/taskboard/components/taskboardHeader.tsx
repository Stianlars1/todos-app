import { GetUserPreferencesDTO } from "@/app/actions/preferences/types";
import { UserSettingsDTO } from "@/app/actions/user/types";
import { DashboardType } from "../../dashboardSwitch/switchUtils";
import styles from "../css/taskboardHeader.module.css";
import { TaskboardSettings } from "./taskboardSettings";
export const TaskboardHeader = ({
  userSettings,
  dashboards,
  userPreferences,
}: {
  userSettings: UserSettingsDTO | null;
  dashboards: DashboardType[] | null;
  userPreferences: GetUserPreferencesDTO | null;
}) => {
  return (
    <header className={styles.taskboardHeader}>
      <TaskboardSettings
        userPreferences={userPreferences}
        dashboards={dashboards}
        userSettings={userSettings}
      />
    </header>
  );
};
