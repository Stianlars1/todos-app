"use client";
import { TodoModal } from "@/components/todoModal/todoModal";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const ShowTaskModalContainer = () => {
  return <ShowTaskModal />;
};
export const ShowTaskModal = () => {
  const selectedTaskId = useSelectedTaskId();
  const [showTaskModal, setShowTaskModal] = useState(false);

  useEffect(() => {
    if (selectedTaskId) {
      setShowTaskModal(!!selectedTaskId);
    }
  }, [selectedTaskId]);
  return (
    <>
      {showTaskModal && selectedTaskId && (
        <>
          <TodoModal
            taskId={selectedTaskId}
            onClose={() => setShowTaskModal(false)}
          />
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
