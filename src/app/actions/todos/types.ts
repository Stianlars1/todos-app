import {
  FilesType,
  StatusCode,
  TagsType,
  TodoDTO,
  TodoPriority,
} from "@/types/types";

export enum StatusId {
  PENDING = 1, // PENDING
  IN_PROGRESS = 2, // IN_PROGRESS
  COMPLETED = 3, // COMPLETED
  ON_HOLD = 4, // ON_HOLD
  CANCELLED = 5, // CANCELLED
  DELETED = 6, // DELETED
  CREATED = 7, // CREATED
}

export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface CreateTodoDTO {
  title?: string;
  description?: string;
  statusId?: StatusId | number;
  priority?: TodoPriority;
  dueDate?: Date;
  files?: FilesType[];
  content?: string;
  tags?: TagsType;
  timezone?: string;
  dashboardIds?: number[];
}

export type UpdatedTodoDTO = CreateTodoDTO;

export interface CreateTodoResponse {
  success: boolean;
  message: string;
  data: TodoDTO;
}

export type UpdateTodoResponse = CreateTodoResponse;

export interface TodoDropType {
  todoId: string;
  statusCode: StatusCode;
}

export const statusCategoryToCodeMapping: Record<string, StatusCode> = {
  pendingTasks: "PENDING",
  inProgressTasks: "IN_PROGRESS",
  completedTasks: "COMPLETED",
  onHoldTasks: "ON_HOLD",
  cancelledTasks: "CANCELLED",
  deletedTasks: "DELETED",
  backlog: "CREATED",
};
