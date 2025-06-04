import { StatusCodes } from "@/types/todo/types";
import { useState } from "react";
import { UserSettings, UserSettingsSortKey } from "@/app/actions/user/types";

export const mapCategoryStringToSortKey = (
  categoryString: StatusCodes,
): UserSettingsSortKey => {
  switch (categoryString) {
    case "CREATED":
      return "sortBacklog";
    case "IN_PROGRESS":
      return "sortInProgressTasks";
    case "COMPLETED":
      return "sortCompletedTasks";
    case "PENDING":
      return "sortByUpdatedAt";
    case "ON_HOLD":
      return "sortByUpdatedAt";
    case "CANCELLED":
      return "sortByUpdatedAt";
    case "DELETED":
      return "sortByUpdatedAt";
    default:
      return "sortBacklog";
  }
};

export const useSortingStuff = (
  categoryString: StatusCodes,
  userSettings: UserSettings,
) => {
  const sortKey = mapCategoryStringToSortKey(categoryString); // sortBackend, sortInProgressTasks, etc..
  const currentSort = userSettings[sortKey]!; // BE AWARE !!!!
  const [sortOrder, setSortOrder] = useState(currentSort); // updatedAt_desc or updatedAt_asc

  return { sortKey, sortOrder, setSortOrder };
};
