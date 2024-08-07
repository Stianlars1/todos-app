import { UserSettingsDTO } from "@/app/actions/user/types";
import { ErrorMessage } from "@/components/ui/errorMessage/errorMessage";
import {
  CategorizedTodosDTO,
  CategorizedTodosResponseDTO,
  DUE_SOON_KEY,
  StatusCodes,
} from "@/types/todo/types";
import { TaskboardHeader } from "./components/taskboardHeader";
import styles from "./css/taskboard.module.css";
import { GetCategorizedTodosTexts, GetTaskboardTexts } from "./utils";
import { TaskboardWrapper } from "./wrappers/taskboardWrapper";

export const Taskboard = ({
  userSettings,
  categorizedTexts,
  taskboardTexts,
  taskResponse,
  isError,
  error,
}: {
  userSettings: UserSettingsDTO | undefined;
  categorizedTexts: GetCategorizedTodosTexts;
  taskboardTexts: GetTaskboardTexts;
  taskResponse: CategorizedTodosResponseDTO | null;
  isError: boolean;
  error: string;
}) => {
  const categorizedTodosFiltered = Object.entries(
    taskResponse?.data || {}
  ).reduce<CategorizedTodosDTO>((acc, [key, value]) => {
    if (key !== DUE_SOON_KEY) {
      acc[key as StatusCodes] = value;
    }
    return acc;
  }, {} as CategorizedTodosDTO);

  if (isError && error) {
    return <ErrorMessage isError={isError} errorMessage={error} />;
  }

  return (
    <div id="taskboard" className={`${styles.taskboard} taskboard`}>
      <TaskboardHeader
        taskboardHeaderTexts={taskboardTexts.header}
        userSettings={userSettings}
      />

      {taskResponse?.data && (
        <TaskboardWrapper
          userSettings={userSettings}
          tasks={categorizedTodosFiltered}
          categorizedTexts={categorizedTexts}
        />
      )}
    </div>
  );
};
