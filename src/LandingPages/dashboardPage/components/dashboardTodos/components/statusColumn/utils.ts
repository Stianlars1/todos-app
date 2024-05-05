export const getCategoryDisplaySettings = (categoryString: string) => {
  switch (categoryString) {
    case "backlog":
      return { render: true, title: "Backlog" };
    case "upcomingDeadlines":
      return { render: false, title: "Upcoming Deadlines" };
    case "completedTasks":
      return { render: true, title: "Completed Tasks" };
    case "pendingTasks":
      return { render: false, title: "Pending Tasks" };
    case "inProgressTasks":
      return { render: true, title: "In Progress Tasks" };
    case "onHoldTasks":
      return { render: false, title: "On Hold Tasks" };
    case "cancelledTasks":
      return { render: false, title: "Cancelled Tasks" };
    case "deletedTasks":
      return { render: false, title: "Deleted Tasks" };
    default:
      return { render: false, title: categoryString };
  }
};
