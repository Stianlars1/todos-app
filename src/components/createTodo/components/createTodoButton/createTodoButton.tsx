"use client";
import { IconAdd } from "@/components/ui/icons/icons";
import { Button } from "@stianlarsen/react-ui-kit";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { createPortal } from "react-dom";
import { CreateTask } from "../../createTask";
import styles from "./css/createTodoButton.module.css";
export const CreateTodoButton = () => {
  const text = useTranslations("Taskboard.header");
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        className={styles.createTodoButton}
        variant="icon"
        onClick={() => setOpen(!open)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setOpen(!open);
          }
        }}
      >
        <IconAdd />

        {text("createTask")}
      </Button>

      {open &&
        createPortal(
          <CreateTask onClose={() => setOpen(!open)} />,
          document.body
        )}
    </>
  );
};
