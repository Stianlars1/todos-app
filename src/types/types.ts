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
  sortIndex: number;
  dashboardIds: number[];
}

export interface SoonDueTodosDTO {
  "Due Today": TodoDTO[];
  "Due Tomorrow": TodoDTO[];
  "Due in 2 Days": TodoDTO[];
  "Due in 3 Days": TodoDTO[];
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

const type = [
  { name: "a", sortIndex: 1 },
  { name: "c", sortIndex: 3 },
  { name: "b", sortIndex: 2 },
  { name: "d", sortIndex: 4 },
  { name: "e", sortIndex: 5 },
];
