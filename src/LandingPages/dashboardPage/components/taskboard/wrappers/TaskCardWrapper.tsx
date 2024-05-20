"use client";
import { moveTask, updateTaskSortIndex } from "@/app/actions/dragDrop/fetch";
import {
  MoveTaskProps,
  UpdateTaskSortIndexProps,
} from "@/app/actions/dragDrop/types";
import { UserSettingsDTO } from "@/app/actions/user/types";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { DraggableCard } from "@/components/ui/cards/draggableCard/draggableCard";
import { toast } from "@/components/ui/toast/toast";
import { StatusCodes } from "@/types/todo/types";
import { TodoDTO } from "@/types/types";
import {
  animations,
  handleDragoverNode,
  handleDragoverParent,
  handleDragstart,
  resetState,
} from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { Button } from "@stianlarsen/react-ui-kit";
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

const VISIBLE_TASKS = 3;
export const TaskCardWrapper = ({
  categoryCode,
  tasks,
  userSettings,
}: {
  categoryCode: StatusCodes;
  tasks: TodoDTO[];
  userSettings: UserSettingsDTO | undefined;
}) => {
  // States
  const [isDragging, setIsDragging] = useState(false);
  const [showHiddenTasks, setShowHiddenTasks] = useState(false);

  // Needed settings checks
  const isColumnLayout = !!userSettings?.isColumnLayout;
  const sortManual = !!userSettings?.sortManual;

  // defining the tasksList
  const initialTasksList = isColumnLayout
    ? tasks
    : tasks.slice(0, VISIBLE_TASKS);
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
      console.log("\n\n🛜 handleDragstart", data);
      console.log("\n\n🛜 handleDragstart", data.e.dataTransfer?.dropEffect);

      if (data.e.dataTransfer?.dropEffect === "move") {
        setIsDragging(true);
      }
    },
    handleDragoverNode: async (data) => {
      return handleDragoverNode(data);
    },

    handleDragoverParent: (data) => {
      return handleDragoverParent(data);
    },
    handleEnd: async (data) => {
      console.log("\n\n\n\n🛜 handleEnd", data);
      setIsDragging(false);
      const newCategoryCode = getNewCategoryCode(data);
      const oldIndex = getOldTaskIndex(tasks, data);
      const newIndex = getNewTaskIndex(data);
      if (newCategoryCode === categoryCode && oldIndex === newIndex) {
        toast.info("No changes detected", "bottomRight");
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
        console.log("\n\n\n\n🛜 handleEnd", deleteResponse);
        if (deleteResponse.isError) {
          toast.error("Error deleting task", "bottomRight");
          return;
        }

        if (deleteResponse.isSuccess) {
          await cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });
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
          toast.success("Task was moved successfully", "bottomRight");

          return;
        }
      }

      return;
    },
  });

  useEffect(() => {
    if (tasks) {
      if (isColumnLayout) {
        setTaskList(tasks);
      } else {
        if (showHiddenTasks) {
          setTaskList(tasks);
        } else {
          setTaskList(tasks.slice(0, VISIBLE_TASKS));
        }
      }

      resetState();
    }
  }, [tasks]);

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
      <div className={`${taskWrapperStyles.taskContainer} `}>
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
              />
            ))}

          {tasksList.length === 0 && <DropHere />}
        </ul>

        {!isColumnLayout && tasks.length > 5 && (
          <Button
            className={taskWrapperStyles.showMoreOrLessButton}
            variant="link"
            onClick={handleShowHiddenTasks}
          >
            {showHiddenTasks ? "Show less" : "Show all"}
          </Button>
        )}
        {isDragging && <DroppableDelete isDragging={isDragging} />}
      </div>
    </>
  );
};