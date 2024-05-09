"use client";
import { UserSettingsDTO } from "@/app/actions/user/types";
import { TodoModal } from "@/components/todoModal/todoModal";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CategorizedTodosFiltered, CategoryString } from "../../types";
import { StatusColumn } from "../dashboardTodos/components/statusColumn/statusColumn";

export const TasksBoard = ({
  userSettings,
  tasks,
  columnHeadersTexts,
}: {
  userSettings: UserSettingsDTO | null;
  tasks: CategorizedTodosFiltered | null;
  columnHeadersTexts: {
    backlog: string;
    inProgressTasks: string;
    completedTasks: string;
  };
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
      {tasks && tasks !== null && (
        <div className="categorized-todos">
          {Object.entries(tasks).map(([categoryString, todosList]) => {
            return (
              <StatusColumn
                key={categoryString || "no-category"}
                categoryString={categoryString as CategoryString}
                todosList={todosList}
                userSettings={userSettings}
                headerTitle={
                  columnHeadersTexts[categoryString as CategoryString]
                }
              />
            );
          })}
        </div>
      )}

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
