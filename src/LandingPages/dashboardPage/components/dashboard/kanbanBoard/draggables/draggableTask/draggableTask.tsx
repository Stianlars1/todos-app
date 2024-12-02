import { TodoDTO } from "@/types/types";
import styles from "./draggableTask.module.css";
import { useSortable } from "@dnd-kit/sortable";
import { TYPE_TASK } from "@/LandingPages/dashboardPage/components/dashboard/kanbanBoard/utils";
import { CSS } from "@dnd-kit/utilities";
import { cx } from "@/utils/utils";
import { Tag } from "@/components/ui/tag/tags";
import { useTaskViewerMenu } from "@/components/ui/taskviewer/hooks/useTaskViewerMenu";
import { LanguageType } from "@/app/actions/user/types";
import { IconDocumentText } from "@/components/ui/icons/icons";

export const DraggableTask = ({
  task,
  language,
  isDragOverlay = false,
}: {
  task: TodoDTO;
  language: LanguageType;
  isDragOverlay?: boolean;
}) => {
  const {
    todoId,
    title,
    priority,
    dueDate,
    tags,
    files,
    createdAt,
    description,
  } = task;
  const { onTaskClick } = useTaskViewerMenu();

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
      className={cx(
        styles.draggableTask,
        isDragging && styles.isDragging,
        isDragOverlay && styles.isDragOverlay,
      )}
      onClick={() => onTaskClick(task.todoId)}
    >
      <div className={styles.taskHeader}>
        <h3 className={styles.taskTitle}>{title}</h3>
      </div>

      {description && (
        <div className={styles.descriptionWrapper}>
          <p className={styles.description}>{description}</p>
        </div>
      )}

      <div className={styles.taskFooter}>
        {!!description?.length && (
          <IconDocumentText size={16} className={styles.descriptionIcon} />
        )}

        {priority && <Tag priority={priority} variant={"priority"} />}
        {tags && tags.length > 0 && <Tag tags={tags} variant={"tag"} />}
      </div>
    </li>
  );
};
