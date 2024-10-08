import { CreateTodoDTO, Priority, StatusId } from "./types";

export const getCreateTodoFormData = (formData: FormData): CreateTodoDTO => {
  return {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    statusId: formData.get("statusId")
      ? (parseInt(formData.get("statusId") as string) as StatusId)
      : StatusId.CREATED,
    priority: formData.get("priority")
      ? (formData.get("priority") as Priority)
      : undefined,
    dueDate: (formData.get("dueDate") as string)
      ? new Date(formData.get("dueDate") as string)
      : undefined,
    content: formData.get("content") as string,
    tags: formData.get("tags")
      ? (formData.get("tags") as string).split(",")
      : undefined,
    timezone: getLocalTimezone(),
    dashboardIds:
      [parseInt(formData.get("dashboardIds") as string)] || undefined,
  };
};

const getLocalTimezone = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return timezone;
};
