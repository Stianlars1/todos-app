"use client";
import { createTodo } from "@/app/actions/todos/fetch";
import { Priority, StatusId } from "@/app/actions/todos/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useFormState } from "react-dom";
import { CustomForm } from "../form/components/customForm/customForm";
import {
  CustomInput,
  CustomInputLabel,
  CustomInputLabelWrapper,
} from "../form/components/customInput/customInput";
import { FormContentWrapper } from "../form/formContentWrapper";
import { Modal } from "../modal/modal";
import { TextEditor } from "../ui/richTextEditor/richTextEditor";
import { toast } from "../ui/toast/toast";
import { ConfirmCreateTaskButton } from "./components/createTaskButton";
import "./css/createTask.css";

export const CreateTask = ({ onClose }: { onClose: () => void }) => {
  const [state, dispatch] = useFormState(createTodo, undefined);
  const [content, setContent] = useState<string>("");
  const [statusId, setStatusId] = useState<StatusId>(StatusId.CREATED);
  const [priority, setPriority] = useState<Priority>(Priority.MEDIUM);
  const text = useTranslations("general");
  const createText = useTranslations("Create-task");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const toastText = useTranslations("Toasts");
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
          {text("tasks.status.selectStatus")}
        </option>
        <option value={StatusId.CREATED}>{text("tasks.status.CREATED")}</option>
        <option value={StatusId.ON_HOLD}>{text("tasks.status.ON_HOLD")}</option>
        <option value={StatusId.PENDING}>{text("tasks.status.PENDING")}</option>
        <option value={StatusId.IN_PROGRESS}>
          {text("tasks.status.IN_PROGRESS")}
        </option>
        <option value={StatusId.COMPLETED}>
          {text("tasks.status.COMPLETED")}
        </option>
        <option value={StatusId.CANCELLED}>
          {text("tasks.status.CANCELLED")}
        </option>
        <option value={StatusId.DELETED}>{text("tasks.status.DELETED")}</option>
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
        <option value={Priority.LOW}>{text("tasks.priority.LOW")}</option>
        <option value={Priority.MEDIUM}>{text("tasks.priority.MEDIUM")}</option>
        <option value={Priority.HIGH}>{text("tasks.priority.HIGH")}</option>
      </select>
    );
  };

  if (state && "isSuccess" in state && state.isSuccess) {
    toast.success(toastText("TASK_CREATED"), "bottomRight");

    onClose && onClose();
  }

  return (
    <Modal
      onClose={onClose}
      hasUnsavedChanges={hasUnsavedChanges}
      replaceUrl={true}
    >
      <CustomForm action={dispatch} className="create-task">
        <FormContentWrapper>
          <header className="create-task__header">
            <h1>{createText("header.title")}</h1>
            <p>{createText("header.description")}</p>
          </header>

          <CustomInputLabelWrapper>
            <CustomInputLabel htmlFor="title">
              {createText("form.title.label")}
            </CustomInputLabel>
            <CustomInput
              type="text"
              placeholder={createText("form.title.placeholder")}
              id="title"
              name="title"
              required
              onChange={handleInputChange}
            />
          </CustomInputLabelWrapper>

          <CustomInputLabelWrapper>
            <CustomInputLabel htmlFor="description">
              {createText("form.description.label")}
            </CustomInputLabel>
            <CustomInput
              type="text"
              placeholder={createText("form.description.placeholder")}
              id="description"
              name="description"
              onChange={handleInputChange}
            />
          </CustomInputLabelWrapper>

          <div className="selects">
            <CustomInputLabelWrapper>
              <CustomInputLabel>
                {createText("form.status.label")}
              </CustomInputLabel>
              <SelectStatus />
            </CustomInputLabelWrapper>

            <CustomInputLabelWrapper>
              <CustomInputLabel>
                {createText("form.priority.label")}
              </CustomInputLabel>

              <TaskPriority />
            </CustomInputLabelWrapper>
          </div>
          <CustomInputLabelWrapper>
            <CustomInputLabel htmlFor="dueDate">
              {createText("form.dueDate.label")}
            </CustomInputLabel>
            <CustomInput
              type="date"
              placeholder={createText("form.dueDate.placeholder")}
              id="dueDate"
              name="dueDate"
              onChange={handleInputChange}
            />
          </CustomInputLabelWrapper>

          <CustomInputLabelWrapper>
            <CustomInputLabel>
              {createText("form.content.label")}
            </CustomInputLabel>
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
          </CustomInputLabelWrapper>

          <CustomInputLabelWrapper>
            <CustomInputLabel htmlFor="tags">
              {createText("form.tags.label")}
            </CustomInputLabel>
            <CustomInput
              type="text"
              placeholder="Tags"
              id="tags"
              name="tags"
              onChange={() => handleInputChange()}
            />
          </CustomInputLabelWrapper>
          <div className="create-task__footer">
            <ConfirmCreateTaskButton
              loadingText={createText("submit.loadingTitle")}
            >
              {createText("submit.title")}
            </ConfirmCreateTaskButton>
          </div>
        </FormContentWrapper>
      </CustomForm>
    </Modal>
  );
};
