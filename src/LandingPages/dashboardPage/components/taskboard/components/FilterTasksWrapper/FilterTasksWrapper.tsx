import { getUserPreferences } from "@/app/actions/preferences/fetch";
import ContextButton from "@/components/ui/buttons/contextButton/contextButton";
import { getTranslations } from "next-intl/server";
import { TriggerFilterbutton } from "../settingsContextButton/taskBoardSettingsTriggerButton";
import { FilterTaskColumn } from "./FilterTaskColumn";
import styles from "./filtering.module.css";
export const FilterTasksWrapper = async () => {
  const { data: userPreferences } = await getUserPreferences();
  const text = await getTranslations("Taskboard.filter");

  if (!userPreferences) return;
  return (
    <>
      {/* <ContextButton trigger={<Triggerbutton />}>
      <ul className={styles.contextContent}>
        <li>
          {text("dragAndDrop")}{" "}
          <TaskboardSortManualSwitchButton userSettings={userSettings} />
        </li>
        <li>
          {text("layout")}{" "}
          <TaskboardColumnLayoutSwitchButton userSettings={userSettings} />
        </li>
      </ul>
    </ContextButton> */}

      <ContextButton trigger={<TriggerFilterbutton />}>
        <strong style={{ fontSize: "0.875rem" }}>{text("filterTitle")}</strong>
        <div className={styles.separator} />
        <FilterTaskColumn userPreferences={userPreferences} />
      </ContextButton>
    </>
  );
};
