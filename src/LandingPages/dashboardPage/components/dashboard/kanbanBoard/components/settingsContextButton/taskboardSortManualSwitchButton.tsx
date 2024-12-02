"use client";
import { updateManualSortSetting } from "@/app/actions/settings/update";
import { UserSettings } from "@/app/actions/user/types";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { SwitchButton } from "@/components/ui/buttons/switch/switchButton";

export const TaskboardSortManualSwitchButton = ({
  userSettings,
}: {
  userSettings: UserSettings;
}) => {
  const isChecked = userSettings.sortManual;
  const handleSort = async () => {
    if (userSettings.sortManual !== undefined) {
      const sortResponse = await updateManualSortSetting({
        newSortManualValue: !isChecked,
      });
      if (sortResponse.isSuccess) {
        await cacheInvalidate({ cacheKey: CacheKeys.USER_DETAILS });
        await cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });
      }
    }
  };
  return (
    <SwitchButton
      checked={!!isChecked}
      onToggle={() => handleSort()}
      size="xs"
    />
  );
};
