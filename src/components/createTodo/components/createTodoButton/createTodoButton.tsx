"use client";
import { IconAdd } from "@/components/ui/icons/icons";
import { Button } from "@stianlarsen/react-ui-kit";
import { useState } from "react";
import { createPortal } from "react-dom";
import { CreateTask, CreateTaskTextsProps } from "../../createTask";
import "./css/createTodoButton.css";
export const CreateTodoButton = ({
  createTaskTexts,
}: {
  createTaskTexts: CreateTaskTextsProps;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        className="create-todo__button"
        variant="icon"
        onClick={() => setOpen(!open)}
      >
        <IconAdd />
      </Button>

      {open &&
        createPortal(
          <CreateTask
            createTaskTexts={createTaskTexts}
            onClose={() => setOpen(!open)}
          />,
          document.body
        )}
    </>
  );
};
