"use client";
import { UserSettingsDTO } from "@/app/actions/user/types";
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
  userSettings: UserSettingsDTO | null;
  draggableColumnEditActive: boolean;
}) => {
  // States

  // texts
  const text = useTranslations("Taskboard.taskCard");

  return <div>TaskContainer</div>;
};
