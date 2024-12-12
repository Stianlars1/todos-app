import { getTodosDueToday } from "@/app/actions/todos/fetch";
import { getUserSettings } from "@/app/actions/user/userApi";
import { TaskBuddyIcon } from "@/components/ui/icons/icons";
import { ApiResponse } from "@/types/fetch";
import { TodoDTO } from "@/types/types";
import { getTranslations } from "next-intl/server";

import styles from "./css/todayPage.module.css";
import { TodayLayout } from "./layout/todayLayout";

export const TodayPage = async () => {
  const { data: tasksDueToday } =
    await getTodosDueToday<ApiResponse<TodoDTO[]>>();

  const { data: userSettings } = await getUserSettings();
  const text = await getTranslations("TodayPage");
  const tasksForProps = (tasksDueToday?.data as TodoDTO[]) || null;
  return (
    <>
      {!tasksForProps && (
        <>
          <div className={styles.header}>
            <TaskBuddyIcon />
            <h1>{text("header.noTasksTitle")}</h1>
          </div>
        </>
      )}

      {tasksForProps && (
        <>
          <div className={styles.header}>
            <h1 className={styles.title}>
              {text("header.title")}{" "}
              <div className={styles.titleDueCount}>{tasksForProps.length}</div>
            </h1>
          </div>
        </>
      )}
      <TodayLayout tasksToday={tasksForProps} userSettings={userSettings} />
    </>
  );
};
