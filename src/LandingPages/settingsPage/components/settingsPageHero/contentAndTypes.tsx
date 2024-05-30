export enum Tabs {
  PROFILE = "Profile",
  SECURITY = "Security",
  PREFERENCES = "Preferences",
}

export interface TabContent {
  label: string;
}

export const tabData: Record<Tabs, TabContent> = {
  [Tabs.PROFILE]: {
    label: "Profile",
  },
  [Tabs.SECURITY]: {
    label: "Security",
  },
  [Tabs.PREFERENCES]: {
    label: "Preferences",
  },
};
