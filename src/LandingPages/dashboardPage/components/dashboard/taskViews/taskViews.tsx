import { UserSettings } from "@/app/actions/user/types";
import { KanbanBoard } from "@/LandingPages/dashboardPage/components/dashboard/kanbanBoard/kanbanBoard";
import {
  getCategorizedTodosByDashboardName,
  getColumnsAndTasks,
} from "@/app/actions/todos/fetch";
import { ColumnsAndTasks } from "@/types/todo/types";
import { CategorizedTodosDTO } from "@/types/types";
import { ErrorMessage } from "@/components/ui/errorMessage/errorMessage";
import { TableBoard } from "@/LandingPages/dashboardPage/components/dashboard/tableBoard/tableBoard";

interface TaskViewsProps {
  dashboardName: string;
  userSettings: UserSettings;
}
export const TaskViews = async ({
  dashboardName,
  userSettings,
}: TaskViewsProps) => {
  const { isColumnLayout } = userSettings;

  if (isColumnLayout) {
    const { data, isError, error } =
      await getColumnsAndTasks<ColumnsAndTasks>(dashboardName);
    if (isError) return <ErrorMessage isError={isError} errorMessage={error} />;
    return data ? (
      <KanbanBoard columnsAndTasks={data} userSettings={userSettings} />
    ) : null;
  }

  const {
    data: response,
    isError,
    error,
  } = await getCategorizedTodosByDashboardName<CategorizedTodosDTO>(
    dashboardName,
  );
  if (isError) return <ErrorMessage isError={isError} errorMessage={error} />;
  return response?.success ? (
    <TableBoard userSettings={userSettings} categorizedTodos={response?.data} />
  ) : null;
};
