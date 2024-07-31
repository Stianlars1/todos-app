import { UserSettingsDTO } from "@/app/actions/user/types";
import { shouldReturn } from "@/components/ui/cards/draggableCard/draggableCard";
import { TaskCard } from "@/components/ui/cards/taskCard/taskCard";
import { TodoDTO } from "@/types/types";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import styles from "./css/tasksResults.module.css";
export const TasksResults = ({
  tasks,
  userSettings,
}: {
  tasks: TodoDTO[] | null;
  userSettings: UserSettingsDTO | undefined;
}) => {
  const locale = useLocale();
  const router = useRouter();
  const openTask = (event: React.MouseEvent<HTMLDivElement>, todoId: any) => {
    const shouldItReturn = shouldReturn(event);
    if (shouldItReturn) {
      return;
    }

    event.preventDefault();
    router.push(`/${locale}/tags?selectedTask=${todoId}`, undefined);
  };

  return (
    <ul className={styles.tasksList}>
      {tasks &&
        tasks.map((todo: TodoDTO, index: number) => {
          return (
            <TaskCard
              className={styles.task}
              key={todo.todoId}
              priority={todo.priority}
              tags={todo.tags}
              index={index}
              title={todo.title}
              description={todo.description || ""}
              onClick={(event: any) => openTask(event, todo.todoId)}
            />
          );
        })}
    </ul>
  );
};
