"use client";
import { UserSettings } from "@/app/actions/user/types";
import { CategorizedTodos, StatusCode, TodoDTO } from "@/types/types";
import { useColumnHeadersTexts } from "@/LandingPages/dashboardPage/components/dashboard/utils";
import styles from "./tableBoard.module.css";

interface TableBoardProps {
  categorizedTodos: CategorizedTodos;
  userSettings: UserSettings;
}

export const TableBoard = ({
  categorizedTodos,
  userSettings,
}: TableBoardProps) => {
  const columnHeaders = useColumnHeadersTexts();
  const columns = getColumnsForTableBoard(categorizedTodos);
  return (
    <div className={styles.tableBoard}>
      <ul className={styles.columnList}>
        {columns.map(([column, tasks]) => (
          <li key={column} className={styles.column}>
            <div className={styles.columnHeader}>
              <h3 className={styles.columnHeading}>
                {columnHeaders[column as StatusCode]}
              </h3>
            </div>

            {tasks && tasks.length > 0 && (
              <ul className={styles.taskWrapper}>
                {(tasks as TodoDTO[]).map((task) => (
                  <li className={styles.task} key={task.todoId}>
                    {task.title}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const getColumnsForTableBoard = (categorizedTodos: CategorizedTodos) => {
  // filter out the key named "SOON_DUE"
  return Object.entries(categorizedTodos as CategorizedTodos).filter(
    ([key, value]) => key !== "SOON_DUE",
  );
};
