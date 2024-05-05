"use client";
import { CategoryString } from "@/LandingPages/dashboardPage/types";
import { updateSortSetting } from "@/app/actions/settings/update";
import { UserSettingsDTO, UserSettingsSortKey } from "@/app/actions/user/types";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { IconSort } from "@/components/ui/icons/icons";
import { useState } from "react";

export const StatusColumnSortButton = ({
  categoryString,
  userSettings,
}: {
  categoryString: CategoryString;
  userSettings: UserSettingsDTO;
}) => {
  const { sortKey, sortOrder, setSortOrder } = useSortingStuff(
    categoryString,
    userSettings
  );

  if (!sortOrder || !sortKey) return;

  const handleUpdateSort = async () => {
    console.log("\n\n🔥 === Handle Update Sort ===");
    // SortOrders
    // UPDATED_AT_DESC
    const newSortOrder = sortOrder.endsWith("_desc")
      ? sortOrder.replace("_desc", "_asc")
      : sortOrder.replace("_asc", "_desc");
    const settingKey = sortKey;

    const response = await updateSortSetting({ settingKey, newSortOrder });

    if (response.isError) {
      // toast something.
    }

    if (response.isSuccess) {
      setSortOrder(response.data?.data[sortKey]);
      await cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });
    }
  };

  return (
    <button onClick={handleUpdateSort}>
      {/* <Button variant="icon" onClick={handleUpdateSort}> */}
      {sortOrder.endsWith("_desc") ? (
        <IconSort variant="DESC" />
      ) : (
        <IconSort variant="ASC" />
      )}
      {/* </Button> */}
    </button>
  );
};

const mapCategoryStringToSortKey = (
  categoryString: CategoryString
): UserSettingsSortKey => {
  switch (categoryString) {
    case "backlog":
      return "sortBacklog";
    case "inProgressTasks":
      return "sortInProgressTasks";
    case "completedTasks":
      return "sortCompletedTasks";
  }
};

const useSortingStuff = (
  categoryString: CategoryString,
  userSettings: UserSettingsDTO
) => {
  const sortKey = mapCategoryStringToSortKey(categoryString); // sortBackend, sortInProgressTasks, etc..
  const currentSort = userSettings[sortKey]!; // BE AWARE !!!!
  const [sortOrder, setSortOrder] = useState(currentSort); // updatedAt_desc or updatedAt_asc

  return { sortKey, sortOrder, setSortOrder };
};
