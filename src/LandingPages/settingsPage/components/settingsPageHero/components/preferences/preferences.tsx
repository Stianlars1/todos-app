import { UserDTO } from "@/app/actions/user/types";
import { DeleteAccount } from "./components/deleteAccount/deleteAccount";
import { TimezoneSelect } from "./components/timezone/timezoneSelect";
import styles from "./css/preferences.module.css";

export const SettingsPreferencesContent = ({
  userDetails,
}: {
  userDetails: UserDTO | null;
}) => {
  return (
    <section className={styles.preferences}>
      <TimezoneSelect
        currentTimezone={userDetails?.settings?.timeZone || "UTC"}
      />

      <DeleteAccount />
    </section>
  );
};
