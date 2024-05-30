"use client";

import { IconFilter, IconSettings } from "@/components/ui/icons/icons";
import { Button } from "@stianlarsen/react-ui-kit";
import styles from "./css/taskBoardSettingsTriggerButton.module.css";

export const Triggerbutton = () => {
  return (
    <Button className={styles.triggerButton} variant="outline">
      {/* <DragAndDropSimpleIcon2 /> */}
      <IconSettings />
    </Button>
  );
};
export const TriggerFilterbutton = () => {
  return (
    <Button className={styles.triggerButton} variant="outline">
      {/* <DragAndDropSimpleIcon2 /> */}
      <IconFilter />
    </Button>
  );
};
