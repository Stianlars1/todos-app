import { TodoDTO } from "@/types/types";
import styles from "./draggableTask.module.css";
import { useSortable } from "@dnd-kit/sortable";
import { TYPE_TASK } from "@/LandingPages/dashboardPage/components/dashboard/taskboard/utils";
import { CSS } from "@dnd-kit/utilities";
import { cx } from "@/utils/utils";

export const DraggableTask = (task: TodoDTO) => {
  const { todoId, title, description } = task;

  const {
    setNodeRef,
    listeners,
    transition,
    transform,
    attributes,
    isDragging,
  } = useSortable({
    id: todoId,
    data: { type: TYPE_TASK, task },
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cx(isDragging && styles.isDragging, styles.draggableTask)}
    >
      {title}
    </li>
  );
};
