"use client";
import { TASKCARD_GROUP } from "@/LandingPages/dashboardPage/components/taskboard/utils";
import { moveTask } from "@/app/actions/dragDrop/fetch";
import { UserSettingsDTO } from "@/app/actions/user/types";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { useBrowserInfo } from "@/hooks/useBrowserInfo";
import { StatusCodes } from "@/types/todo/types";
import { TodoDTO } from "@/types/types";
import { useRouter } from "next/navigation";
import { CSSProperties } from "react";
import { MdRemoveCircle } from "react-icons/md";
import { ArrowUpDownIcon } from "../../icons/icons";
import { toast } from "../../toast/toast";
import "./css/revealCard.css";
interface DraggableCardProps {
  task: TodoDTO;
  className?: string;
  categoryCode: StatusCodes;
  style?: CSSProperties;
  sortManual?: boolean;
  userSettings?: UserSettingsDTO | undefined;
  draggableColumnEditActive?: boolean;
}
export const DRAGGABLE_CARD_ID = "draggableCard";
export const DraggableCard = ({
  task,
  className = " ",
  categoryCode,
  style,
  userSettings,
  draggableColumnEditActive = false,
}: DraggableCardProps) => {
  const { isMobile } = useBrowserInfo();
  const { todoId, title, description, priority, tags, content } = task;
  const sortManual = !!userSettings?.sortManual;
  const isColumnLayout = !!userSettings?.isColumnLayout;
  const expanded = false;

  const router = useRouter();
  const openTask = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLElement && event.target.nodeName === "H3") {
      return;
    }
    event.preventDefault();
    router.push(`/?selectedTask=${todoId}`, undefined);
  };

  const handleRemoveTask = async (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const todoId = task.todoId;
    const DELETED = "DELETED";
    const deleteResponse = await moveTask({
      categoryCode: DELETED,
      newSortIndex: 1,
      todoId,
    });
    if (deleteResponse.isError) {
      toast.error("Error deleting task", "bottomRight");
      return;
    }

    if (deleteResponse.isSuccess) {
      await cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });
      toast.success("Task was deleted successfully", "bottomRight");

      return;
    }
  };

  return (
    <div
      suppressHydrationWarning={true}
      className={`reveal-card  ${className} ${
        sortManual ? "reveal-card-sortable" : "reveal-card-not-sortable"
      } ${
        sortManual && !isColumnLayout
          ? "reveal-card-sortable-and-is-row-layout"
          : sortManual && isMobile
          ? "reveal-card-sortable-and-is-row-layout"
          : " "
      }`}
      data-group={TASKCARD_GROUP}
      data-status={categoryCode}
      onClick={openTask}
      style={style}
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
          <p>{description}</p>
        </div>
        <div className="reveal-card__wrapper__badges">
          <div className="reveal-card__wrapper__badges__priority">
            <span>{priority}</span>
          </div>
          {tags && tags.length > 0 && (
            <div className="reveal-card__wrapper__badges__tags">
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
        {content && expanded && (
          <div
            className="reveal-card__wrapper__content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>

      {(!isColumnLayout || isMobile) && sortManual && (
        <ArrowUpDownIcon
          id={DRAGGABLE_CARD_ID}
          data-label="REVEAL_CARD_DRAG_HANDLE"
          className="reveal-card-sort-manual-row-layout-handle"
          pathStyle={{ pointerEvents: "none" }}
        />
      )}
    </div>
  );
};
