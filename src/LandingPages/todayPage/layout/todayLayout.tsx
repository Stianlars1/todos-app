import { RevealCard } from "@/components/ui/cards/revealCard/revealCard";
import { TaskBuddyIcon } from "@/components/ui/icons/icons";
import { TodoDTO } from "@/types/types";
import { TaskviewerContainer } from "../components/taskviewer/taskViewerContainer";
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
      {!tasksToday && (
        <>
          <div className={styles.noTasks}>
            <TaskBuddyIcon />
            <h2>No tasks due today</h2>
          </div>
        </>
      )}
      <ul className={styles.list}>
        {tasksToday?.map((task) => (
          <RevealCard
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