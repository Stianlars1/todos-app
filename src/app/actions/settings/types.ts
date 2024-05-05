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

// The data stored in the database
// each value in each columns coul dhave either _desc or _asc appended to it

// #,user_id,sidebar_open,sort_backlog,sort_inprogresstasks,sort_completedtasks,sort_by_updated_at,sort_by_created_at,sort_by_title,sort_by_priority,sort_by_due_date,sort_completed_tasks,sort_in_progress_tasks
// 1,33,false,updatedAt_desc,updatedAt_desc,updatedAt_desc,updatedAt_desc,createdAt_desc,title_asc,priority_asc,dueDate_asc,,
// 2,20,false,updatedAt_desc,updatedAt_desc,updatedAt_desc,updatedAt_desc,createdAt_desc,title_asc,priority_asc,dueDate_asc,,
