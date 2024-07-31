"use client";
import { UserSettingsDTO } from "@/app/actions/user/types";
import { SuspenseFallback } from "@/components/ui/suspenseFallback/suspenseFallback";
import { TaskViewer } from "@/components/ui/taskviewer/taskviewer/taskviewer";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./css/showTaskModal.module.css";
export const ShowTaskModalContainer = ({
  userSettings,
  redirectUrl = "",
}: {
  redirectUrl?: string;
  userSettings: UserSettingsDTO | undefined;
}) => {
  const selectedTaskId = useSelectedTaskId();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [fetchingTask, setFetchingTask] = useState(false);
  useEffect(() => {
    if (selectedTaskId) {
      console.log("✅ showing modal");
      setShowTaskModal(true);
      setFetchingTask(true);
    }
  }, [selectedTaskId]);

  const handleTaskLoaded = () => {
    console.log("✅ closing modal");

    setFetchingTask(false);
  };
  return (
    <>
      {showTaskModal && selectedTaskId && userSettings && (
        <>
          {/* <TodoModal
            taskId={selectedTaskId}
            onClose={() => setShowTaskModal(false)}
          /> */}

          <TaskViewer
            redirectUrl={redirectUrl}
            taskId={selectedTaskId}
            userSettings={userSettings}
            onTaskLoaded={handleTaskLoaded}
          />

          {fetchingTask && (
            <div className={styles.fetchingTaskDiv}>
              <SuspenseFallback classname={styles.loader} fixed={false} />
            </div>
          )}
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
