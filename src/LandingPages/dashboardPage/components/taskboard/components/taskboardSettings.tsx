import { UserSettingsDTO } from "@/app/actions/user/types";
import { CreateTodoButton } from "@/components/createTodo/components/createTodoButton/createTodoButton";
import { CreateTaskTextsProps } from "@/components/createTodo/createTask";
import styles from "../css/taskboardSettings.module.css";
import { getCreateTodosTexts } from "../utils";
import { TaskboardSettingsContextButton } from "./settingsContextButton/taskboardSettingsContextButton";
export const TaskboardSettings = async ({
  userSettings,
  sortSwitchTitle,
}: {
  userSettings: UserSettingsDTO | undefined;
  sortSwitchTitle: string;
}) => {
  const createTaskTexts: CreateTaskTextsProps = await getCreateTodosTexts();
  return (
    <div className={styles.taskboardSettingsWrapper}>
      <CreateTodoButton createTaskTexts={createTaskTexts} />

      <TaskboardSettingsContextButton userSettings={userSettings} />
      {/* <TaskboardSortManualSwitchButton
        sortSwitchTitle={sortSwitchTitle}
        userSettings={userSettings}
      /> */}
    </div>
  );
};
