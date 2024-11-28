import {UserSettingsDTO} from "@/app/actions/user/types";
import {ErrorMessage} from "@/components/ui/errorMessage/errorMessage";
import {ColumnsAndTasks} from "@/types/todo/types";
import styles from "./css/taskboard.module.css";
import {GetCategorizedTodosTexts} from "./utils";
import {TaskboardWrapper} from "./wrappers/taskboardWrapper";

export const Taskboard = async ({
  userSettings,
  categorizedTexts,
  taskResponse,
  isError,
  error,
}: {
  userSettings: UserSettingsDTO | null;
  categorizedTexts: GetCategorizedTodosTexts;
  taskResponse: ColumnsAndTasks | null;
  isError: boolean;
  error: string;
}) => {
  if (isError && error) {
    return <ErrorMessage isError={isError} errorMessage={error} />;
  }

  return (
    <div id="taskboard" className={`${styles.taskboard} taskboard`}>
      {taskResponse?.columns && taskResponse?.tasks && (
        <TaskboardWrapper
          userSettings={userSettings}
          columns={taskResponse.columns.map((column) => column.statusCode)}
          tasks={taskResponse.tasks}
          categorizedTexts={categorizedTexts}
        />
      )}
    </div>
  );
};
