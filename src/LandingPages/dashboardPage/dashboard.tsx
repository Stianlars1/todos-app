import { getOnlyDashboards } from "@/app/actions/dashboards/fetch";
import { getUserPreferences } from "@/app/actions/preferences/fetch";
import {
  getAllTodosByDashboardName,
  getColumnsAndTasks,
  getOverdueTodosByDashboardName,
  getUpcomingDeadlinesTodosByDashboardName,
} from "@/app/actions/todos/fetch";
import { getUserSettings } from "@/app/actions/user/userApi";
import { ErrorMessage } from "@/components/ui/errorMessage/errorMessage";
import { ApiResponse } from "@/types/fetch";
import { ColumnsAndTasks } from "@/types/todo";
import { SoonDueTodosDTO, TodoDTO } from "@/types/types";
import { DashboardTabs } from "@/LandingPages/dashboardPage/components/dashboard/dashboardTabs/dashboardTabs";
import { ProgressSummaryContainer } from "@/LandingPages/dashboardPage/components/overview/progressSummary/progressSummary";
import styles from "./dashboard.module.scss";

import { TaskViews } from "@/LandingPages/dashboardPage/components/dashboard/taskViews/taskViews";

export const DashboardPage = async ({
  dashboardName,
}: {
  dashboardName: string;
}) => {
  const { data: userSettings, error, isError } = await getUserSettings();
  const { data: columnsAndTasksResponse, isError: isError2 } =
    await getColumnsAndTasks<ColumnsAndTasks>(dashboardName);
  const {
    data: allTasks,
    isError: isError3,
    error: error3,
  } = await getAllTodosByDashboardName<TodoDTO[]>(dashboardName);
  const { data: upcomingDeadlines } =
    await getUpcomingDeadlinesTodosByDashboardName<
      ApiResponse<SoonDueTodosDTO>
    >(dashboardName);
  const { data: overdueTasks } =
    await getOverdueTodosByDashboardName<ApiResponse<ApiResponse<TodoDTO[]>>>(
      dashboardName,
    );

  const { data: dashboards } = await getOnlyDashboards();
  const { data: userPreferences } = await getUserPreferences();

  return (
    <div className={`dashboard ${styles.dashboard}`}>
      <ErrorMessage closeButton isError={isError} errorMessage={error} />

      {columnsAndTasksResponse && userSettings && (
        <DashboardTabs
          userPreferences={userPreferences}
          dashboards={dashboards}
          userSettings={userSettings}
        >
          <>
            <TaskViews
              dashboardName={dashboardName}
              userSettings={userSettings}
            />
            <ErrorMessage isError={isError2} errorMessage={error} />
          </>
          <ProgressSummaryContainer
            upcomingDeadlines={upcomingDeadlines}
            error={error3}
            isError={isError3}
            tasks={allTasks}
            overdueTasks={overdueTasks}
            userSettings={userSettings}
          />
        </DashboardTabs>
      )}
    </div>
  );
};
