import { UserSettingsDTO } from "@/app/actions/user/types";
import styles from "../css/taskboardHeader.module.css";
import { FilterTasksWrapper } from "./FilterTasksWrapper/FilterTasksWrapper";
import { TaskboardSettings } from "./taskboardSettings";
export const TaskboardHeader = async ({
  taskboardHeaderTexts,
  userSettings,
}: {
  taskboardHeaderTexts: { title: string; sortSwitchTitle: string };
  userSettings: UserSettingsDTO | undefined;
}) => {
  return (
    <>
      <header className={styles.taskboardHeader}>
        <h1>{taskboardHeaderTexts.title}</h1>
        <TaskboardSettings
          sortSwitchTitle={taskboardHeaderTexts.sortSwitchTitle}
          userSettings={userSettings}
        />
      </header>
      <FilterTasksWrapper />
    </>
  );
};
