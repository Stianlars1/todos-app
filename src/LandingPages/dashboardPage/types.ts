import { TodoDTO } from "@/types/types";

export interface CategorizedTodosFiltered {
  backlog?: TodoDTO[];
  inProgressTasks?: TodoDTO[];
  completedTasks?: TodoDTO[];
}

export type CategoryString = keyof CategorizedTodosFiltered;
