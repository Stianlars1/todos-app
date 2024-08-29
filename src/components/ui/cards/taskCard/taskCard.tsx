"use client";
import { Priority } from "@/app/actions/todos/types";
import { TodoDTO } from "@/types/types";
import { useTranslations } from "next-intl";
import { CSSProperties } from "react";
import { ClickIcon } from "../../icons/icons";
import { Tag } from "../../tag/tags";
import "./css/taskCard.css";

export const TaskCard = ({
  task,
  style = undefined,
  index,
  onClick,
  className = "",
  options = { showPriority: true, showTags: true, showDate: false },
}: {
  task: TodoDTO;
  style?: CSSProperties;
  index: number;
  className?: string;
  options?: {
    showPriority?: boolean;
    showTags?: boolean;
    showDate?: boolean;
  };
  onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
}) => {
  const text = useTranslations("taskCard");
  return (
    <li
      suppressHydrationWarning={true}
      className={`reveal-card ${className} ${onClick ? "clickable" : ""}`}
      style={style}
      id={index === 0 ? "one" : index === 1 ? "two" : "three"}
      onClick={onClick}
      aria-label={`task with title ${task.title}`}
    >
      <div className={`reveal-card__wrapper ${className}__wrapper`}>
        <div
          className={`reveal-card__wrapper__header ${
            onClick ? "clickPadding" : ""
          }`}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
        <div
          className={`reveal-card__wrapper__badges ${className}__wrapper__badges`}
        >
          {options.showPriority && task.priority && (
            <Tag variant="priority" priority={task.priority as Priority} />
          )}
          {options.showTags && task.tags && task.tags.length > 0 && (
            <Tag
              key={JSON.stringify(task.tags)}
              variant="tag"
              tags={task.tags}
            />
          )}
        </div>
      </div>

      {onClick && (
        <>
          <ClickIcon className="click-icon" />
        </>
      )}
      {options.showDate && (
        <>
          <span className="reveal-card__date">
            {task.dueDate ? text("due") : text("updated")}{" "}
            <i>
              {new Date(task.dueDate ?? task.updatedAt).toLocaleDateString()}
            </i>
          </span>
        </>
      )}
    </li>
  );
};
