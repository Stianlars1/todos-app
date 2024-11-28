"use server";
import {cacheInvalidate} from "@/app/lib/cache/cache";
import {CacheKeys} from "@/app/lib/cache/keys";
import {ApiResponse} from "@/types/fetch";
import {TodoDTO} from "@/types/types";
import {customFetch} from "@/utils/fetch/customFetch";
import {APPLICATION_JSON_V1, HTTP_REQUEST} from "@/utils/fetch/fetch";
import {
  API_COLUMNS_AND_TODOS_BY_DASHBOARDNAME_URL,
  API_TASKS_SEARCH,
  API_TODOS_ALL_BY_DASHBOARDNAME,
  API_TODOS_BY_ACTIVE_DASHBOARD,
  API_TODOS_CATEGORIZED_BY_DASHBOARDNAME_URL,
  API_TODOS_CATEGORIZED_URL,
  API_TODOS_CREATE_URL,
  API_TODOS_DUE_TODAY_COUNT_URL,
  API_TODOS_DUE_TODAY_URL,
  API_TODOS_OVERDUE_BY_DASHBOARDNAME_URL,
  API_TODOS_OVERDUE_URL,
  API_TODOS_UPCOMING_DEADLINES_BY_DASHBOARDNAME_URL,
  API_TODOS_UPCOMING_DEADLINES_URL,
  API_TODOS_UPDATE_URL,
  API_TODOS_URL,
} from "@/utils/urls";
import {UpdatedTodoDTO, UpdateTodoResponse} from "./types";
import {getCreateTodoFormData} from "./utils";

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
export const getAllTodosByActiveDashboard = async <T>() => {
  return await customFetch<T>({
    url: API_TODOS_BY_ACTIVE_DASHBOARD,
    options: {
      method: HTTP_REQUEST.GET,
    },
    cacheKey: CacheKeys.ALL_TODOS,
  });
};
export const getAllTodosByDashboardName = async <T>(dashboardName: string) => {
  const url = `${API_TODOS_ALL_BY_DASHBOARDNAME}?dashboardName=${dashboardName}`;
  return await customFetch<T>({
    url: url,
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
export const getUpcomingDeadlinesTodosByDashboardName = async <T>(
  dashboardName: string,
) => {
  const url = `${API_TODOS_UPCOMING_DEADLINES_BY_DASHBOARDNAME_URL}?dashboardName=${dashboardName}`;
  return await customFetch<T>({
    url: url,
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
export const getOverdueTodosByDashboardName = async <T>(
  dashboardName: string,
) => {
  const url = `${API_TODOS_OVERDUE_BY_DASHBOARDNAME_URL}?dashboardName=${dashboardName}`;
  return await customFetch<T>({
    url: url,
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
export const searchTodos = async <T>(keyword: string) => {
  const url = `${API_TASKS_SEARCH}?keyword=${keyword}`;
  return await customFetch<ApiResponse<TodoDTO[]>>({
    url: url,
    options: {
      method: HTTP_REQUEST.GET,
    },

    cacheKey: CacheKeys.TODOS_SEARCH,
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
export const getCategorizedTodosByDashboardName = async <T>(
  dashboardName: string,
) => {
  const url = `${API_TODOS_CATEGORIZED_BY_DASHBOARDNAME_URL}?dashboardName=${dashboardName}`;
  const categorized = await customFetch<T>({
    url: url,
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

export const getColumnsAndTasks = async <T>(dashboardName: string) => {
  const url = `${API_COLUMNS_AND_TODOS_BY_DASHBOARDNAME_URL}?dashboardName=${dashboardName}`;
  const categorized = await customFetch<T>({
    url: url,
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

  console.dir("\n\n== getColumnsAndTasks ==");
  console.log(categorized.data);

  return { ...categorized, error: error };
};

export const updateTodo = async (
  todoId: string,
  updatedTodo: UpdatedTodoDTO,
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
  const newTags = formData.get("tags")
    ? (formData.get("tags") as string)
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "")
    : undefined;
  const UPDATE_URL = `${API_TODOS_UPDATE_URL}/${todoId}`;
  const updatedTodo = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    statusId: parseInt(formData.get("statusId") as string),
    dueDate: new Date(formData.get("dueDate") as string) ?? undefined,
    priority: formData.get("priority") as string,
    content: formData.get("content") as string,
    tags: newTags,
    // tags: JSON.parse(formData.get("tags") as string),
    dashboardIds:
      [parseInt(formData.get("dashboardIds") as string)] || undefined,
  };

  formData.append("todo", JSON.stringify(updatedTodo));

  const response = await customFetch<UpdateTodoResponse>({
    url: UPDATE_URL,
    options: {
      method: HTTP_REQUEST.PUT,
      body: formData,
    },
    revalidate: 0,
  });

  if (response.isSuccess) {
    await cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });
    await cacheInvalidate({ cacheKey: CacheKeys.ALL_TODOS });
    await cacheInvalidate({ cacheKey: CacheKeys.ALL_TASKS_AND_TAGS_GROUPED });
    await cacheInvalidate({ cacheKey: CacheKeys.ALL_TAGS });
  }

  return response;
};

export const createTodo = async (
  __initialState: unknown,
  formData: FormData,
) => {
  const updatedTodo = getCreateTodoFormData(formData);
  const formDataDTO = new FormData();
  formDataDTO.append("todo", JSON.stringify(updatedTodo));

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
