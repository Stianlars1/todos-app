import { TodoDTO } from "@/types/types";
import styles from "./draggableTask.module.scss";
import { useSortable } from "@dnd-kit/sortable";
import { TYPE_TASK } from "@/LandingPages/dashboardPage/components/dashboard/kanbanBoard/utils";
import { CSS } from "@dnd-kit/utilities";
import { Tag } from "@/components/ui/tag/tags";
import { useTaskViewerMenu } from "@/components/ui/taskviewer/hooks/useTaskViewerMenu";
import { IconDocumentText } from "@/components/ui/icons/icons";
import { useState } from "react";
import { MdRemoveCircle } from "react-icons/md";
import { useColumnsAndTasks } from "@/LandingPages/dashboardPage/components/dashboard/kanbanBoard/context/columnsAndTasksContext";
import { useBrowserInfo } from "@/hooks/useBrowserInfo";
import { cx } from "@/utils/cx";
import { Loader } from "@stianlarsen/react-ui-kit";

export const DraggableTask = ({
  task,
  isDragOverlay = false,
  disableDragAndDrop = false,
  isEditMode,
}: {
  task: TodoDTO;
  disableDragAndDrop?: boolean;
  isDragOverlay?: boolean;
  isEditMode?: boolean;
}) => {
  const { isNative } = useBrowserInfo();
  const { removeTask, activeDashboardId } = useColumnsAndTasks();
  const { todoId, title, priority, tags, description } = task;

  const [isHovered, setIsHovered] = useState(false);

  const { onTaskClick, isOpeningTask } = useTaskViewerMenu();

  // Once longPress triggered, do not revert hover on finger lift
  // If you need desktop hover: only revert if mouse events are triggered AND not long pressed
  const handleMouseOverCard = (type: "enter" | "leave") => {
    if (isNative) return;
    if (type === "enter") {
      setIsHovered(true);
    } else {
      // Only revert if we haven't triggered a long press
      setIsHovered(false);
    }
  };

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
    disabled: disableDragAndDrop,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleDeleteTask = async (event: React.MouseEvent) => {
    if (task && activeDashboardId) {
      event.preventDefault();
      event.stopPropagation();
      await removeTask(task, activeDashboardId);
    }
  };

  const showDeleteButton = isHovered || isEditMode;

  return (
    <>
      <li
        id={task.todoId.toString()}
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
        onMouseEnter={() => handleMouseOverCard("enter")}
        onMouseLeave={() => handleMouseOverCard("leave")}
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

        {showDeleteButton && (
          <button
            aria-label={`Click to delete task with title ${title}`}
            className={styles.deleteButton}
            onClick={handleDeleteTask}
          >
            <MdRemoveCircle />
          </button>
        )}
      </li>
      {isOpeningTask && (
        <div className={styles.openTaskLoaderBackdrop}>
          <Loader widthAndHeight={32} />
        </div>
      )}
    </>
  );
};
