import { BASE_URL, SUB_URL } from "@/utils/constants";
import { Metadata } from "next";
// title: "Strekkode generator",
// description:
//   "Generer og lag en gratis strekkode for din bedrift eller produkt.",
export const mainPageMeta: Metadata = {
  title: "TaskBuddy",
  description:
    "This is the website for creating and structuring your daily tasks.",
  keywords: [
    "todo",
    "create todo",
    "daily tasks",
    "todo list",
    "todo app",
    "todo buddy",
    "task buddy",
    "taskbuddy",
    "create tasks",
  ],
  creator: "Stian Larsen",
  publisher: "Stian Larsen",
  metadataBase: new URL(BASE_URL),

  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "TodoBuddy",
    description:
      "This is the website for creating and structuring your daily tasks.",
    images: [
      {
        url: `${SUB_URL}/android-chrome-512x512.png`,
        width: 512,
        height: 512,
        alt: "TodoBuddy logo",
      },
      {
        url: `${SUB_URL}/android-chrome-192x192.png`,
        width: 192,
        height: 192,
        alt: "Todo logo",
      },
    ],
    siteName: "todobuddy.dev",
  },
  twitter: {
    card: "app",
    title: "todobuddy.dev",
    description:
      "This is the website for creating and structuring your daily tasks.",
    siteId: "882276408",
    creator: "@Litehode",
    creatorId: "882276408",
    images: {
      url: "https://stianlarsen.com/og.png",
      alt: "Strekkode logo",
    },
    app: {
      name: "twitter_app",
      id: {
        iphone: "twitter_app://iphone",
        ipad: "twitter_app://ipad",
        googleplay: "twitter_app://googleplay",
      },
      url: {
        iphone: "https://iphone_url",
        ipad: "https://ipad_url",
      },
    },
  },

  icons: {
    icon: [{ rel: "icon", url: "/favicon.ico" }],
    apple: [{ rel: "apple", url: "/apple-touch-icon.png" }],
  },

  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
    other: {
      me: ["stian.larsen@mac.com"],
    },
  },
};
