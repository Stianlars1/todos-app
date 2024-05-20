"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [showTaskModal, setShowTaskModal] = useState(false);

  useEffect(() => {
    if (selectedTaskId) {
      const GridContainerId = "grid-container";
      document
        ?.getElementById(GridContainerId)
        ?.setAttribute("data-sidebar-open", String(false));
      setShowTaskModal(!!selectedTaskId);
    }
  }, [selectedTaskId]);

  if (!selectedTaskId) return null;

  return <Taskviewer sidebarOpen={sidebarOpen} taskId={selectedTaskId} />;
};
