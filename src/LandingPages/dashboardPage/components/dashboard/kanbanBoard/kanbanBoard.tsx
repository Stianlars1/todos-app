"use client";
import { UserSettings } from "@/app/actions/user/types";
import { ColumnsAndTasks } from "@/types/todo";
import styles from "./taskboard.module.css";
import responsiveStyles from "./responsiveStyles.module.css";
import { TYPE_COLUMN, TYPE_TASK } from "./utils";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  MouseSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core/dist/types";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
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
import {
  LOCAL_STORAGE_COLUMN_IN_VIEW_ID,
  useColumnInView,
} from "@/LandingPages/dashboardPage/components/dashboard/kanbanBoard/hooks/useColumnInView";
import { IconChevron } from "@/components/ui/icons/icons";
import { useColumnsAndTasks } from "@/LandingPages/dashboardPage/components/dashboard/kanbanBoard/context/columnsAndTasksContext";

export const KanbanBoard = ({
  userSettings,
  columnsAndTasks,
}: {
  userSettings: UserSettings;
  columnsAndTasks: ColumnsAndTasks;
}) => {
  const {
    columns,
    tasks,
    setTasks,
    setColumns,
    activeColumn,
    setActiveColumn,
    columnsIds,
    originalTasks,
    setOriginalTasks,
    setActiveTask,
    activeTask,
    setActiveDashboardId,
  } = useColumnsAndTasks();
  const { isMobile, isMobileSize } = useBrowserInfo();
  const isNative = isMobileSize || isMobile;
  const categorizedTexts = useColumnHeadersTexts();
  const [isMounted, setIsMounted] = useState(false);

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

    if (LOCAL_STORAGE_COLUMN_IN_VIEW_ID in localStorage) {
      console.log("Column in view found in local storage");
      const columnInViewId = localStorage.getItem(
        LOCAL_STORAGE_COLUMN_IN_VIEW_ID,
      );
      if (columnInViewId) {
        console.log("Scrolling to column in view", columnInViewId);
        document.getElementById(columnInViewId)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center", // start // nearest?
        });
      }
    }

    if (userSettings.activeDashboardId) {
      setActiveDashboardId(userSettings.activeDashboardId);
    }
  }, []);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8, // For desktop, this is fine
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      // Require longer press + movement for touch devices
      delay: 250, // Start with a delay
      tolerance: 5, // Allow small unintentional movements during delay
      distance: 15, // Then require significant movement
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
    if (!over) return;

    const isMobileViewport =
      (typeof window !== "undefined" && window.innerWidth <= 600) || isMobile;

    // Handle column drag
    if (active.data.current?.type === TYPE_COLUMN) {
      const activeColumnId = active.data.current.column;
      const overData = over.data.current;

      // Determine target column id based on what we're dragging over
      const targetColumnId =
        overData?.type === TYPE_TASK
          ? (overData.task as TodoDTO).status.statusCode
          : (over.id as StatusCode);

      // Skip if trying to drop on itself
      if (activeColumnId === targetColumnId) {
        return;
      }

      const activeIndex = columns.findIndex((col) => col === activeColumnId);
      const targetIndex = columns.findIndex((col) => col === targetColumnId);

      // Validate indexes
      if (activeIndex === -1 || targetIndex === -1) {
        console.warn("Invalid column indexes:", { activeIndex, targetIndex });
        return;
      }

      setColumns(arrayMove(columns, activeIndex, targetIndex));

      // Handle mobile scrolling
      if (isMobileViewport) {
        requestAnimationFrame(() => {
          const columnElement = document.getElementById(activeColumnId);
          if (columnElement) {
            columnElement.scrollTo({
              behavior: "auto",
              left: columnElement.offsetLeft,
            });
          }
        });
      }
    }

    // Handle task drag
    if (active.data.current?.type === TYPE_TASK) {
      const activeTask = active.data.current.task as TodoDTO;
      const overType = over.data.current?.type;

      // Handle dragging over a column
      if (overType === TYPE_COLUMN) {
        const targetColumnStatus = over.id as StatusCode;

        setTasks((currentTasks) => {
          const activeIndex = currentTasks.findIndex(
            (task) => task.todoId === activeTask.todoId,
          );

          if (activeIndex === -1) return currentTasks;

          const updatedTask = {
            ...currentTasks[activeIndex],
            status: getStatusByCode(targetColumnStatus),
          };

          const newTasks = [...currentTasks];
          newTasks[activeIndex] = updatedTask;
          return newTasks;
        });

        // Handle mobile scrolling for tasks
        if (isMobileViewport) {
          requestAnimationFrame(() => {
            const taskElement = document.getElementById(
              activeTask.todoId.toString(),
            );
            if (taskElement) {
              taskElement.scrollTo({
                behavior: "auto",
                left: taskElement.offsetLeft,
              });
            }
          });
        }
      }

      // Handle dragging over another task
      if (overType === TYPE_TASK) {
        const overTask = over.data.current?.task as TodoDTO;

        setTasks((currentTasks) => {
          const activeIndex = currentTasks.findIndex(
            (task) => task.todoId === activeTask.todoId,
          );
          const overIndex = currentTasks.findIndex(
            (task) => task.todoId === overTask.todoId,
          );

          if (activeIndex === -1 || overIndex === -1) return currentTasks;

          // Moving to a different column
          if (activeTask.status.statusCode !== overTask.status.statusCode) {
            const updatedTask = {
              ...currentTasks[activeIndex],
              status: getStatusByCode(overTask.status.statusCode),
            };

            const newTasks = currentTasks.filter(
              (task) => task.todoId !== activeTask.todoId,
            );
            newTasks.splice(overIndex, 0, updatedTask);
            return newTasks;
          }

          // Reordering within the same column
          return arrayMove(currentTasks, activeIndex, overIndex);
        });
      }
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
          `Failed to update task: ${(error as Error).message}`,
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
          `Failed to update task: ${(error as Error).message}`,
          "bottomRight",
        );
        setTasks(originalTasks);
      }
    }

    if (isNative) {
      const taskElement = document.getElementById(activeTask.todoId.toString());
      taskElement?.scrollIntoView({ behavior: "auto" });
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

            {activeTask && <DraggableTask task={activeTask} isDragOverlay />}
          </DragOverlay>,
          document.body,
        )}
    </DndContext>
  );
};
