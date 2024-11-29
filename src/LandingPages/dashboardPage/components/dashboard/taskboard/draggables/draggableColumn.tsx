"use client";
import { UserSettingsDTO } from "@/app/actions/user/types";
import { StatusCodes } from "@/types/todo/types";
import { TodoDTO } from "@/types/types";
import styles from "./draggableColumn.module.css";
import { useSortable } from "@dnd-kit/sortable";
import { TYPE_COLUMN } from "@/LandingPages/dashboardPage/components/dashboard/taskboard/utils";
import { CSS } from "@dnd-kit/utilities";

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
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: column,
      data: {
        type: TYPE_COLUMN,
        column,
      },
    });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div ref={setNodeRef} {...style} className={styles.draggableColumn}>
      <header {...attributes} {...listeners}>
        DRA MEG
      </header>

      {title}
    </div>
  );
};
