import { statusCategoryToCodeMapping } from "@/app/actions/todos/types";
import { StatusCode } from "@/types/types";
import { DragEvent } from "react";

const statusMapping = {
  pendingTasks: 1, // PENDING
  inProgressTasks: 2, // IN_PROGRESS
  completedTasks: 3, // COMPLETED
  onHoldTasks: 4, // ON_HOLD
  cancelledTasks: 5, // CANCELLED
  deletedTasks: 6, // DELETED
  backlog: 7, // CREATED === backlog =>  not cancelled, not completed, not deleted, not on hold, not in progress, not pending.
};

export const determineStatusBasedOnDropZone = (
  event: DragEvent<HTMLUListElement>
): {
  statusId: number;
  statusCode: StatusCode;
  categoryString: keyof typeof statusMapping;
} | null => {
  const categoryString = event.currentTarget.getAttribute("data-category") as
    | keyof typeof statusMapping
    | null;

  if (!categoryString) return null;

  const newStatusId = statusMapping[categoryString];
  const statusCode = statusCategoryToCodeMapping[categoryString] || null;

  return {
    statusId: newStatusId,
    statusCode: statusCode,
    categoryString: categoryString,
  };
};
