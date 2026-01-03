"use client";
import { UserSettings } from "@/app/actions/user/types";
import { ErrorMessage } from "@/components/ui/errorMessage/errorMessage";
import { ApiResponse } from "@/types/fetch";
import { SoonDueTodosDTO, StatusCode, TodoDTO } from "@/types/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { MdAdd, MdArrowCircleLeft } from "react-icons/md";
import { ProgressSummaryItem } from "./components/progressSummaryItem";
import { ProgressTaskSummaryItem } from "./components/progressTaskSummaryItem";
import { TaskSummaryItem } from "./components/taskSummaryItem";
import styles from "./css/progressSummary.module.css";
import taskStyles from "./css/taskSummary.module.css";

export interface ProgressSummaryProps {
  tasks: TodoDTO[] | null;
  isError: boolean;
  error: string | null;
  upcomingDeadlines: ApiResponse<SoonDueTodosDTO> | null;
  overdueTasks: ApiResponse<TodoDTO[]> | null;
  userSettings: UserSettings;
}
export const ProgressSummaryContainer = ({
  tasks,
  isError,
  error,
  upcomingDeadlines,
  overdueTasks,
  userSettings,
}: ProgressSummaryProps) => {
  const filteredTasks = tasks
    ? (getProgressSummaryTasks(tasks)[0] as Record<StatusCode, number>)
    : undefined;

  const taskSummaryFullObject = tasks
    ? (getProgressSummaryTasks(tasks)[1] as Record<StatusCode, TodoDTO[]>)
    : undefined;

  if (isError) {
    return <ErrorMessage errorMessage={error} isError={isError} closeButton />;
  }

  return (
    <>
      <div className={styles.progressSummary}>
        <ProgressSummary
          tasks={filteredTasks}
          fullObject={taskSummaryFullObject}
        />

        <UpcomingDeadlines upcomingDeadlines={upcomingDeadlines?.data} />

        <OverdueTasks userSettings={userSettings} overdueTasks={overdueTasks} />
      </div>
    </>
  );
};

const getProgressSummaryTasks = (tasks: TodoDTO[]) => {
  const TOTAL_TASKS = tasks.length;

  const tasksMap = tasks.reduce(
    (acc, task) => {
      const status = task.status.statusCode;
      if (status) {
        acc[status] = (acc[status] || 0) + 1;
      }
      return acc;
    },
    {} as Record<StatusCode, number>,
  );
  const tasksMapFull = tasks.reduce(
    (acc, task) => {
      const status = task.status.statusCode;
      if (status) {
        acc[status] = acc[status] ? acc[status].concat(task) : [task];
      }
      return acc;
    },
    {} as Record<StatusCode, TodoDTO[]>,
  );

  const finishedTaskFull = { TOTAL_TASKS: tasks, ...tasksMapFull };

  // Ensure all status codes are included in the result, even if they are zero
  const tasksMapSummary = {
    CREATED: tasksMap.CREATED || 0,
    PENDING: tasksMap.PENDING || 0,
    IN_PROGRESS: tasksMap.IN_PROGRESS || 0,
    COMPLETED: tasksMap.COMPLETED || 0,
    ON_HOLD: tasksMap.ON_HOLD || 0,
    CANCELLED: tasksMap.CANCELLED || 0,
    DELETED: tasksMap.DELETED || 0,
  };

  // Filter out status codes with zero values
  const filteredTasksMapSummary = Object.fromEntries(
    Object.entries(tasksMapSummary).filter(([, value]) => value > 0),
  ) as Record<StatusCode, number>;

  // Return the final summary including totalTasks
  const summary = { TOTAL_TASKS, ...filteredTasksMapSummary };
  return [
    summary as Record<StatusCode, number>,
    finishedTaskFull as Record<StatusCode, TodoDTO[]>,
  ];
};

const ProgressSummary = ({
  tasks,
  fullObject,
}: {
  tasks: Record<StatusCode, number> | undefined;
  fullObject: Record<StatusCode, TodoDTO[]> | undefined;
}) => {
  const texts = useTranslations("Dashboard.header.taskSummary");

  return (
    <>
      {tasks && (
        <div className={styles.wrapper}>
          <h2 className={styles.headerTitle}>{texts("TITLE")}</h2>
          <ul className={taskStyles.ul__Wrapper}>
            {Object.entries(tasks).map(([key, value]) => {
              return (
                <TaskSummaryItem
                  key={key}
                  status={texts(key as any)}
                  count={value}
                  tasks={fullObject ? fullObject[key as StatusCode] : undefined}
                />
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

const UpcomingDeadlines = ({
  upcomingDeadlines,
}: {
  upcomingDeadlines: SoonDueTodosDTO | null;
}) => {
  const texts = useTranslations("Dashboard.header.taskSummary");
  const isEmpty =
    !upcomingDeadlines || Object.keys(upcomingDeadlines).length === 0;

  if (isEmpty) {
    return null;
  }
  return (
    <>
      {upcomingDeadlines && (
        <div className={styles.wrapper}>
          <h2 className={styles.headerTitle}>{texts("TITLE_DEADLINES")}</h2>
          <ul className={styles.summaryList}>
            {Object.entries(upcomingDeadlines)
              .sort()
              .map(([key, value]) => {
                const count = (value as TodoDTO[]).length;
                if (count === 0) {
                  return null;
                }
                return (
                  <ProgressSummaryItem
                    due={key}
                    key={key}
                    status={texts(key as any)}
                    count={count}
                  />
                );
              })}
          </ul>
        </div>
      )}
    </>
  );
};

const OverdueTasks = ({
  overdueTasks,
}: {
  overdueTasks: ApiResponse<TodoDTO[]> | null;
  userSettings: UserSettings;
}) => {
  const overdueTasksMap = overdueTasks?.data as TodoDTO[];
  const texts = useTranslations("Dashboard.header.taskSummary");
  const [showALL, setShowAll] = useState(false);
  const overdueOverview = { TOTAL_TASKS: overdueTasksMap.length };

  return (
    <>
      {showALL ? (
        <>
          <div className={`${styles.wrapper} ${styles.TaskSummary}`}>
            <h2 className={styles.headerTitle}>{texts("TITLE_OVERDUE")}</h2>
            <ul className={styles.summaryList}>
              {overdueTasksMap.map((task, index) => {
                return (
                  <ProgressTaskSummaryItem
                    key={task.todoId}
                    task={task}
                    className={styles.FadeIn}
                    style={{
                      animationDelay: `${index * 0.05}s`, // Adjust delay as needed
                    }}
                  />
                );
              })}
              <ShowMoreButton
                setShowAll={() => setShowAll(!showALL)}
                showALL={showALL}
              />
            </ul>
          </div>
        </>
      ) : (
        <>
          {overdueTasksMap && overdueTasksMap.length > 0 && (
            <div className={`${styles.wrapper} ${styles.TaskSummary}`}>
              <h2 className={styles.headerTitle}>{texts("TITLE_OVERDUE")}</h2>
              <ul className={styles.summaryList}>
                {Object.entries(overdueOverview).map(([key, value]) => {
                  return (
                    <ProgressSummaryItem
                      style={{ width: "max-content", minWidth: "150px" }}
                      key={key}
                      status={texts(key as any)}
                      count={value}
                      due="overdue"
                    />
                  );
                })}
                <ShowMoreButton
                  setShowAll={() => setShowAll(!showALL)}
                  showALL={showALL}
                />
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
};

const ShowMoreButton = ({
  setShowAll,
  showALL,
}: {
  setShowAll: () => void;
  showALL: boolean;
}) => {
  const texts = useTranslations("Dashboard.header.taskSummary");
  return (
    <div className={styles.showMoreButton}>
      {!showALL ? (
        <MdAdd className={styles.arrow} onClick={() => setShowAll()} />
      ) : (
        <MdArrowCircleLeft
          className={styles.arrow}
          onClick={() => setShowAll()}
        />
      )}
      <p>{showALL ? texts("SHOW_LESS") : texts("SHOW_MORE")}</p>
    </div>
  );
};
