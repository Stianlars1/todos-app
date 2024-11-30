"use client";
import { UserSettingsDTO } from "@/app/actions/user/types";
import { StatusCodes } from "@/types/todo/types";
import { TodoDTO } from "@/types/types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { TYPE_COLUMN } from "@/LandingPages/dashboardPage/components/dashboard/taskboard/utils";
import { CSS } from "@dnd-kit/utilities";
import { cx } from "@/utils/utils";
import styles from "./draggableColumn.module.scss";
import { DraggableTask } from "@/LandingPages/dashboardPage/components/dashboard/taskboard/draggables/draggableTask/draggableTask";
import { useMemo } from "react";

export const DraggableColumn = ({
  column,
  tasks,
  title,
  userSettings,
}: {
  column: StatusCodes;
  tasks: TodoDTO[];
  title: string;
  userSettings: UserSettingsDTO | null;
}) => {
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
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const tasksIds = useMemo(() => tasks.map((task) => task.todoId), [tasks]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cx(isDragging && styles.isDragging, styles.draggableColumn)}
    >
      <header {...attributes} {...listeners} className={styles.columnHeader}>
        {title}
      </header>
      <SortableContext items={tasksIds}>
        <ul className={styles.taskContainer}>
          {tasks.map((task) => (
            <DraggableTask key={task.todoId} {...task} />
          ))}
        </ul>
      </SortableContext>
    </div>
  );
};
