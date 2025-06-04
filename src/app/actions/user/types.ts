// api/user
export interface UserDTO {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  profilePicture?: string;
  settings?: UserSettings;
}

export type LanguageType = "en" | "nb";

// api/user/settings/:userId
export interface UserSettings {
  sidebarOpen: boolean;
  sortBacklog: string;
  sortInProgressTasks: string;
  sortCompletedTasks: string;
  sortByUpdatedAt: string;
  sortByCreatedAt: string;
  sortByTitle: string;
  sortByPriority: string;
  sortByDueDate: string;
  language: LanguageType;
  sortManual: boolean;
  isColumnLayout: boolean;
  timeZone: string;
  isDashboardTabActive: boolean;
  sortNewTodosAtTop: boolean;
  activeDashboardId: number;
  limitTasks: boolean;
}

export type ExcludeBooleanKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? never : K;
}[keyof T];

export type UserSettingsSortKey =
  | "sortBacklog"
  | "sortInProgressTasks"
  | "sortCompletedTasks"
  | "sortByCreatedAt"
  | "sortByUpdatedAt"
  | "sortByTitle"
  | "sortByPriority"
  | "sortByDueDate";
