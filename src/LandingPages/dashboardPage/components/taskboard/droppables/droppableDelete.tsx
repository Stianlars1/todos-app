"use client";
import { DraggableCard } from "@/components/ui/cards/draggableCard/draggableCard";
import { TodoDTO } from "@/types/types";
import { animations, handleDragoverParent } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useState } from "react";
import deleteWrapper from "../css/deleteWrapper.module.css";
import { DELETE_GROUP, TASKCARD_GROUP } from "../utils";

const categoryCode = "DELETED";

export const DroppableDelete = ({ isDragging }: { isDragging: boolean }) => {
  const [draggedOver, setDraggedOver] = useState(false);
  const [parent, tasksList] = useDragAndDrop<HTMLDivElement, TodoDTO>([], {
    group: TASKCARD_GROUP,
    plugins: [animations()],
    dropZone: true,
    handleDragoverParent: (data) => {
      handleDragoverParent(data);
      setDraggedOver(true);
    },
    handleEnd: (data: any) => {
      console.log("\n\n🛜handleEnd on droppable delete", data);
      setDraggedOver(false);
    },
  });

  return (
    <>
      <div
        ref={parent}
        data-group={DELETE_GROUP}
        data-column-status={categoryCode}
        className={`${deleteWrapper.deleteWrapper} ${
          draggedOver ? deleteWrapper.draggedOver : ""
        }`}
      >
        DROP TASK HERE TO DELETE
        {tasksList.map((task: TodoDTO) => (
          <DraggableCard
            categoryCode={"DELETED"}
            key={task.todoId}
            task={task}
            style={{ transform: "scale(0.5)" }}
          />
        ))}
      </div>
    </>
  );
};
