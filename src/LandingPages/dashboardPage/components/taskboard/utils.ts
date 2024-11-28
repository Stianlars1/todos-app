// val categoryCode: String,
// val newDisplayOrder: Int

import {updateColumnDisplayOrder} from "@/app/actions/dragDrop/fetch";
import {UpdateColumnOrderDTO} from "@/app/actions/dragDrop/types";
import {StatusCodes} from "@/types/todo/types";
import {getTranslations} from "next-intl/server";

export const COLUMN_GROUP = "ColumnsList";
export const TYPE_COLUMN = "COLUMN";
export const TYPE_TASK = "TASK";
export const TASKCARD_GROUP = "TasksList";
export const DELETE_GROUP = "DeleteList";

export const handleUpdateColumnsOrder = async (columns: StatusCodes[]) => {
  const converted: UpdateColumnOrderDTO[] = columns.map((column) => ({
    categoryCode: column,
    newDisplayOrder: columns.indexOf(column) + 1,
  }));

  return await updateColumnDisplayOrder(converted);
};

export type GetCategorizedTodosTexts = {
  [key in StatusCodes]: string;
};
export const getCategorizedTodosTexts =
  async (): Promise<GetCategorizedTodosTexts> => {
    const text = await getTranslations("Categorized Todos");
    const headerColumnsTexts = {
      CREATED: text("CREATED"),
      PENDING: text("PENDING"),
      IN_PROGRESS: text("IN_PROGRESS"),
      COMPLETED: text("COMPLETED"),
      ON_HOLD: text("ON_HOLD"),
      CANCELLED: text("CANCELLED"),
      DELETED: text("DELETED"),
    } as { [key in StatusCodes]: string };
    return headerColumnsTexts;
  };
