import { getCategorizedTodos } from "@/app/actions/todos/fetch";
import { UserSettingsDTO } from "@/app/actions/user/types";
import { ErrorMessage } from "@/components/ui/errorMessage/errorMessage";
import {
  CategorizedTodosDTO,
  CategorizedTodosResponseDTO,
  DUE_SOON_KEY,
  StatusCodes,
} from "@/types/todo/types";
import { TaskboardHeader } from "./components/taskboardHeader";
import { getCategorizedTodosTexts, getTaskboardTexts } from "./utils";
import { TaskboardWrapper } from "./wrappers/taskboardWrapper";

export const Taskboard = async ({
  userSettings,
}: {
  userSettings: UserSettingsDTO | undefined;
}) => {
  const categorizedTexts = await getCategorizedTodosTexts();
  const taskboardTexts = await getTaskboardTexts();
  const {
    data: taskResponse,
    isError,
    error,
  } = await getCategorizedTodos<CategorizedTodosResponseDTO>();

  const categorizedTodosFiltered = Object.entries(
    taskResponse?.data || {}
  ).reduce<CategorizedTodosDTO>((acc, [key, value]) => {
    if (key !== DUE_SOON_KEY) {
      acc[key as StatusCodes] = value;
    }
    return acc;
  }, {} as CategorizedTodosDTO);

  const soonDueTasks = taskResponse?.data?.[DUE_SOON_KEY];

  if (isError && error) {
    return <ErrorMessage isError={isError} errorMessage={error} />;
  }
  return (
    <>
      <div>
        <h3>Soon due</h3>
        <ul>
          {soonDueTasks?.map((task) => {
            // Get how many days left
            const date = new Date(task.dueDate!);
            const daysUntil = Math.floor(
              (date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
            );
            return (
              <>
                <h4>
                  {daysUntil === 1
                    ? "Due tomorrow"
                    : `Due in ${daysUntil} days`}
                </h4>
                <div key={task.todoId}>{task.title}</div>
              </>
            );
          })}
        </ul>
      </div>
      <TaskboardHeader
        taskboardHeaderTexts={taskboardTexts.header}
        userSettings={userSettings}
      />

      {taskResponse?.data && (
        <TaskboardWrapper
          userSettings={userSettings}
          tasks={categorizedTodosFiltered}
          categorizedTexts={categorizedTexts}
          taskboardTexts={taskboardTexts}
        />
      )}
    </>
  );
};
