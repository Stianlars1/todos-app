import { StatusCode, TodoDTO, TodoStatus } from "@/types/types";
import moment from "moment-timezone";

export const handleCloseNav = () => {
  const isOpen = document.body.getAttribute("data-nav-open");
  document.body.setAttribute("data-nav-open", String(!isOpen));
};

export function debounce(fn: Function, delay: number) {
  let timeoutId: any;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export const formatDate = (
  date: Date | string,
  timezone: string = "UTC",
): string => {
  const d = moment.tz(date, timezone);

  const month = d.format("MM");
  const day = d.format("DD");
  const year = d.format("YYYY");

  const result = `${year}-${month}-${day}`;
  return result;
};

export const compareDates = (date1: string, date2: string): boolean => {
  // Convert the first date to Date object
  const d1 = new Date(date1);
  // Extract only the date part from the second date and convert it to Date object
  const d2 = new Date(date2.split("T")[0]);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export function arraysEqual(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

export function cleanArray(arr: any[]) {
  return arr.map((item) => item.trim());
}

export const normalizeDate = (date: Date, timezone = "UTC") => {
  const d = moment.tz(date, timezone).set({ hour: 23, minute: 59, second: 59 });
  return d.format("YYYY-MM-DDTHH:mm:ss");
};

export const sortTasks = (tasks: TodoDTO[]) => {
  return tasks.sort((a, b) => {
    const aDueDate = a.dueDate ? new Date(a.dueDate).getTime() : null;
    const bDueDate = b.dueDate ? new Date(b.dueDate).getTime() : null;
    const aUpdatedAt = new Date(a.updatedAt).getTime();
    const bUpdatedAt = new Date(b.updatedAt).getTime();

    if (aDueDate && bDueDate) {
      return bDueDate - aDueDate; // Descending order for due dates
    } else if (aDueDate) {
      return -1; // Tasks with due dates come first
    } else if (bDueDate) {
      return 1; // Tasks with due dates come first
    } else {
      return bUpdatedAt - aUpdatedAt; // Descending order for updatedAt
    }
  });
};

/**
 * Flexibly combine class names with conditional logic
 * @param classes Array of class names or conditional class objects
 * @returns Combined class string
 */
export function cx(
  ...classes: (
    | string
    | undefined
    | null
    | boolean
    | { [key: string]: boolean }
  )[]
) {
  return classes.reduce<string>((acc, cls) => {
    if (cls === null || cls === undefined || cls === false) return acc;

    if (typeof cls === "string") {
      return acc ? `${acc} ${cls}` : cls;
    }

    if (typeof cls === "object") {
      const conditionalClasses = Object.entries(cls)
        .filter(([, condition]) => condition)
        .map(([className]) => className);

      // Replace with:
      return Array.from(
        new Set([...acc.split(" "), ...conditionalClasses]),
      ).join(" ");
    }

    return acc;
  }, "");
}

export const STATUS_MAP: Record<StatusCode, TodoStatus> = {
  CREATED: {
    statusId: 7,
    statusCode: "CREATED",
    statusName: "Created",
    description: "Task has been created",
  },
  PENDING: {
    statusId: 1,
    statusCode: "PENDING",
    statusName: "Pending",
    description: "Task has not been started yet.",
  },
  IN_PROGRESS: {
    statusId: 2,
    statusCode: "IN_PROGRESS",
    statusName: "In Progress",
    description: "Task is currently ongoing.",
  },
  COMPLETED: {
    statusId: 3,
    statusCode: "COMPLETED",
    statusName: "Completed",
    description: "Task has been completed successfully.",
  },
  ON_HOLD: {
    statusId: 4,
    statusCode: "ON_HOLD",
    statusName: "On Hold",
    description: "Task is temporarily paused.",
  },
  CANCELLED: {
    statusId: 5,
    statusCode: "CANCELLED",
    statusName: "Cancelled",
    description: "Task has been cancelled and will not be completed.",
  },
  DELETED: {
    statusId: 6,
    statusCode: "DELETED",
    statusName: "Deleted",
    description:
      "Task has been marked for deletion or removed from active view.",
  },
};

// Helper function to get full status object
export const getStatusByCode = (statusCode: StatusCode): TodoStatus => {
  return STATUS_MAP[statusCode];
};

export const shouldReturn = (
  event: React.MouseEvent<HTMLDivElement | HTMLLIElement>,
) => {
  if (
    event.target instanceof HTMLElement &&
    event.target.className.includes("tagBadge")
  ) {
    return true;
  }

  if (event.target instanceof HTMLElement) {
    switch (event.target.nodeName) {
      case "H3":
        return true;
      case "P":
        return true;
    }
  }

  return false;
};
