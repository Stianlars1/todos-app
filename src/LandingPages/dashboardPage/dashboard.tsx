import { getOnlyDashboards } from "@/app/actions/dashboards/fetch";
import { getUserPreferences } from "@/app/actions/preferences/fetch";
import {
  getAllTodosByDashboardName,
  getCategorizedTodosByDashboardName,
  getOverdueTodosByDashboardName,
  getUpcomingDeadlinesTodosByDashboardName,
} from "@/app/actions/todos/fetch";
import { getUserSettings } from "@/app/actions/user/userApi";
import { ErrorMessage } from "@/components/ui/errorMessage/errorMessage";
import { SuspenseFallback } from "@/components/ui/suspenseFallback/suspenseFallback";
import { ApiResponse } from "@/types/fetch";
import { CategorizedTodosResponseDTO } from "@/types/todo/types";
import { SoonDueTodosDTO, TodoDTO } from "@/types/types";
import { Suspense } from "react";
import { DashboardTabs } from "./components/dashboardTabs/dashboardTabs";
import { ProgressSummaryContainer } from "./components/progressSummary/progressSummary";
import { Taskboard } from "./components/taskboard/taskboard";
import { getCategorizedTodosTexts } from "./components/taskboard/utils";
import styles from "./css/dashboard.module.css";
export const DashboardPage = async ({
  dashboardName,
}: {
  dashboardName: string;
}) => {
  const { data: userSettings, error, isError } = await getUserSettings();
  const categorizedTexts = await getCategorizedTodosTexts();
  const {
    data: taskResponse,
    isError: isError2,
    error: error2,
  } = await getCategorizedTodosByDashboardName<CategorizedTodosResponseDTO>(
    dashboardName,
  );
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
    <Suspense fallback={<SuspenseFallback fixed={false} />}>
      <div className={`dashboard ${styles.dashboard}`}>
        <ErrorMessage closeButton isError={isError} errorMessage={error} />

        <DashboardTabs
          userPreferences={userPreferences}
          dashboards={dashboards}
          userSettings={userSettings}
        >
          <Taskboard
            isError={isError2}
            error={error2}
            taskResponse={taskResponse}
            categorizedTexts={categorizedTexts}
            userSettings={userSettings}
          />
          <ProgressSummaryContainer
            upcomingDeadlines={upcomingDeadlines}
            error={error3}
            isError={isError3}
            tasks={allTasks}
            overdueTasks={overdueTasks}
            userSettings={userSettings}
          />
        </DashboardTabs>
      </div>
    </Suspense>
  );
};
