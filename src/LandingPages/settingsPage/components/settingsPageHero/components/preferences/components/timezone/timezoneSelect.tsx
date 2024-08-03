"use client";
import { updateUserSettings } from "@/app/actions/user/api";
import { toast } from "@/components/ui/toast/toast";
import { useTranslations } from "next-intl";
import { useState } from "react";
import styles from "../../css/preferences.module.css";
import { timezones } from "./zones";
export const TimezoneSelect = ({
  currentTimezone,
}: {
  currentTimezone?: string;
}) => {
  const texts = useTranslations("SettingsPage.preferences");

  const selectedTimezone =
    currentTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [timezone, setTimezone] = useState(selectedTimezone);

  const handleChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLSelectElement;
    setTimezone(target.value);
    saveTimezone();
  };

  const saveTimezone = async () => {
    const updateResponse = await updateUserSettings({ timeZone: timezone });

    if (!updateResponse.success) {
      console.error(updateResponse);
    }

    toast.success(`Timezone set to ${timezone}`, "bottomRight");
  };
  return (
    <>
      <h3 className={styles.preferences}>{texts("language")}</h3>
      <select value={timezone} onChange={handleChange}>
        {timezones.map((timezone) => (
          <option key={timezone} value={timezone}>
            {timezone.replace("_", " ")}
          </option>
        ))}
      </select>

      {/* <Button variant="primary" onClick={saveTimezone}>
        save
      </Button> */}
    </>
  );
};
