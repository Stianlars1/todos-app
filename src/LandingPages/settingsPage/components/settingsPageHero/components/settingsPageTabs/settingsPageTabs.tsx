"use client";
import { useTranslations } from "next-intl";
import { useLayoutEffect, useRef, useState } from "react";
import { Tabs, tabData } from "../../contentAndTypes";
import styles from "./css/settingsPageTabs.module.css";

export const SettingsPageTabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: Tabs;
  setActiveTab: (newTab: Tabs) => void;
}) => {
  const texts = useTranslations("SettingsPage.tabs");
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  console.log("activeTab", activeTab);
  const [underlineStyle, setUnderlineStyle] = useState({
    left:
      activeTab === Tabs.PROFILE
        ? "0"
        : activeTab === Tabs.SECURITY
        ? "68px"
        : "162px",
    width:
      activeTab === Tabs.PROFILE
        ? "64px"
        : activeTab === Tabs.SECURITY
        ? "90px"
        : "105px",
  });

  const updateActiveTab = (tabIndex: number, newTab: Tabs) => {
    setActiveTab(newTab);
    window.location.hash = `#${newTab.toLowerCase()}`;
    const tabElement = tabsRef.current[tabIndex];
    if (tabElement) {
      const { offsetLeft, clientWidth } = tabElement;
      console.log("\nTab", newTab);
      console.log("\noffsetLeft", offsetLeft);
      console.log("\nclientWidth", clientWidth);
      setUnderlineStyle({
        left: `${offsetLeft}px`,
        width: `${clientWidth}px`,
      });
    }
  };

  useLayoutEffect(() => {
    const activeIndex = tabsRef.current.findIndex((tab) => {
      return (
        tab?.attributes.getNamedItem("data-key")?.value.toLowerCase() ===
        activeTab.toLowerCase()
      );
    });

    if (activeIndex !== -1 && tabsRef.current[activeIndex]) {
      const { offsetLeft, clientWidth } = tabsRef.current[activeIndex]!;
      setUnderlineStyle({
        left: `${offsetLeft}px`,
        width: `${clientWidth}px`,
      });
    }
  }, [activeTab, tabsRef]);

  return (
    <>
      <div className={styles.Tabs}>
        {Object.values(Tabs).map((tab, index) => (
          <button
            key={tab}
            className={`${styles.TabsTrigger} ${
              activeTab === tab ? ` ${styles.ActiveTab}` : ""
            }`}
            onClick={() => updateActiveTab(index, tab)}
            ref={(el) => {
              tabsRef.current[index] = el;
            }}
            data-key={tab}
          >
            {texts(tabData[tab].label)}
          </button>
        ))}
        <div className={styles.TabUnderline} style={underlineStyle} />
      </div>
    </>
  );
};
