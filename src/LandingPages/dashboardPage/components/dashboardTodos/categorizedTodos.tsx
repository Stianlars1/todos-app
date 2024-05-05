import { getCategorizedTodos } from "@/app/actions/todos/fetch";
import { getUserSettings } from "@/app/actions/user/userApi";
import { ErrorMessage } from "@/components/ui/errorMessage/errorMessage";
import { CategorizedTodosDTO, TodoDTO } from "@/types/types";
import { CategorizedTodosFiltered } from "../../types";
import { TasksBoard } from "../tasksBoard/tasksBoard";
import "./css/categorizedTodos.css";

export const CategorizedTodos = async () => {
  const {
    data: CategorizedTodos,
    isError,
    error,
  } = await getCategorizedTodos<CategorizedTodosDTO>();
  const userSettings = await getUserSettings();

  const landingPageFilteredTasks = getDashboardTasks(CategorizedTodos);
  return (
    <>
      <ErrorMessage isError={isError} errorMessage={error} />
      <TasksBoard
        tasks={landingPageFilteredTasks}
        userSettings={userSettings.data}
      />
    </>
  );
};

const getDashboardTasks = (
  categorizedTodos: CategorizedTodosDTO | null
): CategorizedTodosFiltered | null => {
  const dashboardStatuses = ["backlog", "inProgressTasks", "completedTasks"];

  const filtered = categorizedTodos?.data
    ? Object.entries(categorizedTodos.data).reduce<CategorizedTodosFiltered>(
        (acc, [categoryString, value]) => {
          if (dashboardStatuses.includes(categoryString)) {
            acc[categoryString as keyof CategorizedTodosFiltered] =
              value as TodoDTO[];
          }
          return acc;
        },
        {}
      )
    : dashboardStatuses.reduce((acc, curr) => {
        return { ...acc, [curr]: null };
      }, {});

  return filtered;
};
