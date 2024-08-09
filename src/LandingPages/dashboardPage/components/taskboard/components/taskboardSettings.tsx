import { GetUserPreferencesDTO } from "@/app/actions/preferences/types";
import { UserSettingsDTO } from "@/app/actions/user/types";
import { CreateTodoButton } from "@/components/createTodo/components/createTodoButton/createTodoButton";
import { DashboardType } from "../../dashboardSwitch/switchUtils";
import styles from "../css/taskboardSettings.module.css";
import { FilterTasksWrapper } from "./FilterTasksWrapper/FilterTasksWrapper";
import { TaskboardSettingsContextButton } from "./settingsContextButton/taskboardSettingsContextButton";
export const TaskboardSettings = ({
  userSettings,
  dashboards,
  userPreferences,
}: {
  userSettings: UserSettingsDTO | null;
  dashboards: DashboardType[] | null;
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
