import { useEffect, useState } from "react";

export const useIsDarkmodeActive = (): { isDarkmodeActive: boolean } => {
  const [isDarkmodeActive, setIsDarkmodeActive] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    if (!mq.matches) {
      setIsDarkmodeActive(false);
    }
    try {
      mq.addEventListener("change", (evt) => setIsDarkmodeActive(evt.matches));
    } catch (e) {
      console.info(e);
    }
  }, []);

  return { isDarkmodeActive };
};
