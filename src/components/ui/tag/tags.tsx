import { Priority } from "@/app/actions/todos/types";
import "./css/tags.css";

type TagsProps =
  | { priority: Priority; variant: "priority" }
  | { tags: string[]; variant: "tag" };
export const Tag = (props: TagsProps) => {
  if (props.variant === "priority") {
    const priorityString = props.priority.toLowerCase();
    return (
      <div className={`tag priority-${priorityString}`}>
        <span className="tagBadge">{props.priority}</span>
      </div>
    );
  }
  return (
    <>
      {props.tags.map((tag) => (
        <div key={tag} className="tag default">
          <span className="tagBadge">{tag}</span>
        </div>
      ))}
    </>
  );
};
