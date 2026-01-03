"use server";

import { CacheKeys } from "@/app/lib/cache/keys";
import { ApiResponse } from "@/types/fetch";
import { TodoDTO } from "@/types/types";
import { customFetch } from "@/utils/fetch/customFetch";
import { APPLICATION_JSON_V1, HTTP_REQUEST } from "@/utils/fetch/fetch";
import {
  API_ALL_TAGS,
  API_TAG_SEARCH,
  API_TASKS_AND_TAGS_GROUPED,
} from "@/utils/urls";
import { TasksAndTagsGroupedType } from "./types";

export const getTags = async () => {
  const tagsResponse = await customFetch<ApiResponse<string[] | null>>({
    url: API_ALL_TAGS,
    options: {
      method: HTTP_REQUEST.GET,
    },
    headers: APPLICATION_JSON_V1,
    cacheKey: CacheKeys.ALL_TAGS,
    revalidate: 0,
  });

  let error = "";
  if (tagsResponse.isError) {
    error = "Couldn't find tags";
  }

  if (tagsResponse.data?.data === 0) {
    error = "No tags found";
  }

  const data = tagsResponse.data?.data;
  return { data, error: error };
};
export const getTasksByTagsGrouped = async () => {
  const tagsResponse = await customFetch<ApiResponse<TasksAndTagsGroupedType>>({
    url: API_TASKS_AND_TAGS_GROUPED,
    options: {
      method: HTTP_REQUEST.GET,
    },
    headers: APPLICATION_JSON_V1,
    cacheKey: CacheKeys.ALL_TASKS_AND_TAGS_GROUPED,
    revalidate: 0,
  });

  let error = "";
  if (tagsResponse.isError) {
    error = "Couldn't find tags";
  }

  if (tagsResponse.data?.data === 0) {
    error = "No tags found";
  }

  const data = tagsResponse.data?.data;
  return { data, error: error };
};

export const findTasksByTag = async (state: unknown, formData: FormData) => {
  const tagName = formData.get("tagName") as string;
  const tasksResponse = await customFetch<ApiResponse<TodoDTO[]>>({
    url: `${API_TAG_SEARCH}?tagName=${tagName}`,
    options: {
      method: HTTP_REQUEST.GET,
    },
    headers: APPLICATION_JSON_V1,
    cacheKey: CacheKeys.TODOS_BY_TAGNAME,
    revalidate: 0,
  });

  let error = "";
  if (tasksResponse.isError) {
    error = "Couldn't find todos by tagName";
  }

  if (tasksResponse.data?.data.length === 0) {
    error = "No todos with this tagName";
  }

  const data = tasksResponse.data;
  return { data, error: error };
};
