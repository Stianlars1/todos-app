"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { CacheKeys } from "./keys";

export const cacheInvalidate = async ({
  cacheKey,
}: {
  cacheKey: CacheKeys;
}) => {
  revalidateTag(cacheKey);

  console.log("\n🟢 Invalidated cache for key: ", cacheKey);
};
export const cacheInvalidatePage = async (path: string) => {
  revalidatePath(path, "page");

  console.log("\n🟢 Invalidated cache for page ");
};
