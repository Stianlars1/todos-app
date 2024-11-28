"use client";
import {StatusCodes} from "@/types/todo/types";
import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    horizontalListSortingStrategy,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {UserSettingsDTO} from "@/app/actions/user/types";
import {TodoDTO} from "@/types/types";
import {DraggableColumn} from "@/LandingPages/dashboardPage/components/taskboard/draggables/draggableColumn";
import columnWrapper from "../css/columnWrapper.module.css";
import {
    COLUMN_GROUP,
    handleUpdateColumnsOrder,
    TYPE_COLUMN,
    TYPE_TASK,
} from "@/LandingPages/dashboardPage/components/taskboard/utils";
import {useEffect, useMemo, useState} from "react";
import {toast} from "@/components/ui/toast/toast";
import {cacheInvalidate} from "@/app/lib/cache/cache";
import {CacheKeys} from "@/app/lib/cache/keys";
import {createPortal} from "react-dom";
import {DraggableCard} from "@/components/ui/cards/draggableCard/draggableCard";

export const TaskboardWrapper = ({
  columns,
  tasks,
  userSettings,
  categorizedTexts,
}: {
  columns: StatusCodes[];
  tasks: TodoDTO[];
  userSettings: UserSettingsDTO | null;
  categorizedTexts: { [key in StatusCodes]: string };
}) => {
  const [columnsList, setColumnsList] = useState<StatusCodes[]>(columns);
  const [tasksList, setTasksList] = useState<TodoDTO[]>(tasks);
  const columnsIds = useMemo(() => columns.map((column) => column), [columns]);
  const [activeColumn, setActiveColumn] = useState<StatusCodes | null>(null);
  const [activeTask, setActiveTask] = useState<TodoDTO | null>(null);
  const isColumnLayout = userSettings?.isColumnLayout;

  useEffect(() => {
    console.log("==useEffect run for columns");
    setColumnsList(columns);
  }, [columns]);

  useEffect(() => {
    console.log("==useEffect run for tasks");
    setTasksList(tasks);
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
        delay: 250,
        tolerance: 5,
      },
    }),
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over, activatorEvent } = event;

    const isColumnDrag = active.data.current?.type === TYPE_COLUMN;
    const isTaskDrag = active.data.current?.type === TYPE_TASK;
    // reset active
    setActiveColumn(null);
    setActiveTask(null);

    if (isColumnDrag) {
      if (!over) return;
      const draggedColumn = active.id;
      const overColumn = over.id;

      if (draggedColumn === overColumn) return;

      // calculate new order of columns
      const draggedColumnIndex = columnsList.findIndex(
        (col) => col === draggedColumn,
      );
      const overColumnIndex = columnsList.findIndex(
        (col) => col === overColumn,
      );

      const newColumnsArray = arrayMove(
        columnsList,
        draggedColumnIndex,
        overColumnIndex,
      );

      setColumnsList(newColumnsArray);

      // save the new displayOrder of the columns
      try {
        const columnsUpdateResponse =
          await handleUpdateColumnsOrder(newColumnsArray);
        if (columnsUpdateResponse.isError) {
          toast.error(
            "An error occured while updating the sort preference of the status columns",
          );
        }
        await cacheInvalidate({ cacheKey: CacheKeys.USER_PREFERENCES });
        await cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });
        await cacheInvalidate({ cacheKey: CacheKeys.ALL_TAGS });

        toast.success("Column was updated successfully", "bottomRight");
      } catch {
        toast.error(
          "An error occured while updating the sort preference of the status columns",
        );
      }
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    console.log("Drag started", event);
    const { active } = event;
    const activeDragType = active.data.current?.type;
    const isColumnDrag = activeDragType === TYPE_COLUMN;
    const isTaskDrag = activeDragType === TYPE_TASK;
    if (!isColumnDrag && !isTaskDrag) return;

    if (isColumnDrag) {
      console.log("Column drag started");
      const columnObject = active.data.current?.columnObject;
      setActiveColumn(columnObject);
    }

    if (isTaskDrag) {
      console.log("Task drag started");
      const taskObject = active.data.current?.taskObject;
      setActiveTask(taskObject);
    }
  };

  return (
    <DndContext
      {...sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <SortableContext
        strategy={
          userSettings?.isColumnLayout
            ? horizontalListSortingStrategy
            : verticalListSortingStrategy
        }
        items={columnsIds}
      >
        <ul
          className={`${columnWrapper.columnWrapper} ${COLUMN_GROUP} ${
            isColumnLayout
              ? columnWrapper.columnLayout
              : columnWrapper.rowLayout
          }`}
        >
          {columnsList.map((column, index: number) => (
            <DraggableColumn
              key={column}
              tasks={tasksList.filter(
                (task) => task.status.statusCode === column,
              )}
              column={column}
              userSettings={userSettings}
              title={categorizedTexts[column]}
            />
          ))}
        </ul>
      </SortableContext>

      {typeof window !== "undefined" && (activeColumn || activeTask) && (
        <>
          {activeColumn &&
            createPortal(
              <DragOverlay>
                {activeColumn && (
                  <DraggableColumn
                    key={activeColumn}
                    tasks={tasksList.filter(
                      (task) => task.status.statusCode === activeColumn,
                    )}
                    column={activeColumn}
                    userSettings={userSettings}
                    title={categorizedTexts[activeColumn]}
                  />
                )}
              </DragOverlay>,
              document.body,
            )}

          {activeTask &&
            createPortal(
              <DragOverlay>
                {activeTask && (
                  <DraggableCard
                    task={activeTask}
                    categoryCode={activeTask.status.statusCode}
                  />
                )}
              </DragOverlay>,
              document.body,
            )}
        </>
      )}
    </DndContext>
  );
};
