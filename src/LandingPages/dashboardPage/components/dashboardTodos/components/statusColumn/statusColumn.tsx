"use client";
import { determineStatusBasedOnDropZone } from "@/LandingPages/dashboardPage/utils";
import { updateTodo } from "@/app/actions/todos/fetch";
import { TodoDropType, UpdatedTodoDTO } from "@/app/actions/todos/types";
import { UserSettingsDTO } from "@/app/actions/user/types";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { RevealCard } from "@/components/ui/cards/revealCard/revealCard";
import { StatusCodes } from "@/types/todo/types";
import { TodoDTO } from "@/types/types";
import { DragEvent, useState } from "react";
import { StatusColumnSortButton } from "./components/statusColumnSortButton/statusColumnSortButton";
import "./css/statusColumn.css";
import { getCategoryDisplaySettings } from "./utils";

export const StatusColumn = ({
  categoryString,
  todosList,
  userSettings,
  headerTitle,
}: {
  categoryString: StatusCodes;
  todosList: TodoDTO[];
  userSettings: UserSettingsDTO | null;
  headerTitle: string;
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleDragOver = (event: DragEvent<HTMLUListElement>) => {
    event.preventDefault(); // Necessary to allow dropping
  };

  const handleDragEnter = (event: DragEvent<HTMLUListElement>) => {
    event.preventDefault(); // Necessary to allow dropping
    setIsActive(true); // Activate this column as a drop target
  };

  const handleDragLeave = (event: DragEvent<HTMLUListElement>) => {
    setIsActive(false); // Deactivate this column as a drop target
  };

  const handleDrop = async (event: DragEvent<HTMLUListElement>) => {
    event.preventDefault();
    setIsActive(false); // Reset on drop

    // The data from the grabbed todo
    const todoData = event.dataTransfer.getData("application/json");
    const todo: TodoDropType = JSON.parse(todoData); // Deserialize the todo data

    // determine the new status we are going to change to based on the drop zone
    const newStatuses = determineStatusBasedOnDropZone(event);
    if (!newStatuses) return;
    const updatedStatusObject = {
      statusId: newStatuses.statusId,
    } as UpdatedTodoDTO;
    // Call API to update status

    // check if new status is the same as old status to prevent unneccessary updated
    if (todo.statusCode === newStatuses.statusCode) {
      return;
    }
    const updateResponse = await updateTodo(todo.todoId, updatedStatusObject);

    if (updateResponse.isSuccess) {
      // cache invalidate to update UI in background
      cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });
    }
  };

  const columnDisplaySettings = getCategoryDisplaySettings(categoryString); // this may be removed cause we now handle this a level up

  if (!columnDisplaySettings.render) return null;

  return (
    <div className="status-column-container">
      <h2 className="status-column-container__title">
        {/* {columnDisplaySettings.title} */}
        {headerTitle}
      </h2>

      {/* ==  Render sort button  ==  */}
      {userSettings && categoryString && (
        <StatusColumnSortButton
          categoryString={categoryString}
          userSettings={userSettings}
        />
      )}
      <ul
        key={categoryString}
        className={`status-column-container__ul ${
          isActive ? "status-column-container__ul-active" : ""
        }`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        data-category={categoryString}
      >
        {todosList &&
          todosList.map((todo: TodoDTO) => (
            <RevealCard
              className={"status-column-container__ul__reveal-card"}
              key={todo.todoId}
              title={todo.title}
              description={todo?.description}
              content={todo?.content}
              priority={todo?.priority}
              tags={todo?.tags || [""]}
              todoId={todo.todoId}
              statusCode={todo.status.statusCode}
            />
          ))}
      </ul>
    </div>
  );
};
