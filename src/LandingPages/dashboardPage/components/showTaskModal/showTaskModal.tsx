"use client";
import { UserSettingsDTO } from "@/app/actions/user/types";
import { SuspenseFallback } from "@/components/ui/suspenseFallback/suspenseFallback";
import { TaskViewer } from "@/components/ui/taskviewer/taskviewer/taskviewer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./css/showTaskModal.module.css";
export const ShowTaskModalContainer = ({
  userSettings,
  redirectUrl = "",
}: {
  redirectUrl?: string;
  userSettings: UserSettingsDTO | undefined;
}) => {
  const selectedTaskId = useSelectedTaskId();
  const pathName = usePathname();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [fetchingTask, setFetchingTask] = useState(false);
  const router = useRouter();
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

  const handleCloseModal = () => {
    setShowTaskModal(false);
    router.replace(pathName.split("?")[0], { scroll: false });
  };
  return (
    <>
      {showTaskModal && selectedTaskId && userSettings && (
        <>
          {/* <TodoModal
            taskId={selectedTaskId}
            onClose={() => setShowTaskModal(false)}
          /> */}
          {createPortal(
            <>
              <TaskViewer
                redirectUrl={redirectUrl}
                taskId={selectedTaskId}
                userSettings={userSettings}
                onTaskLoaded={handleTaskLoaded}
                onClose={handleCloseModal}
              />

              {fetchingTask && (
                <div className={styles.fetchingTaskDiv}>
                  <SuspenseFallback classname={styles.loader} fixed={false} />
                </div>
              )}
            </>,
            document.getElementById("grid-container") ?? document.body
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
