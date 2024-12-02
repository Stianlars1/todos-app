"use client";
import { updateColumnLayoutSettings } from "@/app/actions/settings/update";
import { UserSettings } from "@/app/actions/user/types";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { SwitchButton } from "@/components/ui/buttons/switch/switchButton";

export const TaskboardColumnLayoutSwitchButton = ({
  userSettings,
}: {
  userSettings: UserSettings;
}) => {
  const isColumnLayout = userSettings.isColumnLayout;
  const handleSort = async () => {
    if (userSettings.sortManual !== undefined) {
      const sortResponse = await updateColumnLayoutSettings({
        isColumnLayout: !isColumnLayout,
      });
      if (sortResponse.isSuccess) {
        await cacheInvalidate({ cacheKey: CacheKeys.USER_DETAILS });
        await cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });
      }
    }
  };
  return (
    <SwitchButton
      checked={!!isColumnLayout}
      onToggle={() => handleSort()}
      size="xs"
    />
  );
};
