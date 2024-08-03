"use client";
import { shouldReturn } from "@/components/ui/cards/draggableCard/draggableCard";
import { TaskCard } from "@/components/ui/cards/taskCard/taskCard";
import { TodoDTO } from "@/types/types";
import { sortTasks } from "@/utils/utils";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import "./css/taskCard.css";
import styles from "./css/taskPreview.module.css";
export const TaskPreview = ({ tasks }: { tasks: TodoDTO[] | null }) => {
  const locale = useLocale();
  const router = useRouter();
  console.log("TASKS", tasks);
  if (!tasks) return null;
  const handleOnCardClick = (
    event: React.MouseEvent<HTMLLIElement>,
    todoId: any
  ) => {
    const shouldItReturn = shouldReturn(event);
    if (shouldItReturn) {
      return;
    }

    event.preventDefault();
    router.push(`/${locale}/tags?selectedTask=${todoId}`, { scroll: false });
  };
  return (
    <div className={styles.taskPreview}>
      <ul className={styles.tasksList}>
        {sortTasks(tasks).map((task, index) => (
          <TaskCard
            className={styles.card}
            onClick={(event) => handleOnCardClick(event, task.todoId)}
            key={task.todoId}
            task={task}
            index={index}
            options={{ showPriority: false, showTags: true, showDate: true }}
          />
        ))}
      </ul>
    </div>
  );
};

//2024-08-02 23:59:59.000000 +00:00
//2024-08-02 23:59:59.000000 +00:00
