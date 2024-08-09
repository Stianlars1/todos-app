"use client";
import { updateUserSettings } from "@/app/actions/user/api";
import { UserSettingsDTO } from "@/app/actions/user/types";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { SwitchButton } from "@/components/ui/buttons/switch/switchButton";
export const TaskboardLimitTasksSwitchButton = ({
  userSettings,
}: {
  userSettings: UserSettingsDTO | null;
}) => {
  const limitTasks = userSettings?.limitTasks;
  console.log("limitTasks", userSettings);
  const handleSort = async () => {
    if (userSettings?.limitTasks !== undefined) {
      const sortResponse = await updateUserSettings({
        limitTasks: !limitTasks,
      });
      if (sortResponse.success) {
        await cacheInvalidate({ cacheKey: CacheKeys.USER_DETAILS });
        await cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });
        await cacheInvalidate({ cacheKey: CacheKeys.USER_SETTINGS });
      }
    }
  };
  return (
    <SwitchButton
      checked={!!limitTasks}
      onToggle={() => handleSort()}
      size="xs"
    />
  );
};
