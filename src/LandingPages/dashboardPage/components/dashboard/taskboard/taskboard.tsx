"use client";
import { UserSettingsDTO } from "@/app/actions/user/types";
import { ColumnsAndTasks } from "@/types/todo/types";
import styles from "./taskboard.module.css";
import { GetCategorizedTodosTexts } from "./utils";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useState } from "react";
import { StatusCode, TodoDTO } from "@/types/types";
import { DraggableColumn } from "@/LandingPages/dashboardPage/components/dashboard/taskboard/draggables/draggableColumn";

export const Taskboard = async ({
  userSettings,
  categorizedTexts,
  taskResponse,
}: {
  userSettings: UserSettingsDTO;
  categorizedTexts: GetCategorizedTodosTexts;
  taskResponse: ColumnsAndTasks;
}) => {
  const [columns, setColumns] = useState<StatusCode[]>(
    taskResponse.columns.map((col) => col.statusCode),
  );
  const [tasks, setTasks] = useState<TodoDTO[]>(taskResponse.tasks);

  const handleDragEnd = (event: DragEndEvent) => {};
  return (
    <div id="taskboard" className={styles.taskboard}>
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={columns}>
          {columns.map((col) => (
            <DraggableColumn
              key={col}
              column={col}
              tasks={tasks.filter((task) => task.status.statusCode === col)}
              title={categorizedTexts[col]}
              userSettings={userSettings}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
