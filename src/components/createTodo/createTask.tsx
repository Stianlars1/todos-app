"use client";
import { createTodo } from "@/app/actions/todos/fetch";
import { Priority, StatusId } from "@/app/actions/todos/types";
import { useState } from "react";
import { useFormState } from "react-dom";
import { Modal } from "../modal/modal";
import { TextEditor } from "../ui/richTextEditor/richTextEditor";
import { ConfirmCreateTaskButton } from "./components/createTaskButton";
import "./css/createTask.css";

type CreateTodoStatusOptions =
  | "CREATED"
  | "ON_HOLD"
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "DELETED";
type CreateTodoPriorityOptions = "LOW" | "MEDIUM" | "HIGH";

export interface CreateTaskTextsProps {
  header: {
    title: string;
    description: string;
  };
  form: {
    title: {
      label: string;
      placeholder: string;
    };
    description: {
      label: string;
      placeholder: string;
    };
    status: {
      label: string;
      options: {
        [key in CreateTodoStatusOptions]: string;
      };
    };
    priority: {
      label: string;
      options: {
        [key in CreateTodoPriorityOptions]: string;
      };
    };
    dueDate: {
      label: string;
      placeholder: string;
    };
    content: {
      label: string;
    };
    tags: {
      label: string;
      placeholder: string;
    };
  };
  submit: {
    title: string;
    loadingTitle: string;
  };
}

export const CreateTask = ({
  onClose,
  createTaskTexts,
}: {
  onClose: () => void;
  createTaskTexts: CreateTaskTextsProps;
}) => {
  const [state, dispatch] = useFormState(createTodo, undefined);
  const [content, setContent] = useState<string>("");
  const [statusId, setStatusId] = useState<StatusId>(StatusId.CREATED);
  const [priority, setPriority] = useState<Priority>(Priority.MEDIUM);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleInputChange = () => {
    setHasUnsavedChanges(true);
  };

  const SelectStatus = () => {
    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = parseInt(e.target.value, 10);
      setStatusId(selectedValue as StatusId);
      handleInputChange();
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
        <option value={StatusId.CREATED}>
          {createTaskTexts.form.status.options.CREATED}
        </option>
        <option value={StatusId.ON_HOLD}>
          {createTaskTexts.form.status.options.ON_HOLD}
        </option>
        <option value={StatusId.PENDING}>
          {createTaskTexts.form.status.options.PENDING}
        </option>
        <option value={StatusId.IN_PROGRESS}>
          {createTaskTexts.form.status.options.IN_PROGRESS}
        </option>
        <option value={StatusId.COMPLETED}>
          {createTaskTexts.form.status.options.COMPLETED}
        </option>
        <option value={StatusId.CANCELLED}>
          {createTaskTexts.form.status.options.CANCELLED}
        </option>
        <option value={StatusId.DELETED}>
          {createTaskTexts.form.status.options.DELETED}
        </option>
      </select>
    );
  };

  const TaskPriority = () => {
    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setPriority(e.target.value as Priority);
      handleInputChange();
    };

    return (
      <select
        id="priority"
        name="priority"
        value={priority || ""} // Fallback to the empty string if priority is undefined
        onChange={handleOnChange}
      >
        <option value={Priority.LOW}>
          {createTaskTexts.form.priority.options.LOW}
        </option>
        <option value={Priority.MEDIUM}>
          {createTaskTexts.form.priority.options.MEDIUM}
        </option>
        <option value={Priority.HIGH}>
          {createTaskTexts.form.priority.options.HIGH}
        </option>
      </select>
    );
  };

  if (state && "isSuccess" in state && state.isSuccess) {
    onClose && onClose();
  }

  return (
    <Modal onClose={onClose} hasUnsavedChanges={hasUnsavedChanges}>
      <form action={dispatch} className="create-task">
        <header className="create-task__header">
          <h1>{createTaskTexts.header.title}</h1>
          <p>{createTaskTexts.header.description}</p>
        </header>
        <div className="create-task__content">
          <div className="create-task__content__wrapper ">
            <label>{createTaskTexts.form.title.label}</label>
            <input
              type="text"
              placeholder={createTaskTexts.form.title.placeholder}
              id="title"
              name="title"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="create-task__content__wrapper ">
            <label>{createTaskTexts.form.description.label}</label>
            <input
              type="text"
              placeholder={createTaskTexts.form.description.placeholder}
              id="description"
              name="description"
              onChange={handleInputChange}
            />
          </div>
          <div className="create-task__content__wrapper ">
            <label>{createTaskTexts.form.status.label}</label>
            <SelectStatus />
          </div>
          <div className="create-task__content__wrapper ">
            <label>{createTaskTexts.form.priority.label}</label>
            <TaskPriority />
          </div>
          <div className="create-task__content__wrapper ">
            <label>{createTaskTexts.form.dueDate.label}</label>
            <input
              type="date"
              placeholder={createTaskTexts.form.dueDate.placeholder}
              id="dueDate"
              name="dueDate"
              onChange={handleInputChange}
            />
          </div>
          <div className="create-task__content__wrapper ">
            <label>{createTaskTexts.form.content.label}</label>
            <TextEditor
              content={content}
              setContent={setContent}
              onChange={() => handleInputChange()}
            />
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
            <label>{createTaskTexts.form.tags.label}</label>
            <input
              type="text"
              placeholder="Tags"
              id="tags"
              name="tags"
              onChange={() => handleInputChange()}
            />
          </div>
        </div>
        <div className="create-task__footer">
          <ConfirmCreateTaskButton
            loadingText={createTaskTexts.submit.loadingTitle}
          >
            {createTaskTexts.submit.title}
          </ConfirmCreateTaskButton>
        </div>
      </form>
    </Modal>
  );
};
