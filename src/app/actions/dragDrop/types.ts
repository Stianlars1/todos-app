import { StatusCodes } from "@/types/todo";

export interface UpdateTaskSortIndexProps {
  todoId: number;
  newSortIndex: number;
  categoryCode: string;
  activeDashboardId: number;
}
export interface MoveTaskProps {
  todoId: number;
  newSortIndex: number;
  categoryCode: string;
  activeDashboardId: number;
}
export interface UpdateColumnOrderDTO {
  categoryCode: StatusCodes;
  newDisplayOrder: number;
}
