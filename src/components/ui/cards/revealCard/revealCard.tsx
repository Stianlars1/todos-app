"use client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
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
}: RevealCardProps) => {
  const expanded = false;
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
      clone.style.width = `${rect.width}px`; // Maintain the original width
      document.body.appendChild(clone); // Append to body to not interfere with original layout
      event.dataTransfer.setDragImage(
        clone,
        event.clientX - rect.left,
        event.clientY - rect.top
      );

      // Delay hiding the original element to ensure it's used as the drag image
      setTimeout(() => {
        setIsDragging(true);
      }, 0); // Adjust the timeout to be very minimal, just to defer the removal until after the drag image capture

      // Clean up the clone immediately after setting it as the drag image
      setTimeout(() => {
        document.body.removeChild(clone);
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
    router.push(`/?selectedTask=${todoId}`, undefined);
  };

  return (
    <div
      className={`reveal-card ${className} ${
        isDragging ? "reveal-card-is-grabbed" : ""
      }`}
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
        {content && expanded && (
          <div
            className="reveal-card__wrapper__content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
      </div>
    </div>
  );
};
