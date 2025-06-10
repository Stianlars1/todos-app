import { TASKBUDDY_APP_URL } from "@/utils/constants";

const isDevMode = process.env.NODE_ENV !== "production"; // Check if in development mode
const hostAPI = TASKBUDDY_APP_URL;
const host = isDevMode ? "http://localhost:3001" : TASKBUDDY_APP_URL;
export const createUrl = (path: string, noHost = false) => {
  // if api => localhost:8080 else localhost:3000
  if (path.startsWith("/api")) {
    return `${hostAPI}${path}`;
  }
  return noHost ? path : `${host}${path}`;
};
