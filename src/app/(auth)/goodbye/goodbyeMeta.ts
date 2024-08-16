import { BASE_URL } from "@/utils/constants";
import { Metadata } from "next";
// title: "Strekkode generator",
// description:
//   "Generer og lag en gratis strekkode for din bedrift eller produkt.",
export const loginPageMeta: Metadata = {
  title: "Goodbye from TaskBuddy",
  creator: "Stian Larsen",
  publisher: "Stian Larsen",
  metadataBase: new URL(BASE_URL),
};
