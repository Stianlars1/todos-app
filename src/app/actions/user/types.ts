// api/user
export interface UserDTO {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  profilePicture?: string;
  settings?: UserSettingsDTO;
}

export type LanguageType = "en" | "nb";

// api/user/settings/:userId
export interface UserSettingsDTO {
  sidebarOpen?: boolean;
  language?: LanguageType;
  sortBacklog?: string;
  sortInProgressTasks?: string;
  sortCompletedTasks?: string;
  sortByUpdatedAt?: string;
  sortByCreatedAt?: string;
  sortByTitle?: string;
  sortByPriority?: string;
  sortByDueDate?: string;
  sortManual?: boolean;
  isColumnLayout?: boolean;
  timeZone?: string;
}
export type ExcludeBooleanKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? never : K;
}[keyof T];

export type UserSettingsSortKey =
  | "sortBacklog"
  | "sortInProgressTasks"
  | "sortCompletedTasks"
  | "sortByUpdatedAt"
  | "sortByCreatedAt"
  | "sortByUpdatedAt"
  | "sortByCreatedAt"
  | "sortByTitle"
  | "sortByPriority"
  | "sortByDueDate";
