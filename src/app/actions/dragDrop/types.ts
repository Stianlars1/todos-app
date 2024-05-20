import { StatusCodes } from "@/types/todo/types";
export interface UpdateTaskSortIndexProps {
  todoId: number;
  newSortIndex: number;
  categoryCode: string;
}
export interface MoveTaskProps {
  todoId: number;
  newSortIndex: number;
  categoryCode: string;
}
export interface UpdateColumnOrderDTO {
  categoryCode: StatusCodes;
  newDisplayOrder: number;
}
