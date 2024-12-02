"use client";
import { UserSettings } from "@/app/actions/user/types";
import { StatusCodes } from "@/types/todo/types";
import { TodoDTO } from "@/types/types";
import { useTranslations } from "next-intl";

export const TaskContainer = ({
  column,
  tasks,
  userSettings,
  draggableColumnEditActive,
}: {
  column: StatusCodes;
  tasks: TodoDTO[];
  userSettings: UserSettings;
  draggableColumnEditActive: boolean;
}) => {
  // States

  // texts
  const text = useTranslations("TaskboardtaskCard");

  return <div>TaskContainer</div>;
};
