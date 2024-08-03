import { TodoDTO } from "@/types/types";
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
  timezone: string = "UTC"
): string => {
  console.log("format date: ", date);
  const d = moment.tz(date, timezone);
  console.log("d: ", d.format());

  const month = d.format("MM");
  const day = d.format("DD");
  const year = d.format("YYYY");

  const result = `${year}-${month}-${day}`;
  console.log("result: ", result);
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
