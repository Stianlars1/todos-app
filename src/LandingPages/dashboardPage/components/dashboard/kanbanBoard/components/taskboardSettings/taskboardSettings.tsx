import { GetUserPreferencesDTO } from "@/app/actions/preferences/types";
import { UserSettings } from "@/app/actions/user/types";
import { CreateTodoButton } from "@/components/createTodo/components/createTodoButton/createTodoButton";
import { DashboardOnlyType } from "../../../dashboardSwitch/switchUtils";
import styles from "./taskboardSettings.module.css";
import { FilterTasksWrapper } from "../FilterTasksWrapper/FilterTasksWrapper";
import { TaskboardSettingsContextButton } from "../settingsContextButton/taskboardSettingsContextButton";

export const TaskboardSettings = ({
  userSettings,
  dashboards,
  userPreferences,
}: {
  userSettings: UserSettings;
  dashboards: DashboardOnlyType[] | null;
  userPreferences: GetUserPreferencesDTO | null;
}) => {
  return (
    <div className={styles.taskboardSettingsWrapper}>
      <CreateTodoButton dashboards={dashboards} userSettings={userSettings} />
      <FilterTasksWrapper userPreferences={userPreferences} />

      <TaskboardSettingsContextButton userSettings={userSettings} />
    </div>
  );
};
