"use client";
import { updateUserSettings } from "@/app/actions/user/api";
import { toast } from "@/components/ui/toast/toast";
import { Button } from "@stianlarsen/react-ui-kit";
import { useState } from "react";
import { timezones } from "./zones";

export const TimezoneSelect = ({
  currentTimezone,
}: {
  currentTimezone?: string;
}) => {
  const selectedTimezone =
    currentTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [timezone, setTimezone] = useState(selectedTimezone);

  const handleChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLSelectElement;
    setTimezone(target.value);
    console.log(`Timezone set to ${target.value}`);
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
      <select value={timezone} onChange={handleChange}>
        {timezones.map((timezone) => (
          <option key={timezone} value={timezone}>
            {timezone.replace("_", " ")}
          </option>
        ))}
      </select>

      <Button variant="primary" onClick={saveTimezone}>
        save
      </Button>
    </>
  );
};
