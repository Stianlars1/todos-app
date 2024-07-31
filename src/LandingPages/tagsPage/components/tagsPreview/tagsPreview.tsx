import { Tag } from "@/components/ui/tag/tags";

export const TagsPreview = ({ tags }: { tags: string[] | null }) => {
  return (
    <>
      {tags &&
        tags.length > 0 &&
        tags.map((tag: string) => <Tag key={tag} tags={[tag]} variant="tag" />)}
    </>
  );
};
