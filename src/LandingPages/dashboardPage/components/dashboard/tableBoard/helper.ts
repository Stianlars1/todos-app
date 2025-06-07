import { CategorizedTodos } from "@/types/types";

export const getTableBoardColumns = (columnsAndTasks: CategorizedTodos) => {
  return Object.keys(columnsAndTasks);
};
