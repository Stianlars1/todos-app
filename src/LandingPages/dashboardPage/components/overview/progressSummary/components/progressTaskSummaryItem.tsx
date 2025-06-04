import { RevealCard } from "@/components/ui/cards/revealCard/revealCard";
import { TodoDTO } from "@/types/types";
import { usePathname } from "next/navigation";
import { CSSProperties } from "react";
import styles from "../css/progressSummary.module.css";

export const ProgressTaskSummaryItem = ({
  task,
  style,
  className = " ",
}: {
  task: TodoDTO;
  style?: CSSProperties;
  className?: string;
}) => {
  const pathName = usePathname();
  const openUrl = `${pathName}/?selectedTask=${task.todoId}`;
  if (true) {
    return (
      <>
        <RevealCard
          style={style}
          content={task.content}
          title={task.title}
          todoId={task.todoId}
          className={`${styles.TaskSummaryItem} ${className}`}
          description={task.description}
          key={task.todoId}
          priority={task.priority}
          statusCode={task.status.statusCode}
          tags={task.tags}
          url={openUrl}
          cardClickEnabled={true}
        />
      </>
    );
  }
  // return (
  //   <li className={styles.summaryItem}>
  //     <h3 className={styles.title}>{task.title}</h3>
  //     <p className={styles.description}>{task.description}</p>
  //   </li>
  // );
};
