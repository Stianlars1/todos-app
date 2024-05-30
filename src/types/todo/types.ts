import { TodoDTO } from "../types";

export type StatusCodes =
  | "CREATED"
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ON_HOLD"
  | "CANCELLED"
  | "DELETED"
  | "SOON_DUE";

export type CategorizedTodosDTO = {
  [key in StatusCodes]: TodoDTO[];
};
export const DUE_SOON_KEY = "SOON_DUE";

export type CategorizedTodosText = StatusCodes;
export interface CategorizedTodosResponseDTO {
  success: boolean;
  message: string;
  data: CategorizedTodosDTO;
}

export interface UpdatedTaskDTO
  extends Omit<
    TodoDTO,
    "todoId" | "createdAt" | "status" | "sortIndex" | "content"
  > {
  content: string;
  statusId: number;
}
