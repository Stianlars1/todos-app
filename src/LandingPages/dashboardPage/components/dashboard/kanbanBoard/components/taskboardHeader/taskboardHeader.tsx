import { GetUserPreferencesDTO } from "@/app/actions/preferences/types";
import { UserSettings } from "@/app/actions/user/types";
import { DashboardOnlyType } from "../../../dashboardSwitch/switchUtils";
import styles from "./taskboardHeader.module.css";
import { TaskboardSettings } from "../taskboardSettings/taskboardSettings";

export const TaskboardHeader = ({
  userSettings,
  dashboards,
  userPreferences,
}: {
  userSettings: UserSettings;
  dashboards: DashboardOnlyType[] | null;
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
