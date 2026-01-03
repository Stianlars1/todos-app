"use server";

import { customFetch, FetchState } from "@/utils/fetch/customFetch";
import { APPLICATION_JSON_V1, HTTP_REQUEST } from "@/utils/fetch/fetch";
import {
  API_DRAG_DROP_CATEGORIZED_UPDATE_ORDER,
  API_DRAG_DROP_TODOS_MOVE,
  API_DRAG_DROP_TODOS_SORT_INDEX,
  API_TODOS_URL,
} from "@/utils/urls";
import {
  MoveTaskProps,
  UpdateColumnOrderDTO,
  UpdateTaskSortIndexProps,
} from "./types";

export const updateTaskSortIndex = async (
  updatedTask: UpdateTaskSortIndexProps,
) => {
  const response = await customFetch<FetchState<undefined>>({
    url: API_DRAG_DROP_TODOS_SORT_INDEX,
    options: {
      method: HTTP_REQUEST.PUT,
      body: JSON.stringify(updatedTask),
    },
    headers: APPLICATION_JSON_V1,
  });

  return response;
};

export const moveTask = async (movedTask: MoveTaskProps) => {
  const response = await customFetch<FetchState<undefined>>({
    url: API_DRAG_DROP_TODOS_MOVE,
    options: {
      method: HTTP_REQUEST.POST,
      body: JSON.stringify(movedTask),
    },
    headers: APPLICATION_JSON_V1,
  });

  console.log(response);

  return response;
};

export const deleteTask = async (todoId: number) => {
  const DELETE_URL = `${API_TODOS_URL}/${todoId}`;
  const response = await customFetch<FetchState<undefined>>({
    url: DELETE_URL,
    options: {
      method: HTTP_REQUEST.DELETE,
    },
    headers: APPLICATION_JSON_V1,
  });

  console.table(response.error);

  return response;
};

export const updateColumnDisplayOrder = async (
  columns: UpdateColumnOrderDTO[],
) => {
  return await customFetch<FetchState<undefined>>({
    url: API_DRAG_DROP_CATEGORIZED_UPDATE_ORDER,
    options: {
      method: HTTP_REQUEST.PUT,
      body: JSON.stringify(columns),
    },
    headers: APPLICATION_JSON_V1,
  });
};
