"use client";
import { UserSettingsDTO } from "@/app/actions/user/types";
import { ColumnsAndTasks } from "@/types/todo/types";
import styles from "./taskboard.module.css";
import { GetCategorizedTodosTexts, TYPE_COLUMN, TYPE_TASK } from "./utils";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { StatusCode, TodoDTO } from "@/types/types";
import { DraggableColumn } from "@/LandingPages/dashboardPage/components/dashboard/taskboard/draggables/draggableColumn/draggableColumn";
import { createPortal } from "react-dom";
import { DraggableTask } from "@/LandingPages/dashboardPage/components/dashboard/taskboard/draggables/draggableTask/draggableTask";

export const Taskboard = ({
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
  const columnsIds = useMemo(() => columns.map((col) => col), [columns]);
  const [activeColumn, setActiveColumn] = useState<StatusCode | null>(null);

  const [tasks, setTasks] = useState<TodoDTO[]>(taskResponse.tasks);
  const [activeTask, setActiveTask] = useState<TodoDTO | null>(null);

  const hasMounted = typeof window !== "undefined";

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveColumn(null);
    setActiveTask(null);
    if (!over || !active) return;

    console.log("\n\nDrag ended", event);
    const isColumnDrag = active.data.current?.type === TYPE_COLUMN;
    const isTaskDrag = active.data.current?.type === TYPE_TASK;

    if (isColumnDrag) {
      console.log("Column drag", active.data.current?.column);

      setColumns((columns) => {
        const oldIndex = columns.findIndex(
          (col) => col === active.data.current?.column,
        );
        const newIndex = columns.findIndex((col) => col === over.id);
        return arrayMove(columns, oldIndex, newIndex);
      });
    }

    if (isTaskDrag) {
      console.log("Task drag", active);
      console.log("over event", over);

      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((task) => task.todoId === active.id);
        const newIndex = tasks.findIndex((task) => task.todoId === over.id);

        return arrayMove(tasks, oldIndex, newIndex);
      });
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    console.log("\n\n== handleDragStart ==", event);
    const isColumnDrag = active.data.current?.type === TYPE_COLUMN;
    const isTaskDrag = active.data.current?.type === TYPE_TASK;

    if (isColumnDrag) {
      console.log("Column drag", active.data.current?.column);
      setActiveColumn(active.data.current?.column);
    }

    if (isTaskDrag) {
      console.log("Task drag", active.data.current?.task);
      setActiveTask(active.data.current?.task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    // Early return if no over target or not a task drag
    if (!over || active.data.current?.type !== TYPE_TASK) return;

    const activeTask = active.data.current?.task as TodoDTO;
    const overId = over.id;
    const overType = over.data.current?.type;

    // If dragging over a column
    if (overType === TYPE_COLUMN) {
      const targetColumnStatus = over.id as StatusCode;

      setTasks((currentTasks) => {
        // Find the index of the task being dragged
        const activeIndex = currentTasks.findIndex(
          (task) => task.todoId === activeTask.todoId,
        );

        // Create a new task with updated status
        const updatedTask = {
          ...currentTasks[activeIndex],
          status: {
            ...currentTasks[activeIndex].status,
            statusCode: targetColumnStatus,
          },
        };

        // Create a new tasks array with the updated task
        return currentTasks.map((task) =>
          task.todoId === activeTask.todoId ? updatedTask : task,
        );
      });
    }
  };
  return (
    <div>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <SortableContext items={columnsIds}>
          <div id="taskboard" className={styles.taskboard}>
            {columns.map((col) => (
              <DraggableColumn
                key={col}
                column={col}
                tasks={tasks.filter((task) => task.status.statusCode === col)}
                title={categorizedTexts[col]}
                userSettings={userSettings}
              />
            ))}
          </div>
        </SortableContext>

        {hasMounted &&
          (activeColumn || activeTask) &&
          createPortal(
            <DragOverlay>
              {activeColumn && (
                <DraggableColumn
                  column={activeColumn}
                  tasks={tasks.filter(
                    (task) => task.status.statusCode === activeColumn,
                  )}
                  title={categorizedTexts[activeColumn]}
                  userSettings={userSettings}
                />
              )}

              {activeTask && <DraggableTask {...activeTask} />}
            </DragOverlay>,
            document.body,
          )}
      </DndContext>
    </div>
  );
};
