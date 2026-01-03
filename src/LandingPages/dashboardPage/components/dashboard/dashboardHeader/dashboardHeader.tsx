"use client";
import { updateUserSettings } from "@/app/actions/user/api";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { useBrowserInfo } from "@/hooks/useBrowserInfo";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import "./css/dashboardHeader.css";

interface DashboardHeaderProps {
  activeTab: number;
  children: ReactNode;
  setActiveTab: (index: number) => void;
}

export const DASHBOARD_TAB_INDEX = 0;
export const OVERVIEW_TAB_INDEX = 1;

export const DashboardHeader = ({
  activeTab,
  setActiveTab,
  children,
}: DashboardHeaderProps) => {
  const texts = useTranslations("Dashboard.header.tabs");
  const { isSafari } = useBrowserInfo();

  const handleTabChange = async (index: number) => {
    setActiveTab(index);
    const updateResponse = await updateUserSettings({
      isDashboardTabActive: index === DASHBOARD_TAB_INDEX,
    });

    if (updateResponse.success) {
      await cacheInvalidate({ cacheKey: CacheKeys.USER_SETTINGS });
      await cacheInvalidate({ cacheKey: CacheKeys.USER_DETAILS });
    }
  };

  return (
    <header className="dashboard-header">
      <div className="dashboard-header__header">
        <h1
          onClick={() => handleTabChange(0)}
          className={`dashboard-header__header__title ${
            activeTab === DASHBOARD_TAB_INDEX
              ? "dashboard-header__header__activeTab"
              : ""
          } ${isSafari ? "noSafariTitle" : ""}`}
        >
          {texts("dashboard")}
        </h1>
        <span className="dashboard-header__header__slash">{"/"}</span>
        <h1
          onClick={() => handleTabChange(1)}
          className={`dashboard-header__header__title ${
            activeTab === OVERVIEW_TAB_INDEX
              ? "dashboard-header__header__activeTab"
              : ""
          } ${isSafari ? "noSafariTitle" : ""}`}
        >
          {texts("overview")}
        </h1>
      </div>

      {children && <>{children}</>}
    </header>
  );
};
