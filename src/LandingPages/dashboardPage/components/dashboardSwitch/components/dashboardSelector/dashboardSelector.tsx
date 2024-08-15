"use client";
import { updateUserSettings } from "@/app/actions/user/api";
import { DashboardType } from "../../switchUtils";

import { getOnlyDashboards } from "@/app/actions/dashboards/fetch";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { toast } from "@/components/ui/toast/toast";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import styles from "./css/dashboardSelector.module.css";
interface DashboardSelectorProps {
  activeDashboardId: number;
  dashboards: DashboardType[] | null;
}

export const DashboardSelector = ({
  activeDashboardId,
  dashboards,
}: DashboardSelectorProps) => {
  const router = useRouter();
  const locale = useLocale();

  const handleDashboardChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedDashboardId = parseInt(event.target.value, 10);
    const response = await updateUserSettings({
      activeDashboardId: selectedDashboardId,
    });

    if (!response.success) {
      console.error(response);
      toast.error("Error updating active dashboard", "bottomRight");
    }

    if (response.success) {
      // await cacheInvalidate({ cacheKey: CacheKeys.DASHBOARDS });
      // await cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });
      await cacheInvalidate({ cacheKey: CacheKeys.USER_SETTINGS });
      await cacheInvalidate({ cacheKey: CacheKeys.USER_DETAILS });
      const newActiveDashboard = (await getOnlyDashboards()).data?.find(
        (board) => board.dashboardId === selectedDashboardId,
      );
      router.push(`/${locale}/${newActiveDashboard?.name}`);
      toast.success("Switched dashboard successfully", "bottomRight");
    }
  };

  return (
    <div className={styles.dashboardSelector}>
      <select
        className={styles.select}
        value={activeDashboardId}
        onChange={handleDashboardChange}
      >
        {dashboards &&
          dashboards.map((dashboard) => (
            <option
              className={styles.option}
              key={dashboard.dashboardId}
              value={dashboard.dashboardId}
            >
              {dashboard.name}
            </option>
          ))}
      </select>

      {/* <CreateDashboardButton /> */}
    </div>
  );
};
