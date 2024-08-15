import { UserSettingsDTO } from "@/app/actions/user/types";
import { ErrorMessage } from "@/components/ui/errorMessage/errorMessage";
import {
  CategorizedTodosDTO,
  CategorizedTodosResponseDTO,
  DUE_SOON_KEY,
  StatusCodes,
} from "@/types/todo/types";
import styles from "./css/taskboard.module.css";
import { GetCategorizedTodosTexts } from "./utils";
import { TaskboardWrapper } from "./wrappers/taskboardWrapper";

export const Taskboard = async ({
  userSettings,
  categorizedTexts,
  taskResponse,
  isError,
  error,
}: {
  userSettings: UserSettingsDTO | null;
  categorizedTexts: GetCategorizedTodosTexts;
  taskResponse: CategorizedTodosResponseDTO | null;
  isError: boolean;
  error: string;
}) => {
  const categorizedTodosFiltered = Object.entries(
    taskResponse?.data || {},
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
