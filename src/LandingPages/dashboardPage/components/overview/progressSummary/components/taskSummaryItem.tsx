"use client";
import { Priority } from "@/app/actions/todos/types";
import { CloseIcon } from "@/components/ui/icons/icons";
import { Tag } from "@/components/ui/tag/tags";
import { TodoDTO } from "@/types/types";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { CSSProperties, useState } from "react";
import styles from "../css/taskSummary.module.css";
export const TaskSummaryItem = ({
  status,
  count,
  style,
  tasks,
}: {
  status: any;
  count: number;
  style?: CSSProperties;
  tasks: TodoDTO[] | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const texts = useTranslations("Dashboard.header.taskSummary");
  const isCompleted = status === texts("COMPLETED");
  const isDeleted = status === texts("DELETED");
  const router = useRouter();
  const pathhName = usePathname();

  const handleCardClick = () => {
    setIsOpen(!isOpen);
  };

  const openTask = (todoId: number) => {
    router.push(`${pathhName}/?selectedTask=${todoId}`, undefined);
  };

  const handleTaskSummaryClick = (
    event: React.MouseEvent<HTMLLIElement>,
    taskId: number
  ) => {
    event.preventDefault();
    event.stopPropagation();
    openTask(taskId);
  };
  return (
    <li
      onClick={handleCardClick}
      style={style}
      className={`${styles.taskItem} ${isCompleted ? styles.taskCompleted : ""}
            ${isOpen ? styles.cardOpen : ""}
        ${isDeleted ? styles.taskDeleted : ""}
        `}
    >
      {isOpen && <CloseIcon className={styles.taskListOpenCloseIcon} />}
      <h3 className={styles.title}>{status}</h3>
      <p className={styles.description}>{count}</p>

      {isOpen && tasks && tasks?.length > 0 && (
        <>
          <ul className={styles.taskList}>
            {tasks.map((task) => (
              <li
                onClick={(event) => handleTaskSummaryClick(event, task.todoId)}
                key={task.todoId}
                className={styles.taskCard}
              >
                <div className={styles.taskContent}>
                  <h4 className={styles.taskContentTitle}>{task.title}</h4>
                  {task.description && (
                    <p className={styles.taskContentDesc}>{task.description}</p>
                  )}
                </div>
                <div className={styles.taskInfo}>
                  <Tag
                    variant="priority"
                    priority={task.priority || ("MEDIUM" as Priority)}
                  />
                  <Tag variant="tag" tags={task.tags} />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </li>
  );
};
