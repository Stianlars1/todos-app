import styles from "./css/sidebarDueCount.module.css";

export const SidebarDueCount = ({ dueCount }: { dueCount: number }) => {
  return <div className={styles.sidebarDueCount}>{dueCount}</div>;
};

{
  /* <span className="link-text">
{title}
{todosDueTodayCount && todosDueTodayCount > 0
  ? " " + `(${todosDueTodayCount})`
  : null}
</span>

{todosDueTodayCount && todosDueTodayCount > 0 && (
<div className="sidebar__content__item__link__dueCount-mobile">
  {todosDueTodayCount}
</div>
)} */
}
