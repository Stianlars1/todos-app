import { UserDTO } from "@/app/actions/user/types";
import { useTranslations } from "next-intl";
import { TimezoneSelect } from "./components/timezone/timezoneSelect";
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
    <>
      <TimezoneSelect
        currentTimezone={userDetails?.settings?.timeZone || "UTC"}
      />
    </>
  );
};
