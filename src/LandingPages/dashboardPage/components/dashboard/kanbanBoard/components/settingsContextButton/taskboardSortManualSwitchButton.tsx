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
  const sortManual = userSettings.sortManual;
  const dragAndDropEnabled = !userSettings.sortManual;
  const handleSort = async () => {
    const sortResponse = await updateManualSortSetting({
      newSortManualValue: !sortManual,
    });
    if (sortResponse.isSuccess) {
      await cacheInvalidate({ cacheKey: CacheKeys.USER_DETAILS });
      await cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });
    }
  };
  return (
    <SwitchButton
      checked={dragAndDropEnabled}
      onToggle={() => handleSort()}
      size="xs"
    />
  );
};
