import { useLocale } from "next-intl";
import { getLocale } from "next-intl/server";

// Auth
export const API_AUTH_URL = "https://app.taskbuddy.dev/api/auth";
export const API_REFRESH_TOKEN_URL =
  "https://app.taskbuddy.dev/api/auth/refresh";

// User
export const API_USER_URL = "https://app.taskbuddy.dev/api/user";
export const API_USER_SETTINGS_URL =
  "https://app.taskbuddy.dev/api/user/settings"; // add /:userId to get a specific user's profile picture (PATCH)
export const API_USER_PREFERENCES =
  "https://app.taskbuddy.dev/api/user/preferences"; // add /:userId to get a specific user's profile picture (PATCH)
export const API_USER_UPDATE_PASSWORD_URL =
  "https://app.taskbuddy.dev/api/user/update-current-password"; // add /:userId to get a specific user's profile picture (PATCH)

// Todos
export const API_TODOS_URL = "https://app.taskbuddy.dev/api/todos"; // GET
export const API_TODOS_DUE_TODAY_URL =
  "https://app.taskbuddy.dev/api/todos/today"; // GET
export const API_TODOS_DUE_TODAY_COUNT_URL =
  "https://app.taskbuddy.dev/api/todos/todays-due-count"; // GET
export const API_TODOS_UPDATE_URL = API_TODOS_URL; // PUT
export const API_TODOS_CREATE_URL = API_TODOS_URL; // POST
export const API_TASKS_URL = API_TODOS_URL; // GET

export const API_TODOS_CATEGORIZED_URL =
  "https://app.taskbuddy.dev/api/todos/categorized"; // GET

// Drag Drop
export const API_DRAG_DROP_TODOS_SORT_INDEX =
  "https://app.taskbuddy.dev/api/drag-drop/tasks/update-sort-index"; // post
export const API_DRAG_DROP_TODOS_MOVE =
  "https://app.taskbuddy.dev/api/drag-drop/tasks/move"; // PUT
export const API_DRAG_DROP_CATEGORIZED_UPDATE_ORDER =
  "https://app.taskbuddy.dev/api/drag-drop/categories/display-order"; // PUT

// Profile pictures
export const API_PROFILE_PICTURES_URL =
  "https://app.taskbuddy.dev/api/profile-pictures"; // add /:userId to get a specific user's profile picture (POST + GET)

// reset password
// forgot password
export const API_PASSWORD_FORGOT_URL =
  "https://app.taskbuddy.dev/api/user/forgot-password";
export const API_PASSWORD_RESET_URL =
  "https://app.taskbuddy.dev/api/user/reset-password";

// Frontend URLS
export const ROOT_URL = "/";
export const LOGIN_URL = "/login";
export const SIGNUP_URL = "/signup";
export const FORGOT_URL = "/forgot-password";

export const useLinkUrl = (href: string) => {
  const locale = useLocale();
  return `/${locale}${href}`;
};

export const getLinkUrl = (href: string) => {
  const locale = getLocale();
  return `/${locale}${href}`;
};
