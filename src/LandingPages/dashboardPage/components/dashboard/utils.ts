import { useTranslations } from "next-intl";
import { StatusCodes } from "@/types/todo/types";
import { GetCategorizedTodosTexts } from "@/LandingPages/dashboardPage/components/dashboard/kanbanBoard/utils";

export const useColumnHeadersTexts = (): GetCategorizedTodosTexts => {
  const text = useTranslations("Categorized Todos");
  return {
    CREATED: text("CREATED"),
    PENDING: text("PENDING"),
    IN_PROGRESS: text("IN_PROGRESS"),
    COMPLETED: text("COMPLETED"),
    ON_HOLD: text("ON_HOLD"),
    CANCELLED: text("CANCELLED"),
    DELETED: text("DELETED"),
  } as { [key in StatusCodes]: string };
};
