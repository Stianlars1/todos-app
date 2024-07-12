"use client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
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
  chevronIcon = false,
  simpleCard = true,
}: RevealCardProps) => {
  const expanded = false;
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      console.log("🟢 handleDragStart");
      // Set data for dragging
      const dragData = {
        todoId: todoId.toString(),
        statusCode: statusCode,
      };
      event.dataTransfer.setData("application/json", JSON.stringify(dragData));
      event.dataTransfer.effectAllowed = "move";

      // Create a clone and use it as the drag image
      const rect = event.currentTarget.getBoundingClientRect();
      const clone = event.currentTarget.cloneNode(true) as HTMLDivElement;
      clone.style.width = `${rect.width}px`;
      clone.style.position = "fixed"; // Set the clone to be fixed
      clone.style.left = `${rect.left}px`; // Align horizontally with the original element
      clone.style.top = `${rect.top}px`; // Align vertically with the original element

      const dragContainer =
        document.querySelector(".drag-container") ||
        document.createElement("div");
      dragContainer.className = "drag-container";
      document.body.appendChild(dragContainer);
      dragContainer.appendChild(clone); // Append clone to the specific container

      event.dataTransfer.setDragImage(
        clone,
        event.clientX - rect.left,
        event.clientY - rect.top
      );

      console.log("rect", rect);
      console.log("clone", clone);
      console.log("event", event);

      // Delay hiding the original element to ensure it's used as the drag image
      setTimeout(() => {
        setIsDragging(true);
      }, 50); // Minimal timeout to defer removal until after the drag image capture

      // Clean up the clone immediately after setting it as the drag image
      setTimeout(() => {
        dragContainer.removeChild(clone);
        if (dragContainer.childNodes.length === 0) {
          document.body.removeChild(dragContainer); // Clean up container if empty
        }
      }, 0);
    },
    [todoId, statusCode]
  );
  const handleDragEnd = useCallback(() => {
    // Reset dragging state
    setIsDragging(false);
  }, []);

  // if (isDragging) {
  //   return null; // Don't render this card in the DOM when it's being dragged
  // }

  const router = useRouter();
  const openTask = () => {
    if (!chevronIcon) {
      router.push(`/?selectedTask=${todoId}`, undefined);
    }
  };

  const handleChevronClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`reveal-card ${className} ${
        isDragging ? "reveal-card-is-grabbed" : ""
      } ${simpleCard ? "reveal-card-simple" : ""} `}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={openTask}
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
        {chevronIcon && content && (
          <IconChevron
            onClick={handleChevronClick}
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
