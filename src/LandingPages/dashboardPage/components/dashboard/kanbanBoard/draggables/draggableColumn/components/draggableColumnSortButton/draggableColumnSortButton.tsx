"use client";
import { updateSortSetting } from "@/app/actions/settings/update";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { IconSort } from "@/components/ui/icons/icons";
import { StatusCodes } from "@/types/todo";
import { Button } from "@stianlarsen/react-ui-kit";
import "./draggableColumnSortButton.module.css";
import { useSortingStuff } from "./sortTasks";
import { UserSettings } from "@/app/actions/user/types";

export const StatusColumnSortButton = ({
  categoryString,
  userSettings,
}: {
  categoryString: StatusCodes;
  userSettings: UserSettings;
}) => {
  const { sortKey, sortOrder, setSortOrder } = useSortingStuff(
    categoryString,
    userSettings,
  );

  if (!sortOrder || !sortKey) return;

  const handleUpdateSort = async () => {
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
      await cacheInvalidate({ cacheKey: CacheKeys.ALL_TODOS });
    }
  };

  return (
    <>
      <Button
        className="status-column-button"
        variant="icon"
        onClick={handleUpdateSort}
      >
        {sortOrder.endsWith("_desc") ? (
          <IconSort variant="DESC" />
        ) : (
          <IconSort variant="ASC" />
        )}
      </Button>
    </>
  );
};
