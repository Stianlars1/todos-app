import { UserSettings } from "@/app/actions/user/types";
import { TodayCard } from "@/components/ui/cards/todayCard/todayCard";
import { TodoDTO } from "@/types/types";
import { TodayLayoutResizeWrapper } from "../components/todayLayoutResizeWrapper/todayLayoutResizeWrapper";
import styles from "./css/todayLayout.module.css";

export const TodayLayout = ({
  tasksToday,
  userSettings,
}: {
  tasksToday: TodoDTO[] | null;
  userSettings: UserSettings | null;
}) => {
  return (
    <div className={styles.todayLayout}>
      <TodayLayoutResizeWrapper sidebarOpen={!!userSettings?.sidebarOpen} />

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
    </div>
  );
};
