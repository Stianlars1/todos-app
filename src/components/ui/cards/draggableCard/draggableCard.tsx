"use client";
import {TASKCARD_GROUP, TYPE_TASK,} from "@/LandingPages/dashboardPage/components/taskboard/utils";
import {deleteTask, moveTask} from "@/app/actions/dragDrop/fetch";
import {Priority} from "@/app/actions/todos/types";
import {UserSettingsDTO} from "@/app/actions/user/types";
import {cacheInvalidate} from "@/app/lib/cache/cache";
import {CacheKeys} from "@/app/lib/cache/keys";
import {StatusCodes} from "@/types/todo/types";
import {TodoDTO} from "@/types/types";
import {usePathname, useRouter} from "next/navigation";
import {useState} from "react";
import {MdRemoveCircle} from "react-icons/md";
import {ArrowUpDownIcon} from "../../icons/icons";
import {Tag} from "../../tag/tags";
import {toast} from "../../toast/toast";
import "./css/draggableCard.css";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

interface DraggableCardProps {
    task: TodoDTO;
    className?: string;
    categoryCode: StatusCodes;
    sortManual?: boolean;
    userSettings?: UserSettingsDTO | null;
    draggableColumnEditActive?: boolean;
    isMobile?: boolean;
    deleteTaskFromTasklist?: (idToRemove: number) => void;
    resetTaskList?: () => void;
}

export const DRAGGABLE_CARD_ID = "draggableCard";
export const DraggableCard = ({
                                  task,
                                  className = " ",
                                  categoryCode,
                                  userSettings,
                                  draggableColumnEditActive = false,
                                  isMobile,
                                  deleteTaskFromTasklist,
                                  resetTaskList,
                              }: DraggableCardProps) => {
    const [isPerformingOperation, setIsPerformingOperation] = useState(false);
    const {todoId, title, description, priority, tags, content} = task;
    const sortManual = !!userSettings?.sortManual;
    const isColumnLayout = !!userSettings?.isColumnLayout;
    const expanded = false;
    const pathName = usePathname();
    const router = useRouter();
    const openTask = (event: React.MouseEvent<HTMLDivElement>) => {
        const shouldItReturn = shouldReturn(event);
        if (shouldItReturn) {
            return;
        }

        event.preventDefault();
        router.push(`${pathName}?selectedTask=${todoId}`, undefined);
    };

    const handleRemoveTask = async (event: React.MouseEvent<SVGElement>) => {
        event.stopPropagation();
        event.preventDefault();
        const todoId = task.todoId;

        // if todo is already in the deleted column and the user wants to actually delete it permanently

        setIsPerformingOperation(true);
        if (categoryCode === "DELETED") {
            const permanentlyDelete = await deleteTask(todoId);

            if (permanentlyDelete.isError) {
                console.log("Error:", permanentlyDelete.error);
                toast.error("Error deleting task", "bottomRight");
                setIsPerformingOperation(false);
                resetTaskList && resetTaskList();
                return;
            }
            if (permanentlyDelete.isSuccess) {
                await cacheInvalidate({cacheKey: CacheKeys.CATEGORIZED_TODOS});
                await cacheInvalidate({cacheKey: CacheKeys.ALL_TODOS});
                toast.success("Task was permanently deleted", "bottomRight");
                return;
            }
            setIsPerformingOperation(false);
        }

        deleteTaskFromTasklist && deleteTaskFromTasklist(todoId);
        const DELETED = "DELETED";
        const deleteResponse = await moveTask({
            categoryCode: DELETED,
            newSortIndex: 1,
            todoId,
        });
        if (deleteResponse.isError) {
            toast.error("Error deleting task", "bottomRight");
            setIsPerformingOperation(false);
            resetTaskList && resetTaskList();

            return;
        }

        if (deleteResponse.isSuccess) {
            await cacheInvalidate({cacheKey: CacheKeys.CATEGORIZED_TODOS});
            await cacheInvalidate({cacheKey: CacheKeys.ALL_TODOS});
            toast.success("Task was deleted successfully", "bottomRight");
            setIsPerformingOperation(false);
            return;
        }
    };

    const {
        setNodeRef,
        attributes,
        listeners,
        transition,
        transform,
        isDragging,
    } = useSortable({
        id: task.todoId,
        data: {type: TYPE_TASK, taskObject: task},
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };
    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            suppressHydrationWarning={true}
            aria-disabled={isPerformingOperation}
            className={`reveal-card   ${className} ${
                sortManual && isColumnLayout
                    ? "reveal-card-sortable"
                    : "reveal-card-not-sortable"
            } ${
                sortManual && !isColumnLayout
                    ? "reveal-card-sortable-and-is-row-layout"
                    : sortManual && isMobile
                        ? "reveal-card-sortable-and-is-row-layout"
                        : " "
            }

      ${isMobile ? "reveal-card-mobile" : "reveal-card-desktop"}
      
      ${isPerformingOperation ? "reveal-card-permanently-deleting" : " "} ${isDragging ? "reveal_card_is_dragging" : ""}`}
            data-group={TASKCARD_GROUP}
            data-status={categoryCode}
            onClick={openTask}
        >
            {draggableColumnEditActive && (
                <MdRemoveCircle
                    onClick={handleRemoveTask}
                    className={`reveal-card__remove`}
                />
            )}
            <div className="reveal-card__wrapper">
                <div className="reveal-card__wrapper__header">
                    <h3>{title}</h3>
                    {!isMobile && <p>{description}</p>}
                </div>
                <div className="reveal-card__wrapper__badges">
                    <Tag variant="priority" priority={priority as Priority}/>
                    {tags && tags.length > 0 && (
                        <Tag key={JSON.stringify(tags)} variant="tag" tags={tags}/>
                    )}
                </div>
                {content && expanded && (
                    <div
                        className="reveal-card__wrapper__content"
                        dangerouslySetInnerHTML={{__html: content}}
                    />
                )}
            </div>

            {(!isColumnLayout || isMobile) && sortManual && (
                <ArrowUpDownIcon
                    id={DRAGGABLE_CARD_ID}
                    data-label="REVEAL_CARD_DRAG_HANDLE"
                    className="reveal-card-sort-manual-row-layout-handle"
                    pathStyle={{pointerEvents: "none"}}
                />
            )}
            {/*
      <DragDropIcon
        id={DRAGGABLE_CARD_ID}
        data-label="REVEAL_CARD_DRAG_HANDLE"
        className="reveal-card-sort-manual-row-layout-handle"
      /> */}
        </div>
    );
};

export const shouldReturn = (
    event: React.MouseEvent<HTMLDivElement | HTMLLIElement>,
) => {
    if (
        event.target instanceof HTMLElement &&
        event.target.className.includes("tagBadge")
    ) {
        return true;
    }

    if (event.target instanceof HTMLElement) {
        switch (event.target.nodeName) {
            case "H3":
                return true;
            case "P":
                return true;
        }
    }

    return false;
};
