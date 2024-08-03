"use client";
import { TasksAndTagsGroupedType } from "@/app/actions/tags/types";
import { TodoDTO } from "@/types/types";
import { useState } from "react";
import { TagsPreview } from "../tagsPreview/tagsPreview";
import { TaskPreview } from "../taskPreview/taskPreview";

export const TagsHero = ({
  tasksAndTags,
}: {
  tasksAndTags: TasksAndTagsGroupedType;
}) => {
  const [tasks, setTasks] = useState<TodoDTO[] | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  return (
    <>
      <TagsPreview
        activeTag={activeTag}
        setActiveTag={setActiveTag}
        setTasks={setTasks}
        tasksAndTags={tasksAndTags}
      />
      <TaskPreview tasks={tasks} />
    </>
  );
};
