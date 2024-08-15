// val categoryCode: String,
// val newDisplayOrder: Int

import { updateColumnDisplayOrder } from "@/app/actions/dragDrop/fetch";
import { UpdateColumnOrderDTO } from "@/app/actions/dragDrop/types";
import { StatusCodes } from "@/types/todo/types";
import { TodoDTO } from "@/types/types";
import { NodeDragEventData, NodeTouchEventData } from "@formkit/drag-and-drop";
import { getTranslations } from "next-intl/server";
import { ColumnListDND } from "./types";

export const COLUMN_GROUP = "ColumnsList";
export const TASKCARD_GROUP = "TasksList";
export const DELETE_GROUP = "DeleteList";

export const convertColumnsListToHandleUp = (
  columns: ColumnListDND[],
): StatusCodes[] => {
  const converted = columns.map((column) => {
    return column.column as StatusCodes;
  });

  return converted;
};

export const handleUpdateColumnsOrder = async (columns: ColumnListDND[]) => {
  const converted: UpdateColumnOrderDTO[] = columns.map((column) => ({
    categoryCode: column.column,
    newDisplayOrder: columns.indexOf(column) + 1,
  }));

  const responseFromAction = await updateColumnDisplayOrder(converted);

  return responseFromAction;
};

export const getNewCategoryCode = (
  data: NodeDragEventData<TodoDTO> | NodeTouchEventData<TodoDTO>,
) => {
  return data.targetData.parent.el.attributes.getNamedItem("data-column-status")
    ?.value as StatusCodes;
};
export const getNewTaskList = (
  data: NodeDragEventData<TodoDTO> | NodeTouchEventData<TodoDTO>,
) => {
  return data.targetData.parent.data.getValues(data.targetData.parent.el);
};
export const getOldTaskIndex = (
  tasks: TodoDTO[],
  data: NodeDragEventData<TodoDTO> | NodeTouchEventData<TodoDTO>,
) => {
  const currentTask = data.targetData.node.data.value;
  return tasks.findIndex((task) => task.todoId === currentTask.todoId);
};
export const getNewTaskIndex = (
  data: NodeDragEventData<TodoDTO> | NodeTouchEventData<TodoDTO>,
) => {
  const newList: TodoDTO[] = data.targetData.parent.data.getValues(
    data.targetData.parent.el,
  );
  const currentTask: TodoDTO = data.targetData.node.data.value;
  return newList.findIndex((task) => task.todoId === currentTask.todoId);
};

export const getTodoId = (
  data: NodeDragEventData<TodoDTO> | NodeTouchEventData<TodoDTO>,
) => {
  return data.targetData.node.data.value.todoId;
};

export const didCategoryIndexChange = ({
  oldList,
  newList,
}: {
  oldList: ColumnListDND[];
  newList: ColumnListDND[];
}) => {
  return oldList.some((oldColumn, index) => {
    return oldColumn.column !== newList[index].column;
  });
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

export type GetTaskboardTexts = {
  header: {
    sortSwitchTitle: string;
    title: string;
  };
};
export const getTaskboardTexts = async (): Promise<GetTaskboardTexts> => {
  const text = await getTranslations("Taskboard");
  const Texts = {
    header: {
      sortSwitchTitle: text("header.sortSwitch"),
      title: text("header.title"),
    },
  } as { header: { sortSwitchTitle: string; title: string } };
  return Texts;
};
