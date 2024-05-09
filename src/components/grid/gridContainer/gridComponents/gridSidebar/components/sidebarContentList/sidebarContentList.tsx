import {
  sidebarContentList,
  sidebarContentListType,
} from "@/content/sidebar/sidebarContent";
import { getTranslations } from "next-intl/server";
import { SidebarContentListItem } from "./components/SidebarContentListItem";
import "./css/sidebarContentList.css";

export const SidebarContentList = async () => {
  const texts = await getTranslations("Sidebar");

  return (
    <ul className="sidebar__content">
      {sidebarContentList.map((item: sidebarContentListType, index: number) => (
        <SidebarContentListItem
          title={texts(`${item.title}`)}
          key={item.href}
          item={item}
        />
      ))}
    </ul>
  );
};
