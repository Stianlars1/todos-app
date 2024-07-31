import { getTags } from "@/app/actions/tags/api";
import { getUserSettings } from "@/app/actions/user/userApi";
import { ShowTaskModalContainer } from "../dashboardPage/components/showTaskModal/showTaskModal";
import { TagsHero } from "./components/tagsHero/tagsHero";

export const TagsPage = async () => {
  const { data: tags } = await getTags();
  const { data: userSettings } = await getUserSettings();
  console.log("incoming tags: ", tags);
  return (
    <>
      <h1>-- This is the Tags page __</h1>

      {/* <TagsContainer userSettings={userSettings ?? undefined} tags={tags} /> */}
      <TagsHero tags={tags} userSettings={userSettings ?? undefined} />
      <ShowTaskModalContainer
        redirectUrl="tags"
        userSettings={userSettings ?? undefined}
      />
    </>
  );
};
