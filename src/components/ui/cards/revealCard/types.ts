import { StatusCode, TodoPriority } from "@/types/types";

export interface RevealCardProps {
  title: string;
  description?: string;
  content: JSX.Element | null | undefined | string;
  tags?: string[];
  priority?: TodoPriority;
  todoId: number;
  className?: string;
  statusCode?: StatusCode;
  url?: string;
}
