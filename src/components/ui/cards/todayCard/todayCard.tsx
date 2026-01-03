"use client";
import { Priority } from "@/app/actions/todos/types";
import { useRouter } from "next/navigation";
import { ClickIcon } from "../../icons/icons";
import { Tag } from "../../tag/tags";
import "./css/todayCard.css";
import { TodayCardProps } from "./types";

export const TodayCard = ({
  title,
  priority,
  className = " ",
  url,
}: TodayCardProps) => {
  const router = useRouter();
  const openTask = () => {
    url && router.push(url, undefined);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`today-card ${className} today-card-simple`}
      onClick={openTask}
    >
      <div className="today-card__wrapper">
        <div className="today-card__wrapper__header" onClick={stopPropagation}>
          <h3>{title}</h3>
        </div>
        <div className="tagWrapper" onClick={stopPropagation}>
          <Tag priority={priority as Priority} variant="priority" />
        </div>
        <ClickIcon className={`today-card__wrapper__expand-chevron`} />
      </div>
    </div>
  );
};
