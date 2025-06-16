"use client";
import { UserSettings } from "@/app/actions/user/types";
import { SuspenseFallback } from "@/components/ui/suspenseFallback/suspenseFallback";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { DashboardOnlyTypeDTO } from "@/LandingPages/dashboardPage/components/dashboard/dashboardSwitch/switchUtils";
import styles from "./css/showTaskModal.module.scss";
import dynamic from "next/dynamic";

const TaskViewer = dynamic(
  () =>
    import("@/components/ui/taskviewer/taskviewer/taskviewer").then(
      (m) => m.TaskViewer,
    ),
  {
    loading: () => <SuspenseFallback fixed={false} />,
    ssr: false,
  },
);

export const ShowTaskModalContainer = ({
  userSettings,
  dashboards,
  redirectUrl = "",
}: {
  redirectUrl?: string;
  userSettings: UserSettings | null;
  dashboards: DashboardOnlyTypeDTO[] | null;
}) => {
  const selectedTaskId = useSelectedTaskId();
  const pathName = usePathname();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [fetchingTask, setFetchingTask] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!selectedTaskId) return;
    setShowTaskModal(true);
    setFetchingTask(true);
  }, [selectedTaskId]);

  const handleTaskLoaded = useCallback(() => {
    setFetchingTask(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowTaskModal(false);
    router.replace(pathName.split("?")[0], { scroll: false });
  }, [pathName, router]);
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
                dashboards={dashboards}
                onTaskLoaded={handleTaskLoaded}
                onClose={handleCloseModal}
              />

              {fetchingTask && (
                <div className={styles.fetchingTaskDiv}>
                  <SuspenseFallback classname={styles.loader} fixed={false} />
                </div>
              )}
            </>,
            document.getElementById("grid-container") ?? document.body,
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
