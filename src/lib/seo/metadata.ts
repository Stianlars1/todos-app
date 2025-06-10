import { SUB_URL, TASKBUDDY_APP_URL } from "@/utils/constants";
import { Metadata } from "next";

const defaultMetadata: Metadata = {
  creator: "Stian Larsen",
  publisher: "TaskBuddy",
  metadataBase: new URL(TASKBUDDY_APP_URL),
  applicationName: "TaskBuddy",
  referrer: "origin-when-cross-origin",
  keywords: [
    "task management",
    "productivity app",
    "todo list",
    "project management",
    "task organizer",
    "dashboard",
    "drag and drop tasks",
    "team collaboration",
    "workflow management",
    "task tracker",
    "deadline management",
    "task automation",
    "productivity tool",
    "project planning",
    "task scheduling",
  ],
  authors: [{ name: "Stian Larsen", url: "https://stianlarsen.com" }],
  category: "Productivity",
};

export const homePageMetadata: Metadata = {
  ...defaultMetadata,
  title: "TaskBuddy - Effortless Task Management & Productivity App",
  description:
    "Boost your productivity with TaskBuddy's advanced task management features. Create customizable dashboards, use drag & drop functionality, and stay organized with real-time updates. Free to use!",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: TASKBUDDY_APP_URL,
    title: "TaskBuddy - Effortless Task Management & Productivity App",
    description:
      "Advanced task management with customizable dashboards, drag & drop functionality, and real-time updates. Boost your productivity today!",
    siteName: "TaskBuddy",
    images: [
      {
        url: `${SUB_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "TaskBuddy - Task Management Dashboard",
        type: "image/png",
      },
      {
        url: `${SUB_URL}/android-chrome-512x512.png`,
        width: 512,
        height: 512,
        alt: "TaskBuddy Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskBuddy - Effortless Task Management",
    description:
      "Boost productivity with customizable dashboards, drag & drop tasks, and real-time updates. Try TaskBuddy free!",
    creator: "@Litehode",
    images: [`${SUB_URL}/twitter-card.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#5bbad5" },
    ],
  },
  manifest: "/manifest.webmanifest",
};

export const dashboardMetadata: Metadata = {
  ...defaultMetadata,
  title: "Dashboard - TaskBuddy",
  description:
    "Manage your tasks efficiently with TaskBuddy's customizable dashboard. Drag & drop tasks, organize by status, and boost your productivity.",
  openGraph: {
    title: "TaskBuddy Dashboard - Organize Your Tasks",
    description:
      "Customize your workflow with powerful dashboard features, drag & drop functionality, and real-time task management.",
    url: `${TASKBUDDY_APP_URL}/dashboard`,
    images: [`${TASKBUDDY_APP_URL}/dashboard-og.png`],
  },
};

export const todayMetadata: Metadata = {
  ...defaultMetadata,
  title: "Today's Tasks - TaskBuddy",
  description:
    "View and manage your tasks due today. Stay on top of deadlines and never miss important tasks with TaskBuddy's Today view.",
  openGraph: {
    title: "Today's Tasks - TaskBuddy",
    description:
      "Stay on top of your daily tasks and deadlines with TaskBuddy's Today view.",
    url: `${TASKBUDDY_APP_URL}/today`,
  },
};

export const settingsMetadata: Metadata = {
  ...defaultMetadata,
  title: "Settings - TaskBuddy",
  description:
    "Customize your TaskBuddy experience. Manage preferences, account settings, and optimize your task management workflow.",
  robots: {
    index: false,
    follow: true,
  },
};

export const aboutMetadata: Metadata = {
  ...defaultMetadata,
  title: "About TaskBuddy - Our Mission & Story",
  description:
    "Learn about TaskBuddy's mission to simplify task management. Meet Stian Larsen, founder and CEO, and discover our vision for productivity tools.",
  openGraph: {
    title: "About TaskBuddy - Our Mission & Story",
    description:
      "Learn about TaskBuddy's mission and meet the team behind the task management app.",
    url: `${TASKBUDDY_APP_URL}/about-us`,
    type: "article",
  },
};
