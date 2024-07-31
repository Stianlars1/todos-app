"use client";
import { UserSettingsDTO } from "@/app/actions/user/types";
import { TodoDTO } from "@/types/types";
import { useState } from "react";
import { TagsInputSearch } from "../tagsInputSearch/tagsInputSearch";
import { TagsPreview } from "../tagsPreview/tagsPreview";
import { TasksResults } from "../tasksResults/taskResults";

export const TagsHero = ({
  tags,
  userSettings,
}: {
  tags: string[] | null;
  userSettings: UserSettingsDTO | undefined;
}) => {
  const [tasks, setTasks] = useState<TodoDTO[] | null>(null);
  return (
    <>
      <TagsInputSearch userSettings={userSettings} setTasks={setTasks} />
      {/* <TagsContainer userSettings={userSettings ?? undefined} tags={tags} /> */}
      <TasksResults userSettings={userSettings ?? undefined} tasks={tasks} />
      <TagsPreview tags={tags} />
    </>
  );
};
