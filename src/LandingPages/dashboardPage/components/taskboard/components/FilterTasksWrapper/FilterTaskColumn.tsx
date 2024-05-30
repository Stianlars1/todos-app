"use client";
import { updateUserPreferences } from "@/app/actions/preferences/fetch";
import { UserPreferenceDTO } from "@/app/actions/preferences/types";
import { toast } from "@/components/ui/toast/toast";
import { StatusCodes } from "@/types/todo/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import styles from "./filtering.module.css";
export const FilterTaskColumn = ({
  userPreferences,
}: {
  userPreferences: UserPreferenceDTO[];
}) => {
  const [userPreferencesState, setUserPreferences] =
    useState<UserPreferenceDTO[]>(userPreferences);
  const [isSaving, setIsSaving] = useState(false);

  const handleVisibilityToggle = (categoryCode: StatusCodes) => {
    const updatedPreferences = userPreferencesState.map((pref) => {
      if (pref.categoryCode === categoryCode) {
        return { ...pref, visible: !pref.visible };
      }
      return pref;
    });
    setUserPreferences(updatedPreferences);
  };
  const savePreferences = async () => {
    setIsSaving(true);
    try {
      await updateUserPreferences({
        updatedPreferences: userPreferencesState.map(
          (pref: UserPreferenceDTO) => ({
            categoryName: pref.categoryCode,
            visible: pref.visible,
          })
        ),
      });

      toast.success("Preferences updated successfully!", "bottomRight");
    } catch (error) {
      console.error("Failed to update preferences:", error);
      toast.error(
        "Failed to update preferences. Please try again.",
        "bottomRight"
      );
    }
    setIsSaving(false);
  };
  const text = useTranslations("Taskboard");

  return (
    <div className={styles.filterTaskColumn}>
      <ul>
        {userPreferencesState.map((pref) => (
          <li key={pref.categoryCode}>
            <label>{text(`filter.${pref.categoryCode}`)}</label>
            <input
              type="checkbox"
              checked={pref.visible}
              onChange={() => handleVisibilityToggle(pref.categoryCode)}
            />
          </li>
        ))}
      </ul>
      <button onClick={savePreferences} disabled={isSaving}>
        {isSaving
          ? text("filter.savingPreferences")
          : text("filter.savePreferences")}
      </button>
    </div>
  );
};
