"use client";
import {DragDropIcon} from "@/components/ui/icons/icons";

import {UserSettingsDTO} from "@/app/actions/user/types";
import {useState} from "react";
import {MdEdit} from "react-icons/md";
import {
    StatusColumnSortButton
} from "../../dashboardTodos/components/statusColumn/components/statusColumnSortButton/statusColumnSortButton";
import styles from "./draggableColumn.module.css";
import {COLUMN_GROUP, TYPE_COLUMN} from "../utils";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {StatusCodes} from "@/types/todo/types";
import {TodoDTO} from "@/types/types";
import {TaskCardWrapper} from "@/LandingPages/dashboardPage/components/taskboard/wrappers/TaskCardWrapper";

export const DraggableColumn = ({
                                    column,
                                    tasks,
                                    title,
                                    userSettings,
                                }: {
    column: StatusCodes;
    tasks: TodoDTO[];
    title: string;
    userSettings: UserSettingsDTO | null;
}) => {
    const {
        setNodeRef,
        listeners,
        transition,
        transform,
        attributes,
        isDragging,
    } = useSortable({
        id: column,
        data: {type: TYPE_COLUMN, column},
    });

    const [draggableColumnEditActive, setDraggableColumnEditActive] =
        useState(false);
    const showSortButton =
        userSettings?.sortManual !== undefined && !userSettings.sortManual;
    const handleColumnEditClick = () => {
        setDraggableColumnEditActive(!draggableColumnEditActive);
    };
    const isDeletedColumn = column === "DELETED";
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };
    return (
        <li
            ref={setNodeRef}
            style={style}
            className={`${styles.column} ${COLUMN_GROUP} ${
                isDeletedColumn ? styles.deletedColumn : ""
            } ${isDragging ? styles.dragging : ""}`}
            key={column}
        >
            <header id="no-drag" className={styles.header}>
                <h2 className={styles.headerTitle}>{title}</h2>
                <div className={styles.headerButtons}>
                    {showSortButton && (
                        <StatusColumnSortButton
                            categoryString={column}
                            userSettings={userSettings}
                            key={column}
                        />
                    )}
                    {tasks.length > 0 && (
                        <MdEdit
                            onClick={handleColumnEditClick}
                            className={`${styles.editColumn} ${
                                draggableColumnEditActive ? styles.editColumnActive : ""
                            }`}
                        />
                    )}
                    <DragDropIcon
                        className={styles.columnDragButtonSVG}
                        {...attributes}
                        {...listeners}
                    />
                </div>
            </header>
            <TaskCardWrapper
                column={column}
                tasks={tasks}
                userSettings={userSettings}
                draggableColumnEditActive={draggableColumnEditActive}
            />
        </li>
    );
};
