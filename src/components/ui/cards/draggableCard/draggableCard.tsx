"use client";
import { TASKCARD_GROUP } from "@/LandingPages/dashboardPage/components/taskboard/utils";
import { UserSettingsDTO } from "@/app/actions/user/types";
import { StatusCodes } from "@/types/todo/types";
import { TodoDTO } from "@/types/types";
import { useRouter } from "next/navigation";
import { CSSProperties } from "react";
import { ArrowUpDownIcon } from "../../icons/icons";
import "./css/revealCard.css";
interface DraggableCardProps {
  task: TodoDTO;
  className?: string;
  categoryCode: StatusCodes;
  style?: CSSProperties;
  sortManual?: boolean;
  userSettings?: UserSettingsDTO | undefined;
}
export const DraggableCard = ({
  task,
  className = " ",
  categoryCode,
  style,
  userSettings,
}: DraggableCardProps) => {
  const { todoId, title, description, priority, tags, content } = task;
  const sortManual = !!userSettings?.sortManual;
  const isColumnLayout = !!userSettings?.isColumnLayout;
  const expanded = false;

  const router = useRouter();
  const openTask = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("openTask", event);
    if (event.target instanceof HTMLElement && event.target.nodeName === "H3") {
      return;
    }
    event.preventDefault();
    router.push(`/?selectedTask=${todoId}`, undefined);
  };

  return (
    <div
      className={`reveal-card  ${className} ${
        sortManual ? "reveal-card-sortable" : "reveal-card-not-sortable"
      } ${
        sortManual && !isColumnLayout
          ? "reveal-card-sortable-and-is-row-layout"
          : " "
      }`}
      data-group={TASKCARD_GROUP}
      data-status={categoryCode}
      onClick={openTask}
      style={style}
    >
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

      {!isColumnLayout && sortManual && (
        <ArrowUpDownIcon
          data-label="REVEAL_CARD_DRAG_HANDLE"
          className="reveal-card-sort-manual-row-layout-handle"
        />
      )}
    </div>
  );
};
