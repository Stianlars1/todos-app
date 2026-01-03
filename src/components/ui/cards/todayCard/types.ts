import { StatusCode, TodoPriority } from "@/types/types";
import { ReactNode } from "react";

export interface TodayCardProps {
  title: string;
  description?: string;
  content: ReactNode | null | undefined | string;
  tags?: string[];
  priority?: TodoPriority;
  todoId: number;
  className?: string;
  statusCode?: StatusCode;
  url?: string;
}
