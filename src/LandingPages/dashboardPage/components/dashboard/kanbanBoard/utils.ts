// val categoryCode: String,
// val newDisplayOrder: Int

import { updateColumnDisplayOrder } from "@/app/actions/dragDrop/fetch";
import { UpdateColumnOrderDTO } from "@/app/actions/dragDrop/types";
import { StatusCodes } from "@/types/todo/types";
import { LanguageType } from "@/app/actions/user/types";
import { format } from "date-fns";
import { enUS, nb } from "date-fns/locale";

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

const getLocale = (language: LanguageType) => {
  return language === "nb" ? nb : enUS;
};

export const formatDate = (date: Date | string, language: LanguageType) => {
  const dateObject = typeof date === "string" ? new Date(date) : date;

  // 'dd.MM.yyyy' for Norwegian (11.01.1997)
  // 'MM/dd/yyyy' for English (01/11/1997)
  const formatString = language === "nb" ? "dd.MM.yyyy" : "MM/dd/yyyy";

  return format(dateObject, formatString, {
    locale: getLocale(language),
  });
};
