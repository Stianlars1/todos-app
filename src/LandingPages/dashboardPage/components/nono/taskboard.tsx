"use client";
import { CategorizedTodosDTO, StatusCodes } from "@/types/todo/types";
import { animations } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";

import { DraggableColumn } from "./DraggableColumn";
import taskboard from "./taskboard.module.css";
import { ColumnListDND } from "./types";
import { COLUMN_GROUP } from "./utils";

export const Taskboard = ({ tasks }: { tasks: CategorizedTodosDTO }) => {
  const columnsList: ColumnListDND[] = Object.entries(tasks).map(
    ([categoryString, todosList]) => ({
      column: categoryString as StatusCodes,
      tasks: todosList,
    })
  );

  // Handle the drag and drop of the columns
  const [parent, colums, setColumnsList, updateConfig] = useDragAndDrop<
    HTMLUListElement,
    ColumnListDND
  >(columnsList, {
    dragHandle: ".column-drag-handle",
    group: COLUMN_GROUP,
    plugins: [animations()],
    draggable: (el) => {
      return el.className.includes(COLUMN_GROUP);
    },

    handleEnd: async (data) => {
      if (data.targetData.parent.data.config.group !== COLUMN_GROUP) {
        console.log("Not a column");
        return;
      }
      console.log("\n 2️⃣ == Taskboard START ==");
      console.log(
        "data.targetData.parent.data.config.group",
        data.targetData.parent.data.config.group
      );
      console.log("\n 2️⃣ == Taskboard END ==", data);

      // save the new displayOrder of the columns
      //await handleUpdateColumnsOrder(colums);
      // Assuming the element's new order can be determined from the DOM
    },

    sortable: true,
  });

  return (
    <>
      <ul ref={parent} className={`${taskboard.columnWrapper} ${COLUMN_GROUP}`}>
        {colums.map((columnObject: ColumnListDND, index: number) => (
          <DraggableColumn
            data-label={columnObject.column}
            key={columnObject.column}
            columnObject={columnObject}
          />
        ))}
      </ul>
    </>
  );
};
