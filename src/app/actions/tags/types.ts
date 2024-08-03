import { TodoDTO } from "@/types/types";

export interface TasksAndTagsGroupedType {
  [key: string]: TodoDTO[];
}
