// val categoryCode: String,
// val newDisplayOrder: Int

import { updateColumnDisplayOrder } from "@/app/actions/dragDrop/fetch";
import { UpdateColumnOrderDTO } from "@/app/actions/dragDrop/types";
import { CreateTaskTextsProps } from "@/components/createTodo/createTask";
import { StatusCodes } from "@/types/todo/types";
import { TodoDTO } from "@/types/types";
import { NodeDragEventData, NodeTouchEventData } from "@formkit/drag-and-drop";
import { getTranslations } from "next-intl/server";
import { ColumnListDND } from "./types";

export const COLUMN_GROUP = "ColumnsList";
export const TASKCARD_GROUP = "TasksList";
export const DELETE_GROUP = "DeleteList";

export const convertColumnsListToHandleUp = (
  columns: ColumnListDND[]
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
  data: NodeDragEventData<TodoDTO> | NodeTouchEventData<TodoDTO>
) => {
  return data.targetData.parent.el.attributes.getNamedItem("data-column-status")
    ?.value as StatusCodes;
};
export const getNewTaskList = (
  data: NodeDragEventData<TodoDTO> | NodeTouchEventData<TodoDTO>
) => {
  return data.targetData.parent.data.getValues(data.targetData.parent.el);
};
export const getOldTaskIndex = (
  tasks: TodoDTO[],
  data: NodeDragEventData<TodoDTO> | NodeTouchEventData<TodoDTO>
) => {
  const currentTask = data.targetData.node.data.value;
  return tasks.findIndex((task) => task.todoId === currentTask.todoId);
};
export const getNewTaskIndex = (
  data: NodeDragEventData<TodoDTO> | NodeTouchEventData<TodoDTO>
) => {
  const newList: TodoDTO[] = data.targetData.parent.data.getValues(
    data.targetData.parent.el
  );
  const currentTask: TodoDTO = data.targetData.node.data.value;
  return newList.findIndex((task) => task.todoId === currentTask.todoId);
};

export const getTodoId = (
  data: NodeDragEventData<TodoDTO> | NodeTouchEventData<TodoDTO>
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
  // did the order change
  return oldList.some((oldColumn, index) => {
    return oldColumn.column !== newList[index].column;
  });
};

export const getCategorizedTodosTexts = async () => {
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
export const getTaskboardTexts = async () => {
  const text = await getTranslations("Taskboard");
  console.log("Taskboard texts", text);
  const Texts = {
    header: {
      sortSwitchTitle: text("header.sortSwitch"),
      title: text("header.title"),
    },
  } as { header: { sortSwitchTitle: string; title: string } };
  console.log("Taskboard Texts", Texts);
  return Texts;
};

export const getCreateTodosTexts = async () => {
  const texts = await getTranslations("Create-task");

  const messageObject: CreateTaskTextsProps = {
    header: {
      title: texts("header.title"),
      description: texts("header.description"),
    },
    form: {
      title: {
        label: texts("form.title.label"),
        placeholder: texts("form.title.placeholder"),
      },
      description: {
        label: texts("form.description.label"),
        placeholder: texts("form.description.placeholder"),
      },
      status: {
        label: texts("form.status.label"),
        options: {
          CREATED: texts("form.status.options.CREATED"),
          PENDING: texts("form.status.options.PENDING"),
          IN_PROGRESS: texts("form.status.options.IN_PROGRESS"),
          COMPLETED: texts("form.status.options.COMPLETED"),
          ON_HOLD: texts("form.status.options.ON_HOLD"),
          CANCELLED: texts("form.status.options.CANCELLED"),
          DELETED: texts("form.status.options.DELETED"),
        },
      },
      priority: {
        label: texts("form.priority.label"),
        options: {
          LOW: texts("form.priority.options.LOW"),
          MEDIUM: texts("form.priority.options.MEDIUM"),
          HIGH: texts("form.priority.options.HIGH"),
        },
      },
      dueDate: {
        label: texts("form.dueDate.label"),
        placeholder: texts("form.dueDate.placeholder"),
      },
      content: {
        label: texts("form.content.label"),
      },
      tags: {
        label: texts("form.tags.label"),
        placeholder: texts("form.tags.placeholder"),
      },
    },
    submit: {
      title: texts("submit.title"),
      loadingTitle: texts("submit.loadingTitle"),
    },
  };

  return messageObject;
};
