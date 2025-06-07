import { StatusCode, TodoDTO } from "../types";

export type StatusCodes =
  | "CREATED"
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ON_HOLD"
  | "CANCELLED"
  | "DELETED"
  | "SOON_DUE";

export type SoonDueSubCategories =
  | "Due Today"
  | "Due Tomorrow"
  | "Due in 2 Days"
  | "Due in 3 Days";

export type CategorizedTodosDTO = {
  [key in StatusCodes]:
    | TodoDTO[]
    | {
        [key in SoonDueSubCategories]: TodoDTO[];
      };
};
export const DUE_SOON_KEY = "SOON_DUE";

export type CategorizedTodosText = StatusCodes;
export interface CategorizedTodosResponseDTO {
  success: boolean;
  message: string;
  data: CategorizedTodosDTO;
}

export interface ColumnObject {
  statusCode: StatusCode;
  statusName: string;
}
export interface Column {
  statusCode: StatusCode;
}

export interface ColumnsAndTasks {
  columns: ColumnObject[];
  tasks: TodoDTO[];
  error: string;
}

export interface UpdatedTaskDTO
  extends Omit<
    TodoDTO,
    "todoId" | "createdAt" | "status" | "sortIndex" | "content"
  > {
  content: string;
  statusId: number;
}
