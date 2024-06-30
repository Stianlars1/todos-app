import { UserDTO } from "@/app/actions/user/types";
import { TimezoneSelect } from "./components/timezone/timezoneSelect";
import styles from "./css/preferences.module.css";
export const SettingsPreferencesContent = ({
  userDetails,
}: {
  userDetails: UserDTO | null;
}) => {
  return (
    <>
      <h3 className={styles.preferences}>Preferences</h3>

      <TimezoneSelect
        currentTimezone={userDetails?.settings?.timeZone || "UTC"}
      />
    </>
  );
};
