"use client";
import { moveTask, updateTaskSortIndex } from "@/app/actions/dragDrop/fetch";
import {
  MoveTaskProps,
  UpdateTaskSortIndexProps,
} from "@/app/actions/dragDrop/types";
import { UserSettingsDTO } from "@/app/actions/user/types";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import {
  DRAGGABLE_CARD_ID,
  DraggableCard,
} from "@/components/ui/cards/draggableCard/draggableCard";
import { toast } from "@/components/ui/toast/toast";
import { useBrowserInfo } from "@/hooks/useBrowserInfo";
import { StatusCodes } from "@/types/todo/types";
import { TodoDTO } from "@/types/types";
import {
  animations,
  handleDragoverNode,
  handleDragoverParent,
  handleDragstart,
  handleEnd,
  handleTouchOverNode,
  handleTouchOverParent,
  handleTouchmove,
  handleTouchstart,
  resetState,
  updateConfig,
} from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { Button } from "@stianlarsen/react-ui-kit";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { DropHere } from "../components/dropHere";
import taskWrapperStyles from "../css/taskwrapper.module.css";
import { DroppableDelete } from "../droppables/droppableDelete";
import {
  TASKCARD_GROUP,
  getNewCategoryCode,
  getNewTaskIndex,
  getOldTaskIndex,
  getTodoId,
} from "../utils";

const VISIBLE_TASKS = 4;

export const TaskCardWrapper = ({
  categoryCode,
  tasks,
  userSettings,
  draggableColumnEditActive,
}: {
  categoryCode: StatusCodes;
  tasks: TodoDTO[];
  userSettings: UserSettingsDTO | undefined;
  draggableColumnEditActive: boolean;
}) => {
  // States
  const { isMobile } = useBrowserInfo();
  const [isDragging, setIsDragging] = useState(false);
  const [showHiddenTasks, setShowHiddenTasks] = useState(false);
  const text = useTranslations("Taskboard.taskCard");

  // Needed settings checks
  const isColumnLayout = !!userSettings?.isColumnLayout;
  const sortManual = !!userSettings?.sortManual;

  // defining the tasksList
  const initialTasksList = tasks.slice(0, VISIBLE_TASKS);

  // only show first 5 tasks
  // The drag and drop hook-component
  const [parent, tasksList, setTaskList] = useDragAndDrop<
    HTMLUListElement,
    TodoDTO
  >(initialTasksList, {
    group: TASKCARD_GROUP,
    plugins: [animations()],
    name: TASKCARD_GROUP,
    sortable: true,
    draggingClass: "dragging",
    touchDraggingClass: "dragging",
    dragHandle:
      !isColumnLayout && sortManual
        ? ".reveal-card-sort-manual-row-layout-handle"
        : isMobile && sortManual
        ? ".reveal-card-sort-manual-row-layout-handle"
        : undefined,

    draggable: (el) => {
      return (
        el.attributes.getNamedItem("data-group")?.value == TASKCARD_GROUP &&
        sortManual
      );
    },

    // dragHandle: ".reveal-card",
    handleDragstart: (data) => {
      if (!parent.current) return;
      handleDragstart(data);

      if (data.e.dataTransfer?.dropEffect === "move") {
        setIsDragging(true);
      }
    },
    longTouch: true,
    handleTouchstart: (data) => {
      if (isMobile && sortManual) {
        if (data.e.target instanceof HTMLElement) {
          if (data.e.target.id !== DRAGGABLE_CARD_ID) {
            return;
          }
        }
      }
      return handleTouchstart(data);
    },

    handleDragoverNode: async (data) => {
      return handleDragoverNode(data);
    },
    handleTouchOverNode: async (data) => {
      return handleTouchOverNode(data);
    },

    handleTouchOverParent: async (data) => {
      return handleTouchOverParent(data);
    },
    handleTouchmove: async (data) => {
      return handleTouchmove(data);
    },
    handleDragoverParent: (data) => {
      return handleDragoverParent(data);
    },

    handleEnd: async (data) => {
      if (isMobile && sortManual) {
        if (data.e.target instanceof HTMLElement) {
          if (data.e.target.id !== DRAGGABLE_CARD_ID) {
            return;
          }
        }
      }
      handleEnd(data);
      setIsDragging(false);
      const newCategoryCode = getNewCategoryCode(data);
      const oldIndex = getOldTaskIndex(tasks, data);
      const newIndex = getNewTaskIndex(data);
      if (newCategoryCode === categoryCode && oldIndex === newIndex) {
        return;
      }
      // UPDATE THE TASK SORT INDEX WITHIN SAME COLUMN / STATUS
      if (newCategoryCode === categoryCode) {
        const todoId = getTodoId(data);
        const newSortIndex = getNewTaskIndex(data);
        const updatedTask: UpdateTaskSortIndexProps = {
          todoId,
          newSortIndex: newSortIndex + 1,
          categoryCode,
        };
        const response = await updateTaskSortIndex(updatedTask);

        if (response.isError) {
          console.error("❌ Error updating task sort index");
          return;
        }
        if (response.isSuccess) {
          // Toast message=?¿?
          await cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });
          await cacheInvalidate({ cacheKey: CacheKeys.ALL_TODOS });

          toast.success("Task was updated successfully", "bottomRight");

          return;
        }
      }
      // DELETE / MOVE TO DELETE
      else if (newCategoryCode === "DELETED") {
        // Earlier i deleted it, but i want a scurity net. so we now move it to deleted status instead
        // Then the user can delete it from there if they want
        // const deleteResponse = await deleteTask(getTodoId(data));
        const todoId = getTodoId(data);
        const deleteResponse = await moveTask({
          categoryCode: newCategoryCode,
          newSortIndex: 1,
          todoId,
        });
        if (deleteResponse.isError) {
          toast.error("Error deleting task", "bottomRight");
          return;
        }

        if (deleteResponse.isSuccess) {
          await cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });
          await cacheInvalidate({ cacheKey: CacheKeys.ALL_TODOS });

          toast.success("Task was deleted successfully", "bottomRight");

          return;
        }
      }
      // MOVE THE TASK to the new status (category)
      else {
        const todoId = getTodoId(data);
        const newSortIndex = getNewTaskIndex(data);

        const moveRequest: MoveTaskProps = {
          todoId: todoId,
          categoryCode: newCategoryCode,
          newSortIndex: newSortIndex + 1,
        };

        const moveResponse = await moveTask(moveRequest);
        if (moveResponse.isError) {
          console.error("❌ Error updating task sort index");
          return;
        }
        if (moveResponse.isSuccess) {
          // Toast message=?¿?
          await cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });
          await cacheInvalidate({ cacheKey: CacheKeys.ALL_TODOS });

          toast.success("Task was moved successfully", "bottomRight");

          return;
        }
      }

      return;
    },
  });

  useEffect(() => {
    if (tasks) {
      if (showHiddenTasks) {
        setTaskList(tasks);
      } else {
        setTaskList(tasks.slice(0, VISIBLE_TASKS));
      }

      resetState();
    }
  }, [tasks]);

  useEffect(() => {
    if (isMobile) {
      if (parent.current) {
        updateConfig(parent.current, {
          dragHandle: ".reveal-card-sort-manual-row-layout-handle",
        });
      }

      if (showHiddenTasks) {
        setTaskList(tasks);
      } else {
        setTaskList(tasks.slice(0, VISIBLE_TASKS));
      }
      resetState();
    }
  }, [isMobile]);

  const deleteTaskFromTasklist = (idToRemove: number) => {
    setTaskList(tasks.filter((task: TodoDTO) => task.todoId !== idToRemove));
    resetState();
  };

  const resetTaskList = () => {
    if (showHiddenTasks) {
      setTaskList(tasks);
    } else {
      setTaskList(tasks.slice(0, VISIBLE_TASKS));
    }
    resetState();
  };

  const handleShowHiddenTasks = () => {
    setTaskList(showHiddenTasks ? tasks.slice(0, VISIBLE_TASKS) : tasks);
    setShowHiddenTasks(!showHiddenTasks);
    resetState();
    // closing, scroll into view
    if (showHiddenTasks) {
      const el = document.getElementById(categoryCode);
      const body = document.body;
      if (el && body) {
        body.scrollBy({
          top: el.getBoundingClientRect().top - 150,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <>
      <div
        suppressHydrationWarning={true}
        className={`${taskWrapperStyles.taskContainer} `}
      >
        <ul
          id={categoryCode}
          ref={parent}
          data-group={TASKCARD_GROUP}
          data-column-status={categoryCode}
          className={`${taskWrapperStyles.taskListWrapper} `}
        >
          {tasksList &&
            tasksList.length > 0 &&
            tasksList.map((task: TodoDTO) => (
              <DraggableCard
                key={task.todoId}
                task={task}
                categoryCode={categoryCode}
                userSettings={userSettings}
                draggableColumnEditActive={draggableColumnEditActive}
                deleteTaskFromTasklist={deleteTaskFromTasklist}
                resetTaskList={resetTaskList}
              />
            ))}

          {tasksList.length === 0 && <DropHere />}
        </ul>

        {tasks && tasks.length > VISIBLE_TASKS && (
          <Button
            className={taskWrapperStyles.showMoreOrLessButton}
            variant="link"
            onClick={handleShowHiddenTasks}
          >
            {showHiddenTasks ? text("showLess") : text("showMore")}
          </Button>
        )}
        {isDragging && <DroppableDelete isDragging={isDragging} />}
      </div>
    </>
  );
};
