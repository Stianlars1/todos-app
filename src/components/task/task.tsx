import { TodoDTO } from "@/types/types";
import "./css/task.css";

export const Task = ({ task }: { task: TodoDTO }) => {
  return (
    <div className="task">
      <header className="task__header">
        <h1>{task.title}</h1>
        <p>{task.description}</p>
      </header>
      <div className="task__content">
        {task.content && (
          <div
            className="task__content__html"
            dangerouslySetInnerHTML={{ __html: task.content }}
          />
        )}
      </div>
    </div>
  );
};

export const Example = () => {
  //   return <h1>{text("")}</h1>;
};
