import { useEffect, useState } from "react";
import { StatusCode } from "@/types/types";

export const useColumnInView = (columns: StatusCode[], isNative: boolean) => {
  const [columnInViewIndex, setColumnInViewIndex] = useState(1);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observers: IntersectionObserver[] = [];
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const columnId = entry.target.id;
          const index = columns.findIndex((col) => col === columnId);
          if (index !== -1) {
            setColumnInViewIndex(index + 1);
          }
        }
      });
    };

    const observerOptions = {
      root: document.getElementById("taskboard"),
      threshold: 0.5, // Column is considered "in view" when 50% visible
      rootMargin: "0px",
    };

    // Create observer for each column
    columns.forEach((columnId) => {
      const columnElement = document.getElementById(columnId);
      if (columnElement) {
        const observer = new IntersectionObserver(
          observerCallback,
          observerOptions,
        );
        observer.observe(columnElement);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [columns, isNative]);

  return { columnInViewIndex };
};
