"use client";
import { UserSettingsDTO } from "@/app/actions/user/types";
import { TaskViewer } from "@/components/ui/taskviewer/taskviewer/taskviewer";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const ShowTaskModalContainer = ({
  userSettings,
}: {
  userSettings: UserSettingsDTO | undefined;
}) => {
  const selectedTaskId = useSelectedTaskId();
  const [showTaskModal, setShowTaskModal] = useState(false);

  useEffect(() => {
    if (selectedTaskId) {
      setShowTaskModal(!!selectedTaskId);
    }
  }, [selectedTaskId]);
  return (
    <>
      {showTaskModal && selectedTaskId && userSettings && (
        <>
          {/* <TodoModal
            taskId={selectedTaskId}
            onClose={() => setShowTaskModal(false)}
          /> */}

          <TaskViewer taskId={selectedTaskId} userSettings={userSettings} />
        </>
      )}
    </>
  );
};

const useSelectedTaskId = () => {
  return useSearchParams().get(searchParams.SELECTED_TASK);
};

enum searchParams {
  SELECTED_TASK = "selectedTask",
}
