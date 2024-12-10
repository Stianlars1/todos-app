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
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { IconAdd, IconMinus } from "@/components/ui/icons/icons";

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
  const [showHiddenTasks, setShowHiddenTasks] = useState(false);
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
    data: { type: TYPE_COLUMN, column },
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

  return (
    <div
      id={column}
      ref={setNodeRef}
      style={style}
      className={cx(
        isDragging && styles.isDragging,
        styles.draggableColumn,
        responsiveStyles.draggableColumn,
      )}
    >
      <header {...attributes} {...listeners} className={styles.columnHeader}>
        {title}
      </header>

      {emptyColumn && (
        <div className={styles.emptyContainer}>
          <p className={styles.emptyText}>{texts("emptyState")}</p>
        </div>
      )}

      {showTasks && (
        <SortableContext items={tasksIds}>
          <ul className={styles.taskContainer}>
            {taskList.map((task) => (
              <DraggableTask
                key={task.todoId}
                task={task}
                disableDragAndDrop={userSettings.sortManual}
              />
            ))}
          </ul>
        </SortableContext>
      )}

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
