import {
  getAllTodos,
  getCategorizedTodos,
  getOverdueTodos,
  getUpcomingDeadlinesTodos,
} from "@/app/actions/todos/fetch";
import { getUserDetails } from "@/app/actions/user/userApi";
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
import {
  getCategorizedTodosTexts,
  getTaskboardTexts,
} from "./components/taskboard/utils";

export const DashboardPage = async () => {
  const { data: userDetails, error, isError } = await getUserDetails();
  const categorizedTexts = await getCategorizedTodosTexts();
  const taskboardTexts = await getTaskboardTexts();
  const {
    data: taskResponse,
    isError: isError2,
    error: error2,
  } = await getCategorizedTodos<CategorizedTodosResponseDTO>();
  const {
    data: allTasks,
    isError: isError3,
    error: error3,
  } = await getAllTodos<TodoDTO[]>();
  const { data: upcomingDeadlines } = await getUpcomingDeadlinesTodos<
    ApiResponse<SoonDueTodosDTO>
  >();
  const { data: overdueTasks } = await getOverdueTodos<
    ApiResponse<ApiResponse<TodoDTO[]>>
  >();
  return (
    <Suspense fallback={<SuspenseFallback fixed={false} />}>
      <div className="dashboard">
        <ErrorMessage isError={isError} errorMessage={error} />

        <DashboardTabs userDetails={userDetails}>
          <Taskboard
            isError={isError2}
            error={error2}
            taskResponse={taskResponse}
            categorizedTexts={categorizedTexts}
            taskboardTexts={taskboardTexts}
            userSettings={userDetails?.settings}
          />
          <ProgressSummaryContainer
            upcomingDeadlines={upcomingDeadlines}
            error={error3}
            isError={isError3}
            tasks={allTasks}
            overdueTasks={overdueTasks}
          />
        </DashboardTabs>
      </div>

      <ToastContainer />
    </Suspense>
  );
};
