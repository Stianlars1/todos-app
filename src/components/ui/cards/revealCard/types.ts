import { StatusCode, TodoPriority } from "@/types/types";
import { CSSProperties } from "react";

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
  style?: CSSProperties;
  cardClickEnabled?: boolean;
  onClick?: (event?: any) => void;
}
