import { StatusCodes } from "@/types/todo/types";
import { TodoDTO } from "@/types/types";

export interface ColumnListDND {
  column: StatusCodes;
  tasks: TodoDTO[];
}

export type HandleUpdateColumnOrderProps = StatusCodes[];
