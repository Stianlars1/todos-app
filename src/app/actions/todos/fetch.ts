"use server";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { TodoDTO } from "@/types/types";
import { customFetch } from "@/utils/fetch/customFetch";
import { APPLICATION_JSON_V1, HTTP_REQUEST } from "@/utils/fetch/fetch";
import {
  API_TODOS_CATEGORIZED_URL,
  API_TODOS_CREATE_URL,
  API_TODOS_DUE_TODAY_COUNT_URL,
  API_TODOS_DUE_TODAY_URL,
  API_TODOS_OVERDUE_URL,
  API_TODOS_UPCOMING_DEADLINES_URL,
  API_TODOS_UPDATE_URL,
  API_TODOS_URL,
} from "@/utils/urls";
import { getTranslations } from "next-intl/server";
import { UpdateTodoResponse, UpdatedTodoDTO } from "./types";
import { getCreateTodoFormData } from "./utils";

export const getTodoById = async (todoId: string) => {
  const API_TODO_URL = `${API_TODOS_URL}/${todoId}`;
  const todoResponse = await customFetch<TodoDTO>({
    url: API_TODO_URL,
    options: {
      method: HTTP_REQUEST.GET,
    },
    revalidate: 0,
  });

  return todoResponse;
};

export const getAllTodos = async <T>() => {
  return await customFetch<T>({
    url: API_TODOS_URL,
    options: {
      method: HTTP_REQUEST.GET,
    },
    cacheKey: CacheKeys.ALL_TODOS,
  });
};
export const getUpcomingDeadlinesTodos = async <T>() => {
  return await customFetch<T>({
    url: API_TODOS_UPCOMING_DEADLINES_URL,
    options: {
      method: HTTP_REQUEST.GET,
    },
    cacheKey: CacheKeys.ALL_TODOS,
  });
};
export const getOverdueTodos = async <T>() => {
  return await customFetch<T>({
    url: API_TODOS_OVERDUE_URL,
    options: {
      method: HTTP_REQUEST.GET,
    },
    cacheKey: CacheKeys.ALL_TODOS,
  });
};
export const getTodosDueToday = async <T>() => {
  return await customFetch<T>({
    url: API_TODOS_DUE_TODAY_URL,
    options: {
      method: HTTP_REQUEST.GET,
    },

    cacheKey: CacheKeys.TODOS_TODAY,
  });
};
export const getTodosDueTodayCount = async <T>() => {
  return await customFetch<T>({
    url: API_TODOS_DUE_TODAY_COUNT_URL,
    options: {
      method: HTTP_REQUEST.GET,
    },
    cacheKey: CacheKeys.TODOS_TODAY_COUNT,
  });
};
export const getCategorizedTodos = async <T>() => {
  const categorized = await customFetch<T>({
    url: API_TODOS_CATEGORIZED_URL,
    options: {
      method: HTTP_REQUEST.GET,
    },
    headers: APPLICATION_JSON_V1,
    cacheKey: CacheKeys.CATEGORIZED_TODOS,
    revalidate: 0,
  });

  let error = "";
  if (categorized.isError) {
    error = "Couldn't load todos";
  }

  return { ...categorized, error: error };
};

export const updateTodo = async (
  todoId: string,
  updatedTodo: UpdatedTodoDTO
) => {
  const UPDATE_URL = `${API_TODOS_UPDATE_URL}/${todoId}`;
  const formData = new FormData();
  formData.append("todo", JSON.stringify(updatedTodo));

  return await customFetch<UpdateTodoResponse>({
    url: UPDATE_URL,
    options: {
      method: HTTP_REQUEST.PUT,
      body: formData,
    },
  });
};
export const updateTodoForm = async (_state: unknown, formData: FormData) => {
  const todoId = formData.get("todoId") as string;

  const UPDATE_URL = `${API_TODOS_UPDATE_URL}/${todoId}`;
  const updatedTodo = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    statusId: parseInt(formData.get("statusId") as string),
    dueDate: new Date(formData.get("dueDate") as string) ?? undefined,
    priority: formData.get("priority") as string,
    content: formData.get("content") as string,
    // tags: JSON.parse(formData.get("tags") as string),
  };

  formData.append("todo", JSON.stringify(updatedTodo));

  return await customFetch<UpdateTodoResponse>({
    url: UPDATE_URL,
    options: {
      method: HTTP_REQUEST.PUT,
      body: formData,
    },
  });
};

export const createTodo = async (
  __initialState: unknown,
  formData: FormData
) => {
  console.log("\n\n\n\n 🟢 == CREATE TODO CALLED == ");
  const updatedTodo = getCreateTodoFormData(formData);
  const formDataDTO = new FormData();
  formDataDTO.append("todo", JSON.stringify(updatedTodo));
  const text = await getTranslations("Toasts");

  console.log("\n 🟢updatedTodo", updatedTodo);

  const uploadResponse = await customFetch<TodoDTO>({
    url: API_TODOS_CREATE_URL,
    options: {
      method: HTTP_REQUEST.POST,
      body: formDataDTO,
    },
  });

  if (uploadResponse.isError) {
    console.error("\n 🔴 Error creating todo", uploadResponse.error);
  }

  await cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });

  return uploadResponse;
};
