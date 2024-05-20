import { getTodosDueToday } from "@/app/actions/todos/fetch";
import { getUserSettings } from "@/app/actions/user/userApi";
import { ApiResponse } from "@/types/fetch";
import { TodoDTO } from "@/types/types";
import { TodayLayout } from "./layout/todayLayout";

export const TodayPage = async () => {
  const {
    data: tasksDueToday,
    isSuccess,
    isError,
    isLoading,
    error,
  } = await getTodosDueToday<ApiResponse<TodoDTO[]>>();
  const { data } = await getUserSettings();

  const tasksForProps = tasksDueToday?.data || null;
  return (
    <>
      <TodayLayout tasksToday={tasksForProps} sidebarOpen={data?.sidebarOpen} />
    </>
  );
};
