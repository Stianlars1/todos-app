"use client";
import {UserSettingsDTO} from "@/app/actions/user/types";
import {DraggableCard} from "@/components/ui/cards/draggableCard/draggableCard";
import {useBrowserInfo} from "@/hooks/useBrowserInfo";
import {StatusCodes} from "@/types/todo/types";
import {TodoDTO} from "@/types/types";
import {Button} from "@stianlarsen/react-ui-kit";
import {useTranslations} from "next-intl";
import {useEffect, useMemo, useState} from "react";
import {DropHere} from "../components/dropHereWrapper/dropHere";
import taskWrapperStyles from "../css/taskwrapper.module.css";
import {TASKCARD_GROUP} from "../utils";
import {SortableContext} from "@dnd-kit/sortable";

const VISIBLE_TASKS = 4;

export const TaskCardWrapper = ({
  column,
  tasks,
  userSettings,
  draggableColumnEditActive,
}: {
  column: StatusCodes;
  tasks: TodoDTO[];
  userSettings: UserSettingsDTO | null;
  draggableColumnEditActive: boolean;
}) => {
  // States
  const { isMobile, isMobileSize } = useBrowserInfo();
  const [showHiddenTasks, setShowHiddenTasks] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  // Needed settings checks
  const isColumnLayout = !!userSettings?.isColumnLayout;
  const sortManual = !!userSettings?.sortManual;

  // texts
  const text = useTranslations("Taskboard.taskCard");

  // defining the tasksList
  const [taskList, setTaskList] = useState(
    userSettings?.limitTasks ? tasks.slice(0, VISIBLE_TASKS) : tasks,
  );

  const tasksIds = useMemo(
    () => taskList.map((task) => task.todoId),
    [taskList],
  );

  const handleShowHiddenTasks = () => {
    if (showHiddenTasks) {
      setTaskList(
        userSettings?.limitTasks ? tasks.slice(0, VISIBLE_TASKS) : tasks,
      );
    } else {
      setTaskList(tasks);
    }
    setShowHiddenTasks(!showHiddenTasks);
  };

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    const newTaskList =
      userSettings?.limitTasks && !showHiddenTasks
        ? tasks.slice(0, VISIBLE_TASKS)
        : tasks;
    setTaskList(newTaskList);
  }, [tasks, userSettings?.limitTasks, showHiddenTasks]);

  if (!hasHydrated) {
    return null;
  }

  return (
      <div
        suppressHydrationWarning={true}
        className={`${taskWrapperStyles.taskContainer} ${
          isColumnLayout
            ? taskWrapperStyles.taskContainerColumnLayout
            : taskWrapperStyles.taskContainerRowLayout
        } `}
      >
        <ul
          id={column}
          data-group={TASKCARD_GROUP}
          data-column-status={column}
          className={`${taskWrapperStyles.taskListWrapper} `}
        >
          <SortableContext items={tasksIds}>
            {taskList &&
              taskList.length > 0 &&
              taskList.map((task: TodoDTO) => (
                <DraggableCard
                  key={task.todoId}
                  task={task}
                  categoryCode={column}
                  userSettings={userSettings}
                  draggableColumnEditActive={draggableColumnEditActive}
                  isMobile={isMobile || isMobileSize}
                />
              ))}

            {taskList.length === 0 && <DropHere column={column} />}
            {tasks &&
              tasks.length > VISIBLE_TASKS &&
              (isMobile || isMobileSize || userSettings?.limitTasks) && (
                <Button
                  className={taskWrapperStyles.showMoreOrLessButton}
                  variant="link"
                  onClick={handleShowHiddenTasks}
                >
                  {showHiddenTasks ? text("showLess") : text("showMore")}
                </Button>
              )}
          </SortableContext>
        </ul>

        {/*{isDragging && <DroppableDelete isDragging={isDragging} />}*/}
      </div>
  );
};
