import { getDashboards } from "@/app/actions/dashboards/fetch";
import { getUserPreferences } from "@/app/actions/preferences/fetch";
import {
  getAllTodosByActiveDashboard,
  getCategorizedTodos,
  getOverdueTodos,
  getUpcomingDeadlinesTodos,
} from "@/app/actions/todos/fetch";
import { getUserSettings } from "@/app/actions/user/userApi";
import { ErrorMessage } from "@/components/ui/errorMessage/errorMessage";
import { SuspenseFallback } from "@/components/ui/suspenseFallback/suspenseFallback";
import { ToastContainer } from "@/components/ui/toast/toast";
import { ApiResponse } from "@/types/fetch";
import { CategorizedTodosResponseDTO } from "@/types/todo/types";
import { SoonDueTodosDTO, TodoDTO } from "@/types/types";
import { Suspense } from "react";
import { DashboardTabs } from "./components/dashboardTabs/dashboardTabs";
import { ProgressSummaryContainer } from "./components/progressSummary/progressSummary";
import { Taskboard } from "./components/taskboard/taskboard";
import { getCategorizedTodosTexts } from "./components/taskboard/utils";
import styles from "./css/dashboard.module.css";
export const DashboardPage = async () => {
  const { data: userSettings, error, isError } = await getUserSettings();
  const categorizedTexts = await getCategorizedTodosTexts();
  const {
    data: taskResponse,
    isError: isError2,
    error: error2,
  } = await getCategorizedTodos<CategorizedTodosResponseDTO>();
  const {
    data: allTasks,
    isError: isError3,
    error: error3,
  } = await getAllTodosByActiveDashboard<TodoDTO[]>();
  const { data: upcomingDeadlines } = await getUpcomingDeadlinesTodos<
    ApiResponse<SoonDueTodosDTO>
  >();
  const { data: overdueTasks } = await getOverdueTodos<
    ApiResponse<ApiResponse<TodoDTO[]>>
  >();

  const { data: dashboards } = await getDashboards();
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

      <ToastContainer />
    </Suspense>
  );
};
