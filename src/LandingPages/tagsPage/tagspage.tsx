import { getTasksByTagsGrouped } from "@/app/actions/tags/api";
import { getUserSettings } from "@/app/actions/user/userApi";
import { getTranslations } from "next-intl/server";
import { ShowTaskModalContainer } from "../dashboardPage/components/showTaskModal/showTaskModal";
import { TagsHero } from "./components/tagsHero/tagsHero";
import styles from "./css/tagsPage.module.css";
export const TagsPage = async () => {
  const { data: TasksAndTags } = await getTasksByTagsGrouped();

  const { data: userSettings } = await getUserSettings();
  console.log("incoming tags: ", TasksAndTags);
  const text = await getTranslations("TagsPage");
  return (
    <div className={styles.tagsPage}>
      <header className={styles.header}>
        <h1>{text("header.title")}</h1>
      </header>

      {/* <TagsContainer userSettings={userSettings ?? undefined} tags={tags} /> */}
      <TagsHero tasksAndTags={TasksAndTags} />
      <ShowTaskModalContainer
        redirectUrl="tags"
        userSettings={userSettings ?? undefined}
      />
    </div>
  );
};
