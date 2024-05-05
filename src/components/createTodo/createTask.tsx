"use client";
import { createTodo } from "@/app/actions/todos/fetch";
import { Priority, StatusId } from "@/app/actions/todos/types";
import { Button } from "@stianlarsen/react-ui-kit";
import { useState } from "react";
import { useFormState } from "react-dom";
import { Modal } from "../modal/modal";
import { TextEditor } from "../ui/richTextEditor/richTextEditor";
import "./css/createTask.css";

export const CreateTask = ({ onClose }: { onClose: () => void }) => {
  const [state, dispatch] = useFormState(createTodo, undefined);
  const [content, setContent] = useState<string>("");
  const [statusId, setStatusId] = useState<StatusId>(StatusId.CREATED);
  const [priority, setPriority] = useState<Priority>(Priority.MEDIUM);

  const SelectStatus = () => {
    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = parseInt(e.target.value, 10);
      setStatusId(selectedValue as StatusId);
    };

    return (
      <select
        id="statusId"
        name="statusId"
        value={statusId || ""} // Fallback to the empty string if statusId is undefined
        onChange={handleOnChange}
      >
        <option defaultValue={""} value={""} disabled>
          Select status
        </option>
        <option value={StatusId.CREATED}>Created</option>
        <option value={StatusId.ON_HOLD}>On hold</option>
        <option value={StatusId.PENDING}>Pending</option>
        <option value={StatusId.IN_PROGRESS}>In progress</option>
        <option value={StatusId.COMPLETED}>Completed</option>
        <option value={StatusId.CANCELLED}>Cancelled</option>
        <option value={StatusId.DELETED}>Deleted</option>
      </select>
    );
  };

  const TaskPriority = () => {
    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      console.log("Selected priority: ", e.target.value);
      setPriority(e.target.value as Priority);
    };

    return (
      <select
        id="priority"
        name="priority"
        value={priority || ""} // Fallback to the empty string if priority is undefined
        onChange={handleOnChange}
      >
        <option value={Priority.LOW}>Low</option>
        <option value={Priority.MEDIUM}>Medium</option>
        <option value={Priority.HIGH}>High</option>
      </select>
    );
  };

  console.log("\n\n🟢 state", state);

  if (state && "isSuccess" in state && state.isSuccess) {
    onClose && onClose();
  }

  return (
    <Modal onClose={onClose}>
      <form action={dispatch} className="create-task">
        <header className="create-task__header">
          <h1>Create task</h1>
          <p>Click outside the modal to close it.</p>
        </header>
        <div className="create-task__content">
          <div className="create-task__content__wrapper ">
            <label>Title</label>
            <input
              type="text"
              placeholder="Task title"
              id="title"
              name="title"
            />
          </div>
          <div className="create-task__content__wrapper ">
            <label>Description</label>
            <input
              type="text"
              placeholder="Task description"
              id="description"
              name="description"
            />
          </div>
          <div className="create-task__content__wrapper ">
            <label>Status</label>
            <SelectStatus />
          </div>
          <div className="create-task__content__wrapper ">
            <label>Priority</label>
            <TaskPriority />
          </div>
          <div className="create-task__content__wrapper ">
            <label>Due date (optional)</label>
            <input
              type="datetime-local"
              placeholder="Date"
              id="dueDate"
              name="dueDate"
            />
          </div>
          <div className="create-task__content__wrapper ">
            <label>Content (optional)</label>
            <TextEditor content={content} setContent={setContent} />
            {content && (
              <input
                aria-hidden
                style={{ display: "none" }}
                value={content}
                type="text"
                id="content"
                name="content"
              />
            )}
          </div>
          <div className="create-task__content__wrapper ">
            <label>Tags (optionsl)</label>
            <input type="text" placeholder="Tags" id="tags" name="tags" />
          </div>
        </div>
        <div className="create-task__footer">
          <Button type="submit" variant="primary">
            Create task
          </Button>
        </div>
      </form>
    </Modal>
  );
};
