import {
  sidebarContentList,
  sidebarContentListType,
} from "@/content/sidebar/sidebarContent";
import { SidebarContentListItem } from "./components/SidebarContentListItem";
import "./css/sidebarContentList.css";

export const SidebarContentList = async () => {
  return (
    <ul className="sidebar__content">
      {sidebarContentList.map((item: sidebarContentListType, index: number) => (
        <SidebarContentListItem key={item.href} item={item} />
      ))}
    </ul>
  );
};
