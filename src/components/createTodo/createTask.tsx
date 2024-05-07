"use client";
import { createTodo } from "@/app/actions/todos/fetch";
import { Priority, StatusId } from "@/app/actions/todos/types";
import { Button } from "@stianlarsen/react-ui-kit";
import { useState } from "react";
import { useFormState } from "react-dom";
import { Modal } from "../modal/modal";
import { TextEditor } from "../ui/richTextEditor/richTextEditor";
import "./css/createTask.css";

// "Create-task": {
//   "header": {
//     "title": "Create task",
//     "description": "Click outside the modal to close it."
//   },
//   "form": {
//     "title": {
//       "label": "Tittel",
//       "placeholder": "Oppgavetittel"
//     },
//     "description": {
//       "label": "Beskrivelse",
//       "placeholder": "Gi en beskrivelse av oppgaven"
//     },
//     "status": {
//       "label": "Status"
//     },
//     "priority": {
//       "label": "Prioritet"
//     },
//     "dueDate": {
//       "label": "Frist (valgfritt)",
//       "placeholder": "dato og klokkeslett når fristen er"
//     },
//     "content": {
//       "label": "Innhold (valgfritt)"
//     },
//     "tags": {
//       "label": "Tags (valgfritt)",
//       "placeholder": "Tags"
//     }
//   },
//   "submit": {
//     "title": "Opprett oppgave"
//   }

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
    };
    priority: {
      label: string;
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
            />
          </div>
          <div className="create-task__content__wrapper ">
            <label>{createTaskTexts.form.description.label}</label>
            <input
              type="text"
              placeholder={createTaskTexts.form.description.placeholder}
              id="description"
              name="description"
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
              type="datetime-local"
              placeholder={createTaskTexts.form.dueDate.placeholder}
              id="dueDate"
              name="dueDate"
            />
          </div>
          <div className="create-task__content__wrapper ">
            <label>{createTaskTexts.form.content.label}</label>
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
            <label>{createTaskTexts.form.tags.label}</label>
            <input type="text" placeholder="Tags" id="tags" name="tags" />
          </div>
        </div>
        <div className="create-task__footer">
          <Button type="submit" variant="primary">
            {createTaskTexts.submit.title}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
