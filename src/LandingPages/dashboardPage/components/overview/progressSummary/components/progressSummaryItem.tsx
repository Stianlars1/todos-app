import { useLocale, useTranslations } from "next-intl";
import { CSSProperties } from "react";
import styles from "../css/progressSummary.module.css";
import Link from "next/link";

export const ProgressSummaryItem = ({
  due,
  status,
  count,
  style,
}: {
  due?: any;
  status: any;
  count: number;
  style?: CSSProperties;
}) => {
  const texts = useTranslations("Dashboard.header.taskSummary");
  const isCompleted = status === texts("COMPLETED");
  const isDeleted = status === texts("DELETED");
  const locale = useLocale();
  const dueToday = due === "Due Today";
  const todayUrl = `${locale}/today`;
  if (dueToday) {
    return (
      <Link style={style} href={todayUrl} className={styles.dueToday}>
        <li
          className={`${styles.summaryItem} ${
            isCompleted ? styles.summaryCompleted : ""
          }
        
        ${isDeleted ? styles.summaryDeleted : ""}`}
        >
          <h3 className={styles.title}>{status}</h3>
          <p className={styles.description}>{count}</p>
        </li>
      </Link>
    );
  }
  return (
    <li
      style={style}
      className={`${styles.summaryItem} ${
        isCompleted ? styles.summaryCompleted : ""
      }
        
        ${isDeleted ? styles.summaryDeleted : ""}
        ${due === "overdue" ? styles.summaryDeleted : ""}`}
    >
      <h3 className={styles.title}>{status}</h3>
      <p className={styles.description}>{count}</p>
    </li>
  );
};
