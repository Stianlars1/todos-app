// val categoryCode: String,
// val newDisplayOrder: Int

import { updateColumnDisplayOrder } from "@/app/actions/dragDrop/fetch";
import { UpdateColumnOrderDTO } from "@/app/actions/dragDrop/types";
import { StatusCodes } from "@/types/todo/types";
import { ColumnListDND } from "./types";

export const COLUMN_GROUP = "ColumnsList";
export const TASKCARD_GROUP = "TasksList";

export const convertColumnsListToHandleUp = (
  columns: ColumnListDND[]
): StatusCodes[] => {
  const converted = columns.map((column) => {
    return column.column as StatusCodes;
  });

  return converted;
};

export const handleUpdateColumnsOrder = async (columns: ColumnListDND[]) => {
  console.log("=== handleUpdateColumnsOrder ===");
  const converted: UpdateColumnOrderDTO[] = columns.map((column) => ({
    categoryCode: column.column,
    newDisplayOrder: columns.indexOf(column) + 1,
  }));
  console.log("Updating columns order", converted);

  const responseFromAction = await updateColumnDisplayOrder(converted);
  console.log("Response from handleUpdateColumnsOrder", responseFromAction);

  return responseFromAction;
};
