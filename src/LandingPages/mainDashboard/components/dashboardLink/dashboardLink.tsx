"use client";

import { updateActiveDashboardId } from "@/app/actions/user/api";
import { IconAdd } from "@/components/ui/icons/icons";
import { CreateDashboard } from "@/LandingPages/dashboardPage/components/dashboardSwitch/components/createDashboard/createDashboard";
import { DashboardOnlyType } from "@/LandingPages/dashboardPage/components/dashboardSwitch/switchUtils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LoadingTasks } from "./components/loadingTasks/loadingTasks";
import styles from "./css/dashboardLink.module.css";
export const DashboardLink = ({
  dashboard,
  index,
}: {
  dashboard: DashboardOnlyType;
  index: number;
}) => {
  const pathName = usePathname();
  const [loading, setLoading] = useState(false);
  const text = useTranslations("general.tasks");
  const url = `${pathName}/${dashboard.name}`;
  console.log("\nDashboardLink prop", dashboard);

  const formattedDate = new Date(dashboard.createdAt).toLocaleDateString(
    "en-GB", // Specify the locale you want to use
    {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }
  );
  const handleOnClick = async (event: any) => {
    setLoading(true);
    const updateActiveDashboardSuccess = await updateActiveDashboardId(
      dashboard.dashboardId
    );

    console.log("updateActiveDashboard", updateActiveDashboardSuccess);
    // Explicitly specify the locale and options for consistent date formatting
    if (!updateActiveDashboardSuccess) {
      event.preventDefault();
      event.stopPropagation();
      console.error("Failed to update active dashboard");
      setLoading(false);
    }

    if (updateActiveDashboardSuccess) {
      return;
    }
  };

  const hasTasks = dashboard.totalTasks && dashboard.totalTasks > 0;

  return (
    <Link className={styles.dashboardLink} href={url} onClick={handleOnClick}>
      <>
        <header className={styles.header}>
          <h2 className={styles.h2}>{dashboard.name}</h2>
        </header>
        <div className={styles.info}>
          <>
            <span>
              <>
                {hasTasks ? (
                  <>
                    {text("total_tasks")}
                    {": "}
                    {dashboard.totalTasks}
                  </>
                ) : (
                  <>{text("no_tasks")}</>
                )}
              </>
            </span>
            <i>{formattedDate}</i>
          </>
        </div>

        {loading && (
          <>
            <LoadingTasks className={styles.loadingTasks} />
          </>
        )}
      </>
    </Link>
  );
};

export const CreateNewDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const text = useTranslations("CreateDashboard");
  return (
    <button
      onClick={() => setIsOpen(true)}
      className={`${styles.dashboardLink} ${styles.createDashboardLink}`}
    >
      <header className={styles.header}>
        <IconAdd className={styles.add} /> {text("create_dashboard")}
      </header>
      {isOpen && (
        <>
          <CreateDashboard onClose={() => setIsOpen(false)} />
        </>
      )}
    </button>
  );
};
