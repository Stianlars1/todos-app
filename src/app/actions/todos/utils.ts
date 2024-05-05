import { CreateTodoDTO, Priority, StatusId } from "./types";

export const getCreateTodoFormData = (formData: FormData): CreateTodoDTO => {
  console.log("\n\n\n\n 🟢 == getCreateTodoFormData called == \nformData:\n ");

  console.log("FormData Keys:", Array.from(formData.keys()));

  // Convert and log the values
  console.log("FormData Values:", Array.from(formData.values()));

  // Convert and log the entries
  console.log("FormData Entries:", Array.from(formData.entries()));
  return {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    statusId: formData.get("statusId")
      ? (parseInt(formData.get("statusId") as string) as StatusId)
      : StatusId.CREATED,
    priority: formData.get("priority")
      ? (formData.get("priority") as Priority)
      : undefined,
    dueDate: formData.get("dueDate")
      ? new Date(formData.get("dueDate") as string)
      : undefined,
    content: formData.get("content") as string,
    tags: formData.get("tags")
      ? (formData.get("tags") as string).split(",")
      : undefined, // Assuming tags are comma-separated if multiple
  };
};
