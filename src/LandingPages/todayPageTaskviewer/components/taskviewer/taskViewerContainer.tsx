"use client";
import { UserSettingsDTO } from "@/app/actions/user/types";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { TodayPageTaskviewer } from "./taskviewer/taskviewer";

// HELPER UTILS
enum searchParams {
  SELECTED_TASK = "selectedTask",
}

// HELPER UTILS
const useSelectedTaskId = () => {
  return useSearchParams().get(searchParams.SELECTED_TASK);
};

// COMPONENT
export const TaskviewerContainer = ({
  userSettings,
}: {
  userSettings: UserSettingsDTO | null;
}) => {
  const selectedTaskId = useSelectedTaskId();

  useEffect(() => {
    const handleResize = () => {
      if (selectedTaskId && typeof window !== undefined) {
        const GridContainerId = "grid-container";
        if (window.innerWidth <= 1400) {
          document
            ?.getElementById(GridContainerId)
            ?.setAttribute("data-sidebar-open", String(false));
        } else {
          document
            ?.getElementById(GridContainerId)
            ?.setAttribute(
              "data-sidebar-open",
              String(!!userSettings?.sidebarOpen)
            );
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [selectedTaskId]);

  if (!selectedTaskId) return null;

  return (
    <TodayPageTaskviewer
      sidebarOpen={!!userSettings?.sidebarOpen}
      taskId={selectedTaskId}
      userSettings={userSettings}
    />
  );
};
