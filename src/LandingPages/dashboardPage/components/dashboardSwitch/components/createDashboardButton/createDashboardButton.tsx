"use client";

import { IconAdd } from "@/components/ui/icons/icons";
import { Button } from "@stianlarsen/react-ui-kit";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CreateDashboard } from "../createDashboard/createDashboard";
import styles from "./css/createDashboardButton.module.css";
export const CreateDashboardButton = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleKeyPress = (event: KeyboardEvent) => {
        const validKeyPressed =
          (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "d";
        if (validKeyPressed) {
          event.preventDefault();
          event.stopPropagation();
          setOpen(true);
        }
      };

      window.addEventListener("keydown", handleKeyPress);

      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, []);
  return (
    <>
      <Button
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setOpen(!open);
          }
        }}
        tabIndex={0}
        className={styles.add}
        variant={"icon"}
        onClick={() => setOpen(!open)}
      >
        <IconAdd className={styles.plus} />
      </Button>

      {open &&
        createPortal(
          <CreateDashboard onClose={() => setOpen(!open)} />,
          document.body,
        )}
    </>
  );
};
