"use client";
import { UserSettings } from "@/app/actions/user/types";
import { ColumnsAndTasks } from "@/types/todo/types";
import styles from "./taskboard.module.css";
import { TYPE_COLUMN, TYPE_TASK } from "./utils";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useEffect, useMemo, useState } from "react";
import { StatusCode, TodoDTO, TodoStatus } from "@/types/types";
import { DraggableColumn } from "@/LandingPages/dashboardPage/components/dashboard/kanbanBoard/draggables/draggableColumn/draggableColumn";
import { createPortal } from "react-dom";
import { DraggableTask } from "@/LandingPages/dashboardPage/components/dashboard/kanbanBoard/draggables/draggableTask/draggableTask";
import { getStatusByCode } from "@/utils/utils";
import {
  moveTask,
  updateColumnDisplayOrder,
  updateTaskSortIndex,
} from "@/app/actions/dragDrop/fetch";
import { toast } from "@/components/ui/toast/toast";
import { SuspenseFallback } from "@/components/ui/suspenseFallback/suspenseFallback";
import { useColumnHeadersTexts } from "@/LandingPages/dashboardPage/components/dashboard/utils";

export const KanbanBoard = ({
  userSettings,
  columnsAndTasks,
}: {
  userSettings: UserSettings;
  columnsAndTasks: ColumnsAndTasks;
}) => {
  const categorizedTexts = useColumnHeadersTexts();
  const [isMounted, setIsMounted] = useState(false);
  const [columns, setColumns] = useState<StatusCode[]>(
    columnsAndTasks.columns.map((col) => col.statusCode),
  );
  const columnsIds = useMemo(() => columns.map((col) => col), [columns]);
  const [activeColumn, setActiveColumn] = useState<StatusCode | null>(null);

  const [tasks, setTasks] = useState<TodoDTO[]>(columnsAndTasks.tasks);
  const [activeTask, setActiveTask] = useState<TodoDTO | null>(null);

  const hasMounted = typeof window !== "undefined";

  useEffect(() => {
    const newColumns = columnsAndTasks.columns.map((col) => col.statusCode);
    setColumns(newColumns);
  }, [columnsAndTasks.columns]);

  useEffect(() => {
    setTasks(columnsAndTasks.tasks);
  }, [columnsAndTasks.tasks]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 3 },
    }),
    useSensor(TouchSensor, { activationConstraint: { distance: 2 } }),
  );

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

    // Handle column drag
    if (active.data.current?.type === TYPE_COLUMN && over) {
      const activeColumnId = active.data.current.column;
      const overColumnId = over.id;

      if (activeColumnId !== overColumnId) {
        const oldIndex = columns.indexOf(activeColumnId);
        const newIndex = columns.indexOf(overColumnId as StatusCode);

        setColumns(arrayMove(columns, oldIndex, newIndex));
      }
    }

    if (!over || active.data.current?.type !== TYPE_TASK) return;

    const activeTask = active.data.current?.task as TodoDTO;
    const overType = over.data.current?.type;

    // If dragging over a column
    if (overType === TYPE_COLUMN) {
      const targetColumnStatus = over.id as StatusCode;

      setTasks((currentTasks) => {
        const activeIndex = currentTasks.findIndex(
          (task) => task.todoId === activeTask.todoId,
        );
        const targetStatus = getStatusByCode(targetColumnStatus);

        // Create a temporary visual task update
        const updatedTask = {
          ...currentTasks[activeIndex],
          status: targetStatus,
        };

        return currentTasks.map((task) =>
          task.todoId === activeTask.todoId ? updatedTask : task,
        );
      });
    }

    // If dragging over another task
    if (overType === TYPE_TASK) {
      const overTask = over.data.current?.task as TodoDTO;

      setTasks((currentTasks) => {
        const activeIndex = currentTasks.findIndex(
          (task) => task.todoId === activeTask.todoId,
        );
        const overIndex = currentTasks.findIndex(
          (task) => task.todoId === overTask.todoId,
        );

        if (activeTask.status.statusCode !== overTask.status.statusCode) {
          const targetStatus = getStatusByCode(overTask.status.statusCode);
          const updatedTask = {
            ...currentTasks[activeIndex],
            status: targetStatus,
          };

          // Remove and reinsert for visual ordering
          const newTasks = currentTasks.filter(
            (task) => task.todoId !== activeTask.todoId,
          );
          newTasks.splice(overIndex, 0, updatedTask);
          return newTasks;
        }

        // If same column, just reorder
        return arrayMove(currentTasks, activeIndex, overIndex);
      });
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    console.log("\n\n== handleDragEnd ==", event);
    setActiveColumn(null);
    setActiveTask(null);

    if (!over || !active) return;

    const isColumnDrag = active.data.current?.type === TYPE_COLUMN;
    const isTaskDrag = active.data.current?.type === TYPE_TASK;

    if (isColumnDrag) {
      await handleColumnDragEnd(event);
    }

    if (isTaskDrag) {
      await handleTaskDragEnd(event);
    }
  };

  const handleColumnDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const oldIndex = columns.findIndex(
      (col) => col === active.data.current?.column,
    );
    const newIndex = columns.findIndex((col) => col === over.id);

    /*if (oldIndex === newIndex) return;*/ // because we change the order on drag over instead, so the drop placement is correct

    const updatedColumns = arrayMove(columns, oldIndex, newIndex);
    setColumns(updatedColumns);

    const newDisplayOrder = updatedColumns.map((column) => ({
      categoryCode: column,
      newDisplayOrder: updatedColumns.indexOf(column) + 1,
    }));

    try {
      await updateColumnDisplayOrder(newDisplayOrder);
      toast.success("Column order updated", "bottomRight");
    } catch (error) {
      toast.error("Failed to update column order", "bottomRight");
      setColumns(columns); // Revert on error
    }
  };

  const handleTaskDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !activeTask) return;

    const overType = over.data.current?.type;
    const activeIndex = tasks.findIndex(
      (task) => task.todoId === activeTask.todoId,
    );

    let targetStatus: TodoStatus | undefined;
    let overIndex: number = activeIndex;
    let targetPosition: number = 1; // Default to first position

    if (overType === TYPE_TASK) {
      const overTask = over.data.current?.task as TodoDTO;
      targetStatus = getStatusByCode(overTask.status.statusCode);

      // Find position in target column
      const tasksInTargetColumn = tasks.filter(
        (t) => t.status.statusCode === overTask.status.statusCode,
      );
      targetPosition =
        tasksInTargetColumn.findIndex((t) => t.todoId === overTask.todoId) + 1; // Convert to 1-based index

      overIndex = tasks.findIndex((task) => task.todoId === overTask.todoId);
    } else if (overType === TYPE_COLUMN) {
      const overColumnStatus = over.id as StatusCode;
      targetStatus = getStatusByCode(overColumnStatus);

      // For column drops, add to the end of that column
      const tasksInTargetColumn = tasks.filter(
        (t) => t.status.statusCode === overColumnStatus,
      );
      targetPosition = tasksInTargetColumn.length + 1; // Add to end
      overIndex = tasks.length;
    }

    if (!targetStatus) {
      console.error("Invalid target status (null)");
      return;
    }

    const updatedTasks = [...tasks];
    updatedTasks.splice(activeIndex, 1);
    updatedTasks.splice(overIndex, 0, {
      ...activeTask,
      status: targetStatus,
      updatedAt: new Date(),
      sortIndex: calculateNewSortIndex(
        updatedTasks,
        targetStatus.statusCode,
        overIndex,
      ),
    });

    try {
      // If task moved to different column
      if (activeTask.status.statusCode !== targetStatus.statusCode) {
        await moveTask({
          todoId: activeTask.todoId,
          newSortIndex: targetPosition, // Use position instead of sort index
          categoryCode: targetStatus.statusCode,
        });
      } else {
        // Same column, just update sort index
        await updateTaskSortIndex({
          todoId: activeTask.todoId,
          newSortIndex: targetPosition,
          categoryCode: targetStatus.statusCode,
        });
      }

      // Only update state after successful API calls
      setTasks(updatedTasks);
      if (over.id === active.id) return;
      toast.success("Task moved successfully", "bottomRight");
    } catch (error) {
      console.error("Failed to update task", error);
      setTasks(tasks); // Revert on error
    }
  };

  const calculateNewSortIndex = (
    tasks: TodoDTO[],
    targetStatusCode: StatusCode,
    currentIndex: number,
  ): number => {
    // Filter tasks in the target column
    const columnTasks = tasks.filter(
      (t) => t.status.statusCode === targetStatusCode,
    );

    // If it's the first task in the column, start at 0
    if (columnTasks.length <= 1) return 0;

    // Determine surrounding tasks' sort indexes
    const prevTask = columnTasks[currentIndex - 1];
    const nextTask = columnTasks[currentIndex + 1];

    // If it's the first task, use half of the next task's sort index
    if (!prevTask) return nextTask.sortIndex / 2;

    // If it's the last task, use previous task's sort index + 1000
    if (!nextTask) return prevTask.sortIndex + 1000;

    // Otherwise, calculate middle sort index
    return (prevTask.sortIndex + nextTask.sortIndex) / 2;
  };

  if (!isMounted) return <SuspenseFallback fixed={false} />;

  return (
    <div>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        sensors={sensors}
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

              {activeTask && (
                <DraggableTask
                  task={activeTask}
                  language={userSettings.language}
                  isDragOverlay={true}
                />
              )}
            </DragOverlay>,
            document.body,
          )}
      </DndContext>
    </div>
  );
};
