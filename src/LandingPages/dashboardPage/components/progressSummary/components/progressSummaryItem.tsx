import { useTranslations } from "next-intl";
import styles from "../css/progressSummary.module.css";
export const ProgressSummaryItem = ({
  status,
  count,
}: {
  status: any;
  count: number;
}) => {
  const texts = useTranslations("Dashboard.header.taskSummary");
  const isCompleted = status === texts("COMPLETED");
  const isDeleted = status === texts("DELETED");
  return (
    <li
      className={`${styles.summaryItem} ${
        isCompleted ? styles.summaryCompleted : ""
      }
        
        ${isDeleted ? styles.summaryDeleted : ""}`}
    >
      <h3 className={styles.title}>{status}</h3>
      <p className={styles.description}>{count}</p>
    </li>
  );
};
