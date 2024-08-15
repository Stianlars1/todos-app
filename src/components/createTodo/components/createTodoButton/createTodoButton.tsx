"use client";
import { UserSettingsDTO } from "@/app/actions/user/types";
import { IconAdd } from "@/components/ui/icons/icons";
import { DashboardOnlyType } from "@/LandingPages/dashboardPage/components/dashboardSwitch/switchUtils";
import { Button } from "@stianlarsen/react-ui-kit";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CreateTask } from "../../createTask";
import styles from "./css/createTodoButton.module.css";
export const CreateTodoButton = ({
  userSettings,
  dashboards,
}: {
  userSettings: UserSettingsDTO | null;
  dashboards: DashboardOnlyType[] | null;
}) => {
  const text = useTranslations("Taskboard.header");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleKeyPress = (event: KeyboardEvent) => {
        const validKeyPressed =
          (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "e";
        if (validKeyPressed) {
          const taskViewerOpened =
            document.body.getAttribute("taskviewer-modal-open") === "true";
          const searchResultIsOpen =
            document.body.getAttribute("search-modal-open") === "true";

          const canOpen = !taskViewerOpened && !searchResultIsOpen;
          if (canOpen) {
            event.preventDefault();
            event.stopPropagation();
            setOpen(true);
          }
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
          <CreateTask
            dashboards={dashboards}
            userSettings={userSettings}
            onClose={() => setOpen(!open)}
          />,
          document.body,
        )}
    </>
  );
};
