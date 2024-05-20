"use client";
import { DragDropIcon } from "@/components/ui/icons/icons";
import { TodoDTO } from "@/types/types";
import { animations } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import draggableColumn from "./draggableColumn.module.css";
import { ColumnListDND } from "./types";
import { COLUMN_GROUP, TASKCARD_GROUP } from "./utils";
export const DraggableColumn = ({
  columnObject,
}: {
  columnObject: ColumnListDND;
}) => {
  // Handle the drag and drop of the tasks
  const [parent, tasksList] = useDragAndDrop<HTMLDivElement, TodoDTO>(
    columnObject.tasks,
    {
      group: TASKCARD_GROUP,
      plugins: [animations()],
      draggable: (el) => {
        return el.id !== "no-drag";
      },

      handleEnd: async (data) => {
        console.log("\n 2️⃣ == dRAGGABLE task START ==", data);
        console.log(
          "data.targetData.parent.data.config.group",
          data.targetData.parent.data.config.group
        );

        console.log("\n 2️⃣ == dRAGGABLE task END ==");
      },
    }
  );
  return (
    <>
      <li
        className={`${draggableColumn.column} ${COLUMN_GROUP}`}
        key={columnObject.column}
      >
        <header id="no-drag" className={draggableColumn.header}>
          <h2>{columnObject.column}</h2>
          <DragDropIcon className="column-drag-handle" />
        </header>
        {tasksList.map((task: TodoDTO) => (
          <div
            ref={parent}
            key={task.todoId}
            className={`${draggableColumn.task} taskcard-drag-handle`}
          >
            {task.title}
          </div>
        ))}
      </li>
    </>
  );
};
