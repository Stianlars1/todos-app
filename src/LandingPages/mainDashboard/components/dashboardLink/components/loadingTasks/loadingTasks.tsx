"use client";
import { SpinnerWithTitle } from "@/components/ui/suspenseFallback/suspenseFallback";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import styles from "./css/loadingTasks.module.css";

export const LoadingTasks = ({ className }: { className: string }) => {
  const text = useTranslations("general.tasks");
  const loadingDashboard = text("loading_dashboard") || "Loading dashboard";
  const loadingTasks = text("loading_tasks") || "Loading tasks";
  const [title, setTitle] = useState(loadingDashboard);

  useEffect(() => {
    const titles = [loadingDashboard, loadingTasks, "Loading..."];
    let index = 0;

    const interval = setInterval(() => {
      index = index === 2 ? 2 : index + 1;
      setTitle(titles[index]);
    }, 900);

    return () => clearInterval(interval);
  }, [loadingDashboard, loadingTasks]);

  return (
    <div className={`${styles.loadingTasks} ${className}`}>
      <SpinnerWithTitle title={title} classname={styles.spinner} />
    </div>
  );
};
