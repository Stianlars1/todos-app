import { useLocale } from "next-intl";
import { getLocale } from "next-intl/server";

// Auth
export const API_AUTH_URL = "https://app.taskbuddy.dev/api/auth";
export const API_REFRESH_TOKEN_URL =
  "https://app.taskbuddy.dev/api/auth/refresh";

// User
export const API_USER_URL = "https://app.taskbuddy.dev/api/user";
export const API_DELETE_USER_URL = "https://app.taskbuddy.dev/api/user";
export const API_USER_SETTINGS_URL =
  "https://app.taskbuddy.dev/api/user/settings"; // add /:userId to get a specific user's profile picture (PATCH)
export const API_USER_PREFERENCES =
  "https://app.taskbuddy.dev/api/user/preferences"; // add /:userId to get a specific user's profile picture (PATCH)
export const API_USER_UPDATE_PASSWORD_URL =
  "https://app.taskbuddy.dev/api/user/update-current-password"; // add /:userId to get a specific user's profile picture (PATCH)
export const API_USER_PASSWORD_MATCH_URL =
  "https://app.taskbuddy.dev/api/user/password-match"; // add /:userId to get a specific user's profile picture (PATCH)

// Todos
export const API_TODOS_URL = "https://app.taskbuddy.dev/api/todos"; // GET
export const API_TODOS_BY_ACTIVE_DASHBOARD =
  "https://app.taskbuddy.dev/api/todos/by-active-dashboard"; // GET
export const API_TODOS_ALL_BY_DASHBOARDNAME =
  "https://app.taskbuddy.dev/api/todos/by-dashboard-name"; // GET
export const API_TASKS_SEARCH = "https://app.taskbuddy.dev/api/todos/search"; // GET
export const API_TODOS_UPCOMING_DEADLINES_URL =
  "https://app.taskbuddy.dev/api/todos/upcoming-deadlines"; // GET
export const API_TODOS_UPCOMING_DEADLINES_BY_DASHBOARDNAME_URL =
  "https://app.taskbuddy.dev/api/todos/upcoming-deadlines-by-dashboard-name"; // GET
export const API_TODOS_OVERDUE_URL =
  "https://app.taskbuddy.dev/api/todos/overdue"; // GET
export const API_TODOS_OVERDUE_BY_DASHBOARDNAME_URL =
  "https://app.taskbuddy.dev/api/todos/overdue-by-dashboard-name"; // GET
export const API_TODOS_DUE_TODAY_URL =
  "https://app.taskbuddy.dev/api/todos/today"; // GET
export const API_TODOS_DUE_TODAY_COUNT_URL =
  "https://app.taskbuddy.dev/api/todos/todays-due-count"; // GET
export const API_TODOS_UPDATE_URL = API_TODOS_URL; // PUT
export const API_TODOS_CREATE_URL = API_TODOS_URL; // POST
export const API_TASKS_URL = API_TODOS_URL; // GET

export const API_TODOS_CATEGORIZED_URL =
  "https://app.taskbuddy.dev/api/todos/categorized"; // GET
export const API_TODOS_CATEGORIZED_BY_DASHBOARDNAME_URL =
  "https://app.taskbuddy.dev/api/todos/categorized-by-dashboard-name"; // GET

// Tags
export const API_ALL_TAGS = "https://app.taskbuddy.dev/api/todos/all-tags"; // GET
export const API_TASKS_AND_TAGS_GROUPED =
  "https://app.taskbuddy.dev/api/todos/tags-and-tasks"; // GET
export const API_TAG_SEARCH = "https://app.taskbuddy.dev/api/todos/by-tag"; // GET with ?tagName=<tagname>

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

// DASHBOARDS
export const API_DASHBOARD_URL = "https://app.taskbuddy.dev/api/dashboards";
export const API_DASHBOARD_UPDATE_URL =
  "https://app.taskbuddy.dev/api/dashboards/update";
export const API_DASHBOARD_DELETE_URL =
  "https://app.taskbuddy.dev/api/dashboards/delete";
export const API_DASHBOARD_ONLY_URL =
  "https://app.taskbuddy.dev/api/dashboards/only";
export const API_DASHBOARD_UPDATE_ID_URL =
  "https://app.taskbuddy.dev/api/dashboards/update-active-dashboard";

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
