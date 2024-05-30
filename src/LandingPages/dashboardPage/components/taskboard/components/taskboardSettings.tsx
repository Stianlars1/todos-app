import { UserSettingsDTO } from "@/app/actions/user/types";
import { CreateTodoButton } from "@/components/createTodo/components/createTodoButton/createTodoButton";
import styles from "../css/taskboardSettings.module.css";
import { FilterTasksWrapper } from "./FilterTasksWrapper/FilterTasksWrapper";
import { TaskboardSettingsContextButton } from "./settingsContextButton/taskboardSettingsContextButton";
export const TaskboardSettings = async ({
  userSettings,
  sortSwitchTitle,
}: {
  userSettings: UserSettingsDTO | undefined;
  sortSwitchTitle: string;
}) => {
  return (
    <div className={styles.taskboardSettingsWrapper}>
      <CreateTodoButton />
      <FilterTasksWrapper />

      <TaskboardSettingsContextButton userSettings={userSettings} />
      {/* <TaskboardSortManualSwitchButton
        sortSwitchTitle={sortSwitchTitle}
        userSettings={userSettings}
      /> */}
    </div>
  );
};
