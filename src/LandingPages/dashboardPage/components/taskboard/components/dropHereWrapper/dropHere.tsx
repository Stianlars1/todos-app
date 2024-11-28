import styles from "./css/dropHere.module.css";
import {StatusCodes} from "@/types/todo/types";

export const DropHere = ({ column }: { column: StatusCodes }) => {
  console.dir("Drop here ===, column", column);
  return (
    <>
      <div
        className={`${styles.dropHere} ${
          column.toUpperCase() === ("DELETED" as StatusCodes)
            ? styles.dropHereDeleted
            : ""
        }  `}
      >
        <p>Drop a task in here to change it&apos;s status</p>
      </div>
    </>
  );
};
