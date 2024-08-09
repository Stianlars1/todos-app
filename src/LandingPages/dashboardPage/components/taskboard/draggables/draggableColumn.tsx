"use client";
import { DragDropIcon } from "@/components/ui/icons/icons";

import { UserSettingsDTO } from "@/app/actions/user/types";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
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
  userSettings: UserSettingsDTO | null;
}) => {
  const [draggableColumnEditActive, setDraggableColumnEditActive] =
    useState(false);
  const showSortButton =
    userSettings?.sortManual !== undefined && !userSettings.sortManual;
  const handleColumnEditClick = () => {
    setDraggableColumnEditActive(!draggableColumnEditActive);
  };
  const isDeletedColumn = columnObject.categoryCode === "DELETED";

  return (
    <>
      <li
        className={`${draggableColumn.column} ${COLUMN_GROUP} ${
          isDeletedColumn ? draggableColumn.deletedColumn : ""
        }`}
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
            {columnObject.tasks.length > 0 && (
              <MdEdit
                onClick={handleColumnEditClick}
                className={`${draggableColumn.editColumn} ${
                  draggableColumnEditActive
                    ? draggableColumn.editColumnActive
                    : ""
                }`}
              />
            )}
            <DragDropIcon
              id="dragHandle"
              className={`${draggableColumn.columnDragButtonSVG} column-drag-handle `}
            />
          </div>
        </header>
        <TaskCardWrapper
          categoryCode={columnObject.categoryCode}
          tasks={columnObject.tasks}
          userSettings={userSettings}
          draggableColumnEditActive={draggableColumnEditActive}
        />
      </li>
    </>
  );
};
