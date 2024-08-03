import { Priority } from "@/app/actions/todos/types";
import { ReactNode } from "react";
import "./css/tags.css";

type TagsProps =
  | {
      className?: string;
      priority: Priority;
      variant: "priority";
      children?: ReactNode;
      onClick?: () => void;
    }
  | {
      className?: string;
      tags: string[];
      variant: "tag";
      children?: ReactNode;
      onClick?: () => void;
    };
export const Tag = (props: TagsProps) => {
  if (props.variant === "priority") {
    const priorityString = props.priority.toLowerCase();
    return (
      <div
        onClick={props.onClick}
        className={`tag priority-${priorityString} ${props.className}`}
      >
        <span className="tagBadge">
          {props.priority} {props.children}
        </span>
      </div>
    );
  }
  return (
    <>
      {props.tags.map((tag) => (
        <div
          onClick={props.onClick}
          key={tag}
          className={`tag default ${props.className}`}
        >
          <span className="tagBadge">
            {tag} {props.children}
          </span>
        </div>
      ))}
    </>
  );
};
