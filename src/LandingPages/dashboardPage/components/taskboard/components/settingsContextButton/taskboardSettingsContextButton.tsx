import { UserSettingsDTO } from "@/app/actions/user/types";
import ContextButton from "@/components/ui/buttons/contextButton/contextButton";
import { getTranslations } from "next-intl/server";
import styles from "./css/taskboardSettingsContextButton.module.css";
import { Triggerbutton } from "./taskBoardSettingsTriggerButton";
import { TaskboardColumnLayoutSwitchButton } from "./taskboardColumnLayoutSwitchButton";
import { TaskboardSortManualSwitchButton } from "./taskboardSortManualSwitchButton";
export const TaskboardSettingsContextButton = async ({
  userSettings,
}: {
  userSettings: UserSettingsDTO | undefined;
}) => {
  const text = await getTranslations("Taskboard.header.settings");

  return (
    <ContextButton trigger={<Triggerbutton />}>
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
    </ContextButton>
  );
};
