import { UserSettingsDTO } from "@/app/actions/user/types";
import ContextButton from "@/components/ui/buttons/contextButton/contextButton";
import { useTranslations } from "next-intl";
import styles from "./css/taskboardSettingsContextButton.module.css";
import { Triggerbutton } from "./taskBoardSettingsTriggerButton";
import { TaskboardColumnLayoutSwitchButton } from "./taskboardColumnLayoutSwitchButton";
import { TaskboardLimitTasksSwitchButton } from "./taskboardLimitTasksSwitchButton";
import { TaskboardSortManualSwitchButton } from "./taskboardSortManualSwitchButton";
export const TaskboardSettingsContextButton = ({
  userSettings,
}: {
  userSettings: UserSettingsDTO | null;
}) => {
  const text = useTranslations("Taskboard.header.settings");

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
        <li>
          {text("limitTasks")}{" "}
          <TaskboardLimitTasksSwitchButton userSettings={userSettings} />
        </li>
      </ul>
    </ContextButton>
  );
};
