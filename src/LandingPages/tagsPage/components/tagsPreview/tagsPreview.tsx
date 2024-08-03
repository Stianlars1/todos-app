"use client";
import { TasksAndTagsGroupedType } from "@/app/actions/tags/types";
import { Tag } from "@/components/ui/tag/tags";
import { TodoDTO } from "@/types/types";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";
import styles from "./css/tagsPreview.module.css";
export const TagsPreview = ({
  tasksAndTags,
  activeTag,
  setTasks,
  setActiveTag,
}: {
  tasksAndTags: TasksAndTagsGroupedType;
  activeTag: string | null;
  setTasks: Dispatch<SetStateAction<TodoDTO[] | null>>;
  setActiveTag: Dispatch<SetStateAction<string | null>>;
}) => {
  const text = useTranslations("TagsPage");

  const handleTagClick = (tasks: TodoDTO[], tag: string) => {
    setTasks(tasks);
    setActiveTag(tag);
  };
  return (
    <div className={styles.tagsPreview}>
      <header className={styles.header}>
        <h2 className={styles.title}>{text("tags.title")}</h2>
      </header>
      <ul>
        {tasksAndTags &&
          Object.entries(tasksAndTags).map(([tag, value]) => (
            <Tag
              onClick={() => handleTagClick(value, tag)}
              className={`${styles.tag} ${
                activeTag === tag ? styles.active : ""
              }`}
              key={tag}
              tags={[tag]}
              variant="tag"
            >
              <span className={styles.tagNumber}>{value.length}</span>
            </Tag>
          ))}
      </ul>
    </div>
  );
};
