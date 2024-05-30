"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Taskviewer } from "./taskviewer/taskviewer";

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
  sidebarOpen,
}: {
  sidebarOpen: boolean;
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
            ?.setAttribute("data-sidebar-open", String(sidebarOpen));
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [selectedTaskId]);

  if (!selectedTaskId) return null;

  return <Taskviewer sidebarOpen={sidebarOpen} taskId={selectedTaskId} />;
};
