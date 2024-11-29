"use client";
import {GetUserPreferencesDTO} from "@/app/actions/preferences/types";
import ContextButton from "@/components/ui/buttons/contextButton/contextButton";
import {useTranslations} from "use-intl";
import {TriggerFilterbutton} from "../settingsContextButton/taskBoardSettingsTriggerButton";
import {FilterTaskColumn} from "./FilterTaskColumn";
import styles from "./filtering.module.css";

export const FilterTasksWrapper = ({
  userPreferences,
}: {
  userPreferences: GetUserPreferencesDTO | null;
}) => {
  const text = useTranslations("Taskboard.filter");

  if (!userPreferences) return;
  return (
    <>
      <ContextButton trigger={<TriggerFilterbutton />}>
        <strong style={{ fontSize: "0.875rem" }}>{text("filterTitle")}</strong>
        <div className={styles.separator} />
        <FilterTaskColumn userPreferences={userPreferences} />
      </ContextButton>
    </>
  );
};
