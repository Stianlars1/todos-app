import { TodayCard } from "@/components/ui/cards/todayCard/todayCard";
import { TodoDTO } from "@/types/types";
import { TaskviewerContainer } from "../components/taskviewer/taskViewerContainer";
import { TodayLayoutResizeWrapper } from "../components/todayLayoutResizeWrapper/todayLayoutResizeWrapper";
import styles from "./css/todayLayout.module.css";
export const TodayLayout = ({
  tasksToday,
  sidebarOpen = true,
}: {
  tasksToday: TodoDTO[] | null;
  sidebarOpen?: boolean;
}) => {
  return (
    <div className={styles.todayLayout}>
      <TodayLayoutResizeWrapper sidebarOpen={sidebarOpen} />

      <ul className={styles.list}>
        {tasksToday?.map((task) => (
          <TodayCard
            className={styles.card}
            content={task.content}
            title={task.title}
            todoId={task.todoId}
            description={task.description}
            key={task.todoId}
            priority={task.priority}
            statusCode={task.status.statusCode}
            tags={task.tags}
            url={`?selectedTask=${task.todoId}`}
          />
        ))}
      </ul>

      <TaskviewerContainer sidebarOpen={sidebarOpen} />
    </div>
  );
};
