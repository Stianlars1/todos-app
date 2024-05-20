"use client";
import { DragDropIcon } from "@/components/ui/icons/icons";

import { UserSettingsDTO } from "@/app/actions/user/types";
import { Button } from "@stianlarsen/react-ui-kit";
import { StatusColumnSortButton } from "../../dashboardTodos/components/statusColumn/components/statusColumnSortButton/statusColumnSortButton";
import draggableColumn from "../css/draggableColumn.module.css";
import { ColumnListDND } from "../types";
import { COLUMN_GROUP } from "../utils";
import { TaskCardWrapper } from "../wrappers/TaskCardWrapper";
export const DraggableColumn = ({
  columnObject,
  title,
  userSettings,
}: {
  columnObject: ColumnListDND;
  title: string;
  userSettings: UserSettingsDTO | undefined;
}) => {
  const showSortButton =
    userSettings?.sortManual !== undefined && !userSettings.sortManual;
  return (
    <>
      <li
        className={`${draggableColumn.column} ${COLUMN_GROUP}`}
        key={columnObject.column}
        data-group={COLUMN_GROUP}
        data-label={columnObject.column}
      >
        <header id="no-drag" className={draggableColumn.header}>
          <h2 className={draggableColumn.headerTitle}>{title}</h2>
          <div className={draggableColumn.headerButtons}>
            {showSortButton && (
              <StatusColumnSortButton
                categoryString={columnObject.categoryCode}
                userSettings={userSettings}
                key={columnObject.categoryCode}
              />
            )}
            <Button
              variant="icon"
              onClick={() => null}
              className={draggableColumn.columnDragButton}
            >
              <DragDropIcon
                className={`${draggableColumn.columnDragButtonSVG} column-drag-handle`}
              />
            </Button>
          </div>
        </header>
        <TaskCardWrapper
          categoryCode={columnObject.categoryCode}
          tasks={columnObject.tasks}
          userSettings={userSettings}
        />
      </li>
    </>
  );
};
