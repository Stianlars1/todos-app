"use client";
import { UserDTO } from "@/app/actions/user/types";
import { SuspenseFallback } from "@/components/ui/suspenseFallback/suspenseFallback";
import { useEffect, useState } from "react";
import { SettingsPreferencesContent } from "./components/preferences/preferences";
import { SettingsProfileContent } from "./components/profile/profile";
import { SettingsSecurityContent } from "./components/security/security";
import { SettingsPageTabs } from "./components/settingsPageTabs/settingsPageTabs";
import { Tabs } from "./contentAndTypes";
import styles from "./css/settingsPageHero.module.css";

export const SettingsPageHero = ({
  userDetails,
}: {
  userDetails: UserDTO | null;
}) => {
  const [activeTab, setActiveTab] = useState<Tabs | null>(null);

  useEffect(() => {
    const getDefaultTab = (): Tabs => {
      const hash = window.location.hash.substring(1);
      switch (hash) {
        case "profile":
          return Tabs.PROFILE;
        case "security":
          return Tabs.SECURITY;
        case "preferences":
          return Tabs.PREFERENCES;
        default:
          return Tabs.PROFILE;
      }
    };

    setActiveTab(getDefaultTab());

    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      switch (hash) {
        case "profile":
          setActiveTab(Tabs.PROFILE);
          break;
        case "security":
          setActiveTab(Tabs.SECURITY);
          break;
        case "preferences":
          setActiveTab(Tabs.PREFERENCES);
          break;
        default:
          setActiveTab(Tabs.PROFILE);
          break;
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  if (activeTab === null) {
    return <SuspenseFallback fixed={false} />;
  }

  return (
    <div className={styles.settingsPageHero}>
      <div className="tab-navigation">
        <SettingsPageTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      {userDetails && (
        <div className="tab-content">
          {activeTab === Tabs.PROFILE && (
            <SettingsProfileContent userDetails={userDetails} />
          )}
          {activeTab === Tabs.SECURITY && <SettingsSecurityContent />}
          {activeTab === Tabs.PREFERENCES && <SettingsPreferencesContent />}
        </div>
      )}
    </div>
  );
};
