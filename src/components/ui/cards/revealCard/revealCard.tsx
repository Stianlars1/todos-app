"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconChevron } from "../../icons/icons";
import "./css/revealCard.css";
import { RevealCardProps } from "./types";
export const RevealCard = ({
  title,
  description,
  tags,
  priority,
  content,
  todoId,
  className = " ",
  statusCode,
  url,
}: RevealCardProps) => {
  const expanded = false;
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [isDragging, setIsDragging] = useState(false);

  const router = useRouter();
  const openTask = () => {
    // router.push(`/?selectedTask=${todoId}`, undefined);
    url && router.push(url, undefined);
  };

  const handleChevronClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`reveal-card ${className} ${
        isDragging ? "reveal-card-is-grabbed" : ""
      } reveal-card-simple `}
    >
      <div className="reveal-card__wrapper">
        <div className="reveal-card__wrapper__header">
          <h3>{title}</h3>
          {description && description.length > 0 && <p>{description}</p>}
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
        {content && (
          <IconChevron
            onClick={openTask}
            className={`reveal-card__wrapper__expand-chevron ${
              isExpanded ? "reveal-card__wrapper__expanded-chevron" : ""
            }`}
          />
        )}
        {content && isExpanded && (
          <div
            className="reveal-card__wrapper__content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
    </div>
  );
};
