import styles from "./css/dropHere.module.css";
export const DropHere = ({ status }: { status: string }) => {
  return (
    <>
      <div
        className={`${styles.dropHere} ${
          status.toLocaleUpperCase() === "DELETED" ? styles.dropHereDeleted : ""
        }  `}
      >
        <p>Drop a task in here to change it&apos;s status</p>
      </div>
    </>
  );
};
