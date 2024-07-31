"use client";
import { Priority } from "@/app/actions/todos/types";
import { TagsType, TodoPriority } from "@/types/types";
import { CSSProperties } from "react";
import { ClickIcon } from "../../icons/icons";
import { Tag } from "../../tag/tags";
import "./css/taskCard.css";

export const TaskCard = ({
  title,
  description,
  tags,
  priority,
  style = undefined,
  index,
  onClick,
  className = "",
}: {
  title: string;
  description: string;
  tags: TagsType;
  priority: TodoPriority | undefined;
  style?: CSSProperties;
  index: number;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
}) => {
  return (
    <li
      suppressHydrationWarning={true}
      className={`reveal-card ${className}`}
      style={style}
      id={index === 0 ? "one" : index === 1 ? "two" : "three"}
      onClick={onClick}
    >
      <div className="reveal-card__wrapper">
        <div
          className={`reveal-card__wrapper__header ${
            onClick ? "clickPadding" : ""
          }`}
        >
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="reveal-card__wrapper__badges">
          {priority && (
            <Tag variant="priority" priority={priority as Priority} />
          )}
          {tags && tags.length > 0 && (
            <Tag key={JSON.stringify(tags)} variant="tag" tags={tags} />
          )}
        </div>
      </div>

      {onClick && (
        <>
          <ClickIcon className="click-icon" />
        </>
      )}
    </li>
  );
};
