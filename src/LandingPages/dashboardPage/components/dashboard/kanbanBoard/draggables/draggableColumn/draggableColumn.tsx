"use client";
import { UserSettings } from "@/app/actions/user/types";
import { StatusCodes } from "@/types/todo/types";
import { TodoDTO } from "@/types/types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { TYPE_COLUMN } from "@/LandingPages/dashboardPage/components/dashboard/kanbanBoard/utils";
import { CSS } from "@dnd-kit/utilities";
import { cx } from "@/utils/utils";
import styles from "./draggableColumn.module.css";
import responsiveStyles from "./responsiveStyles.module.css";
import { DraggableTask } from "@/LandingPages/dashboardPage/components/dashboard/kanbanBoard/draggables/draggableTask/draggableTask";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { EditIcon2, IconAdd, IconMinus } from "@/components/ui/icons/icons";
import { StatusColumnSortButton } from "@/LandingPages/dashboardPage/components/dashboard/kanbanBoard/draggables/draggableColumn/components/draggableColumnSortButton/draggableColumnSortButton";

export const LIMIT_THRESHOLD = 2;
export const DraggableColumn = ({
  column,
  tasks,
  title,
  userSettings,
}: {
  column: StatusCodes;
  tasks: TodoDTO[];
  title: string;
  userSettings: UserSettings;
}) => {
  // config
  const columnRef = useRef<HTMLDivElement>(null);

  const [showHiddenTasks, setShowHiddenTasks] = useState(false);
  const [isEditMode, setisEditMode] = useState(false);
  const texts = useTranslations("Taskboard");
  const limitTasks = userSettings.limitTasks && tasks.length > LIMIT_THRESHOLD;
  const limitTasksText = texts(
    showHiddenTasks ? "taskCard.showLess" : "taskCard.showMore",
  );

  // Draggable stuff
  const {
    setNodeRef,
    listeners,
    transition,
    transform,
    attributes,
    isDragging,
  } = useSortable({
    id: column,
    data: useMemo(
      () => ({
        type: TYPE_COLUMN,
        column,
      }),
      [column],
    ),
    disabled: userSettings.sortManual,
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const tasksIds = useMemo(() => tasks.map((task) => task.todoId), [tasks]);

  // other stuff
  const handleLimitButtonClick = () => {
    setShowHiddenTasks(!showHiddenTasks);
  };

  const taskList = limitTasks
    ? showHiddenTasks
      ? tasks
      : tasks.slice(0, LIMIT_THRESHOLD)
    : tasks;

  const emptyColumn = taskList.length === 0;
  const showTasks = !emptyColumn || showHiddenTasks;

  useEffect(() => {
    const updateMaxHeight = () => {
      const element = document.getElementById(column); // or use a data-attribute selector
      if (element) {
        const { top } = element.getBoundingClientRect();
        element.style.setProperty("--column-top-offset", `${top}px`);
      }
    };

    updateMaxHeight();
    window.addEventListener("resize", updateMaxHeight);

    return () => {
      window.removeEventListener("resize", updateMaxHeight);
    };
  }, [column]);

  return (
    <div
      id={column}
      ref={setNodeRef} // Just use the dnd-kit ref
      style={style}
      className={cx(
        isDragging && styles.isDragging,
        styles.draggableColumn,
        responsiveStyles.draggableColumn,
        showHiddenTasks && styles.showHiddenTasks,
      )}
    >
      <header className={cx(styles.columnHeader)}>
        <div
          {...attributes}
          {...listeners}
          className={cx(
            styles.dragHandle,
            !userSettings.sortManual && styles.draggableHeader,
          )}
        >
          <h2 className={styles.columnTitle}>
            {title}{" "}
            {!!taskList.length && (
              <span className={styles.columnTitleTaskCount}>
                {taskList.length}
              </span>
            )}
          </h2>
        </div>

        <div className={styles.utilitiesAre}>
          {userSettings.sortManual && (
            <StatusColumnSortButton
              userSettings={userSettings}
              categoryString={column}
            />
          )}
          {!!taskList.length && (
            <EditIcon2
              onClick={() => setisEditMode(!isEditMode)}
              className={styles.utilityButton}
            />
          )}
        </div>
      </header>

      {emptyColumn && (
        <div className={styles.emptyContainer}>
          <p className={styles.emptyText}>{texts("emptyState")}</p>
        </div>
      )}

      <SortableContext items={tasksIds}>
        {showTasks && (
          <ul className={styles.taskContainer}>
            {taskList.map((task) => (
              <DraggableTask
                key={task.todoId}
                task={task}
                disableDragAndDrop={userSettings.sortManual}
                isEditMode={isEditMode}
              />
            ))}
          </ul>
        )}
      </SortableContext>

      {limitTasks && (
        <button className={styles.limitButton} onClick={handleLimitButtonClick}>
          {showHiddenTasks ? (
            <IconMinus className={styles.limitIcon} />
          ) : (
            <IconAdd className={styles.limitIcon} />
          )}
          {limitTasksText}
        </button>
      )}
    </div>
  );
};
