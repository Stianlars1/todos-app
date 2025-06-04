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
    dashboardIds: (() => {
      const dashboardIdStrings = formData.getAll("dashboardIds") as string[];
      if (dashboardIdStrings.length === 0) return undefined;

      const parsedIds = dashboardIdStrings
        .map((id) => parseInt(id))
        .filter((id) => !isNaN(id));

      return parsedIds.length > 0 ? parsedIds : undefined;
    })(),
  };
};

const getLocalTimezone = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return timezone;
};
