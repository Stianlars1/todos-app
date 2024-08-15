import { getCategorizedTodos } from "@/app/actions/todos/fetch";
import { getUserSettings } from "@/app/actions/user/userApi";
import { ErrorMessage } from "@/components/ui/errorMessage/errorMessage";
import { CategorizedTodosDTO, TodoDTO } from "@/types/types";
import { getTranslations } from "next-intl/server";
import { CategorizedTodosFiltered } from "../../types";
import { TasksBoard } from "../taskboard_old/tasksBoard_old/tasksBoard";
import "./css/categorizedTodos.css";

export const CategorizedTodos = async () => {
  const {
    data: CategorizedTodos,
    isError,
    error,
  } = await getCategorizedTodos<CategorizedTodosDTO>();
  const userSettings = await getUserSettings();

  const headerColumnsTexts = await getCategorizedTodosTexts();

  const landingPageFilteredTasks = getDashboardTasks(CategorizedTodos);
  return (
    <>
      <ErrorMessage isError={isError} errorMessage={error} />
      <TasksBoard
        tasks={landingPageFilteredTasks}
        userSettings={userSettings.data}
        columnHeadersTexts={headerColumnsTexts}
      />
    </>
  );
};

const getDashboardTasks = (
  categorizedTodos: CategorizedTodosDTO | null,
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
        {},
      )
    : dashboardStatuses.reduce((acc, curr) => {
        return { ...acc, [curr]: null };
      }, {});

  return filtered;
};

const getCategorizedTodosTexts = async () => {
  const text = await getTranslations("Categorized Todos");
  const headerColumnsTexts = {
    backlog: text("backlog"),
    inProgressTasks: text("inProgressTasks"),
    completedTasks: text("completedTasks"),
  };
  return headerColumnsTexts;
};
