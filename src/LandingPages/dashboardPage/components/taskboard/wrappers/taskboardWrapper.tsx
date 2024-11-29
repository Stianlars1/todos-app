"use client";
import {StatusCodes} from "@/types/todo/types";
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
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
                },
            }),
        );

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        setActiveColumn(null);
        setActiveTask(null);

        if (!over || active.id === over.id) {
            console.log("No change in position. Ignoring drag end.");
            return; // No need to update if dropped in the same position
        }

        const activeId = active.id; // ID of the dragged item
        const overId = over.id; // ID of the drop target

        const isTaskDrag = active.data.current?.type === TYPE_TASK;
        const isColumnDrag = active.data.current?.type === TYPE_COLUMN;

        if (isTaskDrag) {
            console.log("Task drag ended");

            // Find indices of the active and over items
            const activeIndex = tasksList.findIndex((t) => t.todoId === activeId);
            const overIndex = tasksList.findIndex((t) => t.todoId === overId);

            // Check if the task moved to a new position or column
            if (activeIndex !== overIndex) {
                const updatedTasks = arrayMove(tasksList, activeIndex, overIndex);
                setTasksList(updatedTasks);

                try {
                    // Perform a backend update with the new order
                    console.log(" udpating sort index")
                    //await updateTaskSortIndex({newSortIndex: overIndex, todoId: activeId as number, categoryCode: overId as StatusCodes})

                    toast.success("Task order updated successfully", "bottomRight");
                } catch (error) {
                    console.error("Failed to update task order:", error);
                    toast.error("An error occurred while updating task order");
                }
            }
        }

        if (isColumnDrag) {
            console.log("Column drag ended");

            const draggedColumnIndex = columnsList.findIndex((col) => col === activeId);
            const overColumnIndex = columnsList.findIndex((col) => col === overId);

            if (draggedColumnIndex !== overColumnIndex) {
                const newColumnsArray = arrayMove(columnsList, draggedColumnIndex, overColumnIndex);
                setColumnsList(newColumnsArray);

                try {
                    const columnsUpdateResponse = await handleUpdateColumnsOrder(newColumnsArray);
                    if (columnsUpdateResponse.isError) {
                        toast.error(
                            "An error occurred while updating the sort preference of the status columns",
                        );
                    }
                    await cacheInvalidate({ cacheKey: CacheKeys.USER_PREFERENCES });
                    await cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });
                    await cacheInvalidate({ cacheKey: CacheKeys.ALL_TAGS });

                    toast.success("Column was updated successfully", "bottomRight");
                } catch {
                    toast.error(
                        "An error occurred while updating the sort preference of the status columns",
                    );
                }
            }
        }
    };


    /*        const handleDragEnd = async (event: DragEndEvent) => {
                console.log(0)

                setActiveColumn(null);
                setActiveTask(null);
                const {active, over, activatorEvent} = event;
                if (!over) return;

                const activeId = active.id;
                const overId = over.id;
                console.log(activeId, overId)

                if (activeId === overId) return;

                console.log("2")

                const isColumnDrag = active.data.current?.type === TYPE_COLUMN;
                const isTaskDrag = active.data.current?.type === TYPE_TASK;
                // reset active

                if (isColumnDrag) {
                    // calculate new order of columns
                    const draggedColumnIndex = columnsList.findIndex(
                        (col) => col === activeId,
                    );
                    const overColumnIndex = columnsList.findIndex(
                        (col) => col === overId,
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
                        await cacheInvalidate({cacheKey: CacheKeys.USER_PREFERENCES});
                        await cacheInvalidate({cacheKey: CacheKeys.CATEGORIZED_TODOS});
                        await cacheInvalidate({cacheKey: CacheKeys.ALL_TAGS});

                        toast.success("Column was updated successfully", "bottomRight");
                    } catch {
                        toast.error(
                            "An error occured while updating the sort preference of the status columns",
                        );
                    }
                }


                if (isTaskDrag) {
                    console.log("Task drag ended");
                }

            };*/

        const handleDragStart = (event: DragStartEvent) => {
            console.log("Drag started", event);
            const {active} = event;
            const activeDragType = active.data.current?.type;
            const isColumnDrag = activeDragType === TYPE_COLUMN;
            const isTaskDrag = activeDragType === TYPE_TASK;
            if (!isColumnDrag && !isTaskDrag) return;

            if (isColumnDrag) {
                console.log("Column drag started");
                const columnObject = active.data.current?.column;
                setActiveColumn(columnObject);
            }

            if (isTaskDrag) {
                console.log("Task drag started");
                const taskObject = active.data.current?.task;
                setActiveTask(taskObject);
            }
        };


        const handleDragOver = (event: DragOverEvent) => {
            const {active, over, activatorEvent} = event;
            if (!over) return;

            const activeId = active.id;
            const overId = over.id;

            console.log(activeId, overId)
            if (activeId === overId) return;

            // dropping task in own column
            const isTaskDrag = active.data.current?.type === TYPE_TASK;
            const isOverTask = over.data.current?.type === TYPE_TASK;

            if (!isTaskDrag) return;

            if (isTaskDrag && isOverTask) {
                console.log("Task over task");

                setTasksList((tasks) => {
                    const activeIndex = tasks.findIndex((t) => t.todoId === activeId);
                    const overIndex = tasks.findIndex((t) => t.todoId === overId);
                    tasksList[activeIndex].status.statusCode = tasks[overIndex].status.statusCode;

                    return arrayMove(tasks, activeIndex, overIndex);
                })

            }
            // dropping task in another column
            const isColumnDrag = active.data.current?.type === TYPE_COLUMN;
            if (!isColumnDrag) return;

            if (isTaskDrag && isColumnDrag) {
                setTasksList((tasks) => {
                    const activeIndex = tasks.findIndex((t) => t.todoId === activeId);
                    // @ts-ignore
                    tasksList[activeIndex].status.statusCode = overId;
                    return arrayMove(tasks, activeIndex, activeIndex);
                })
            }
        }



        return (
            <DndContext
                {...sensors}
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}

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
    }
;
