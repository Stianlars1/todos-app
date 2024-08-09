// Settings that could be updated

// the values the settings could be updated to
export enum SortOrders {
  UPDATED_AT_ASC = "updatedAt_asc",
  UPDATED_AT_DESC = "updatedAt_desc",
  CREATED_AT_ASC = "createdAt_asc",
  CREATED_AT_DESC = "createdAt_desc",
  TITLE_ASC = "title_asc",
  TITLE_DESC = "title_desc",
  PRIORITY_ASC = "priority_asc",
  PRIORITY_DESC = "priority_desc",
  DUE_DATE_ASC = "dueDate_asc",
  DUE_DATE_DESC = "dueDate_desc",
}

export enum SortKeys {
  BACKLOG = "sortBacklog",
  IN_PROGRESS_TASKS = "sortInProgressTasks",
  COMPLETED_TASKS = "sortCompletedTasks",
  UPDATED_AT = "sortByUpdatedAt",
  CREATED_AT = "sortByCreatedAt",
  TITLE = "sortByTitle",
  PRIORITY = "sortByPriority",
  DUE_DATE = "sortByDueDate",
}
