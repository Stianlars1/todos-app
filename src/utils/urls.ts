// Auth
export const API_AUTH_URL = "https://app.taskbuddy.dev/api/auth";
export const API_REFRESH_TOKEN_URL =
  "https://app.taskbuddy.dev/api/auth/refresh";

// User
export const API_USER_URL = "https://app.taskbuddy.dev/api/user";
// patch
export const API_USER_SETTINGS_URL =
  "https://app.taskbuddy.dev/api/user/settings"; // add /:userId to get a specific user's profile picture (PATCH)

// Todos

export const API_TODOS_URL = "https://app.taskbuddy.dev/api/todos";
export const API_TODOS_UPDATE_URL = API_TODOS_URL;
export const API_TODOS_CREATE_URL = API_TODOS_URL;
export const API_TASKS_URL = API_TODOS_URL;

export const API_TODOS_CATEGORIZED_URL =
  "https://app.taskbuddy.dev/api/todos/categorized";

// Profile pictures
export const API_PROFILE_PICTURES_URL =
  "https://app.taskbuddy.dev/api/profile-pictures"; // add /:userId to get a specific user's profile picture (POST + GET)
