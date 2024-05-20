"use client";
import { updateUserPreferences } from "@/app/actions/preferences/fetch";
import { UserPreferenceDTO } from "@/app/actions/preferences/types";
import { StatusCodes } from "@/types/todo/types";
import { useState } from "react";

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

      alert("Preferences updated successfully!");
    } catch (error) {
      console.error("Failed to update preferences:", error);
      alert("Failed to update preferences. Please try again.");
    }
    setIsSaving(false);
  };
  return (
    <div>
      <ul>
        {userPreferencesState.map((pref) => (
          <li key={pref.categoryCode}>
            <label>
              {pref.categoryCode}
              <input
                type="checkbox"
                checked={pref.visible}
                onChange={() => handleVisibilityToggle(pref.categoryCode)}
              />
            </label>
          </li>
        ))}
      </ul>
      <button onClick={savePreferences} disabled={isSaving}>
        {isSaving ? "Saving..." : "Save Preferences"}
      </button>
    </div>
  );
};
