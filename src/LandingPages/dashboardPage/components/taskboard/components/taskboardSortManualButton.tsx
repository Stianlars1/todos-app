"use client";
import { updateManualSortSetting } from "@/app/actions/settings/update";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { DragAndDropSimpleIcon2 } from "@/components/ui/icons/icons";
import { Button } from "@stianlarsen/react-ui-kit";
import { useState } from "react";
// import "../css/taskboardSortManualButtonNew3.css";
export const TaskboardSortManualButton = ({
  initialActiveState,
}: {
  initialActiveState: boolean;
}) => {
  const [isActive, setIsActive] = useState(initialActiveState); // Default active state

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleToggleSort = async () => {
    setIsActive(!isActive);

    if (isActive !== undefined) {
      const sortResponse = await updateManualSortSetting({
        newSortManualValue: !isActive,
      });
      if (sortResponse.isSuccess) {
        await cacheInvalidate({ cacheKey: CacheKeys.USER_SETTINGS });
        await cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });
      }
    }
  };

  return (
    <Button
      className={`sortManualButton ${isActive ? "active" : " "}`}
      variant="icon"
      onClick={handleToggleSort}
    >
      <DragAndDropSimpleIcon2 />
    </Button>
  );
};
