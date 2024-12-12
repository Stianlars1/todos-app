"use client";
import { UserSettings } from "@/app/actions/user/types";
import { ColumnsAndTasks } from "@/types/todo/types";
import styles from "./taskboard.module.css";
import responsiveStyles from "./responsiveStyles.module.css";
import { TYPE_COLUMN, TYPE_TASK } from "./utils";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  pointerWithin,
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
import { cx, getStatusByCode } from "@/utils/utils";
import {
  moveTask,
  updateColumnDisplayOrder,
  updateTaskSortIndex,
} from "@/app/actions/dragDrop/fetch";
import { toast } from "@/components/ui/toast/toast";
import { SuspenseFallback } from "@/components/ui/suspenseFallback/suspenseFallback";
import { useColumnHeadersTexts } from "@/LandingPages/dashboardPage/components/dashboard/utils";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { useBrowserInfo } from "@/hooks/useBrowserInfo";
import { Props } from "@dnd-kit/core/dist/components/DndContext/DndContext";
import { useColumnInView } from "@/LandingPages/dashboardPage/components/dashboard/kanbanBoard/hooks/useColumnInView";
import { IconChevron } from "@/components/ui/icons/icons";

type ActiveTaskState = TodoDTO & {
  originalIndex: number;
  originalPosition: number;
};

export const KanbanBoard = ({
  userSettings,
  columnsAndTasks,
}: {
  userSettings: UserSettings;
  columnsAndTasks: ColumnsAndTasks;
}) => {
  const { isMobile, isMobileSize } = useBrowserInfo();
  const isNative = isMobileSize || isMobile;
  const categorizedTexts = useColumnHeadersTexts();
  const [isMounted, setIsMounted] = useState(false);

  const [originalTasks, setOriginalTasks] = useState<TodoDTO[]>([]);

  const [columns, setColumns] = useState<StatusCode[]>(
    columnsAndTasks.columns.map((col) => col.statusCode),
  );
  const columnsIds = useMemo(() => columns.map((col) => col), [columns]);
  const [activeColumn, setActiveColumn] = useState<StatusCode | null>(null);

  const [tasks, setTasks] = useState<TodoDTO[]>(columnsAndTasks.tasks);
  const [activeTask, setActiveTask] = useState<ActiveTaskState | null>(null);

  const { columnInViewIndex } = useColumnInView(columns, isNative);

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

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 3, // Increase this to prevent accidental drags
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 100, // Add a small delay for touch
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

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
      const task = active.data.current?.task as TodoDTO;
      const originalIndex = tasks.findIndex((t) => t.todoId === task.todoId);
      const originalPosition =
        tasks
          .filter((t) => t.status.statusCode === task.status.statusCode)
          .findIndex((t) => t.todoId === task.todoId) + 1;

      setActiveTask({
        ...task,
        originalIndex,
        originalPosition,
      });
      setOriginalTasks([...tasks]);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    console.log("\n\n== handleDragOver ==", event);
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 600;
    // Handle column drag
    if (active.data.current?.type === TYPE_COLUMN && over) {
      const activeColumnId = active.data.current.column;
      const overData = over.data.current;

      let targetColumnId;

      // Get the column id depending on whether we're over a column or task
      if (overData?.type === TYPE_TASK) {
        const task = overData.task as TodoDTO;
        targetColumnId = task.status.statusCode;
      } else {
        targetColumnId = over.id as StatusCode;
      }

      // Add this check to prevent unnecessary updates
      if (activeColumnId === targetColumnId) {
        return;
      }

      const oldIndex = columns.indexOf(activeColumnId);
      const newIndex = columns.indexOf(targetColumnId);

      // Add additional validation
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
        return;
      }

      // Create new columns array immutably
      const newColumns = arrayMove(columns, oldIndex, newIndex);

      // Only update if the order actually changed
      if (newColumns.some((col, i) => col !== columns[i])) {
        setColumns(newColumns);
      }

      // Only scroll into view on mobile
      if (isMobile) {
        const activeColumnElement = document.getElementById(activeColumnId);
        activeColumnElement?.scrollTo({
          behavior: "auto",
          left: activeColumnElement.offsetLeft,
        });
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

      // Only scroll into view on mobile
      if (isMobile) {
        const activeTaskElement = document.getElementById(
          activeTask.todoId.toString(),
        );
        activeTaskElement?.scrollTo({
          behavior: "auto",
          left: activeTaskElement.offsetLeft,
        });
      }
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

    const columnElement = document.getElementById(active.data.current?.column);
    columnElement?.scrollIntoView({ behavior: "smooth" });
    const originalColumns = columnsAndTasks.columns.map(
      (col) => col.statusCode,
    );

    const oldIndex = originalColumns.findIndex(
      (col) => col === active.data.current?.column,
    );

    const newIndex = columns.findIndex((col) => col === over.id);
    if (oldIndex === newIndex) {
      return;
    } // because we change the order on drag over instead, so the drop placement is correct

    const newDisplayOrder = columns.map((column) => ({
      categoryCode: column,
      newDisplayOrder: columns.indexOf(column) + 1,
    }));

    try {
      await updateColumnDisplayOrder(newDisplayOrder);
      await cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });
      toast.success("Column order updated", "bottomRight");
    } catch (error) {
      console.error("Failed to update column order", error);
      toast.error("Failed to update column order", "bottomRight");
      setColumns(originalColumns); // Revert on error
    }
  };
  const handleTaskDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !activeTask) return;

    if (isNative) {
      const taskElement = document.getElementById(activeTask.todoId.toString());
      taskElement?.scrollIntoView({ behavior: "auto" });
    }

    const isDroppingInSameColumn =
      activeTask.status.statusCode ===
      active.data.current?.task.status.statusCode;
    let targetStatus: TodoStatus | undefined;

    if (isDroppingInSameColumn) {
      const overTask = over.data.current?.task as TodoDTO;
      const targetStatus = getStatusByCode(overTask.status.statusCode);

      // Get current column tasks in visual order
      const currentColumnTasks = tasks.filter(
        (t) => t.status.statusCode === targetStatus.statusCode,
      );

      // Get original column tasks
      const originalColumnTasks = originalTasks.filter(
        (t) => t.status.statusCode === targetStatus.statusCode,
      );

      // Instead of calculating new sortIndex, let's use the visual position (1-based)
      const newPosition =
        currentColumnTasks.findIndex((t) => t.todoId === activeTask.todoId) + 1;
      const oldPosition =
        originalColumnTasks.findIndex((t) => t.todoId === activeTask.todoId) +
        1;

      // Only update if position actually changed
      if (newPosition === oldPosition) {
        console.info("Position unchanged, skipping update");
        return;
      }

      try {
        await updateTaskSortIndex({
          todoId: activeTask.todoId,
          newSortIndex: newPosition,
          categoryCode: targetStatus.statusCode,
          activeDashboardId: userSettings.activeDashboardId,
        });

        // After successful update, we could refresh the data to get the new sort indices
        // This depends on your app's architecture, but you might want to add:
        // await refetchTasks(); or similar

        toast.success("Task moved successfully", "bottomRight");
      } catch (error) {
        console.error("Failed to update task", error);
        toast.error(
          "Failed to update task: " + (error as Error).message,
          "bottomRight",
        );
        setTasks(originalTasks);
      }
    }

    // if dragging over a column
    else {
      const overColumnStatus = over.data.current?.task.status
        .statusCode as StatusCode;
      targetStatus = getStatusByCode(overColumnStatus);

      // For column drops, add to the dropped position
      const tasksInTargetColumn = tasks.filter(
        (t) => t.status.statusCode === overColumnStatus,
      );

      const targetPosition = tasksInTargetColumn.findIndex(
        (t) => t.todoId === over.data.current?.task.todoId,
      );

      try {
        // If task moved to different column
        await moveTask({
          todoId: activeTask.todoId,
          newSortIndex: targetPosition + 1,
          categoryCode: targetStatus.statusCode,
          activeDashboardId: userSettings.activeDashboardId,
        });
        toast.success("Task moved successfully", "bottomRight");
      } catch (error) {
        console.error("Failed to update task", error);
        toast.error(
          "Failed to update task: " + (error as Error).message,
          "bottomRight",
        );
        setTasks(originalTasks);
      }
    }
  };

  if (!isMounted) return <SuspenseFallback fixed={false} />;

  const dndContextOptions: Props =
    isMobileSize || isMobile
      ? {
          autoScroll: {
            acceleration: 300,
          },
          collisionDetection: pointerWithin,
        }
      : { collisionDetection: closestCorners };

  const handleNativeColumnPagination = (direction: "left" | "right") => {
    const convertedIndex = columnInViewIndex - 1;
    if (direction === "left") {
      if (columnInViewIndex === 1) {
        return;
      }
      document.getElementById(columns[convertedIndex - 1])?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    } else {
      if (columnInViewIndex === columns.length) {
        return;
      }
      document.getElementById(columns[convertedIndex + 1])?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest", // start // nearest?
      });
    }
  };

  return (
    <div>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        sensors={sensors}
        {...dndContextOptions}
      >
        <SortableContext items={columnsIds}>
          <div
            id="taskboard"
            className={cx(styles.taskboard, responsiveStyles.taskboard)}
          >
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
          {isNative && (
            <>
              <div className={responsiveStyles.columnPagination}>
                <button
                  className={responsiveStyles.paginationButtons}
                  onClick={() => handleNativeColumnPagination("left")}
                >
                  <IconChevron
                    className={cx(
                      responsiveStyles.chevron,
                      responsiveStyles.chevronLeft,
                    )}
                  />
                </button>
                <div className={responsiveStyles.paginationInfo}>
                  <p className={responsiveStyles.indexes}>
                    {columnInViewIndex} / {columns.length}
                  </p>
                  <p className={responsiveStyles.currentColumnInView}>
                    {columns[columnInViewIndex - 1]}
                  </p>
                </div>
                <button
                  className={responsiveStyles.paginationButtons}
                  onClick={() => handleNativeColumnPagination("right")}
                >
                  <IconChevron
                    className={cx(
                      responsiveStyles.chevron,
                      responsiveStyles.chevronRight,
                    )}
                  />
                </button>
              </div>
            </>
          )}
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
                <DraggableTask task={activeTask} isDragOverlay={true} />
              )}
            </DragOverlay>,
            document.body,
          )}
      </DndContext>
    </div>
  );
};
