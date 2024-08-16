import { UserDTO } from "@/app/actions/user/types";
import { useTranslations } from "next-intl";
import { DeleteAccount } from "./components/deleteAccount/deleteAccount";
import { TimezoneSelect } from "./components/timezone/timezoneSelect";
import styles from "./css/preferences.module.css";
export const SettingsPreferencesContent = ({
  userDetails,
}: {
  userDetails: UserDTO | null;
}) => {
  const texts = useTranslations("SettingsPage.preferences");

  //   preferences
  // title
  // language
  // savePreferences
  // savingPreferences
  // preferencesSaved
  return (
    <section className={styles.preferences}>
      <TimezoneSelect
        currentTimezone={userDetails?.settings?.timeZone || "UTC"}
      />

      <DeleteAccount />
    </section>
  );
};
