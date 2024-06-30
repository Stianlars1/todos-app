import { useTranslations } from "next-intl";
import styles from "../css/progressSummary.module.css";
export const ProgressTaskSummaryItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const texts = useTranslations("Dashboard.header.taskSummary");
  return (
    <li className={styles.summaryItem}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </li>
  );
};
