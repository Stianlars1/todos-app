import { Priority } from "@/app/actions/todos/types";

export interface TodoDTO {
  todoId: number;
  title: string;
  description?: string;
  status: TodoStatus;
  priority?: TodoPriority;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  files?: FilesType;
  content?: string;
  tags: TagsType;
}

export type TodoPriority = Priority | undefined;

export interface CategorizedTodos {
  backlog: TodoDTO[];
  upcomingDeadlines: TodoDTO[];
  completedTasks: TodoDTO[];
  pendingTasks: TodoDTO[];
  inProgressTasks: TodoDTO[];
  onHoldTasks: TodoDTO[];
  cancelledTasks: TodoDTO[];
  deletedTasks: TodoDTO[];
}

export interface CategorizedTodosDTO {
  success: boolean;
  message: string;
  data: CategorizedTodos;
}

export type TagsType = string[];
export type FilesType = FileDTO[];
export type FileDTO = {
  fileId: number;
  fileName: string;
  mimeType: string;
  fileSize: number;
  uploadedAt: Date;
  fileData: any;
};
export type status = TodoStatus;
export type TodoStatus = {
  statusId: number;
  statusCode: StatusCode;
  statusName: string;
  description: string;
};

export type StatusCode =
  | "CREATED"
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ON_HOLD"
  | "CANCELLED"
  | "DELETED";
