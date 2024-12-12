import { getTodosDueTodayCount } from "@/app/actions/todos/fetch";
import { LocaleSwitcher } from "@/components/languageSwitcher/localeSwitcher";
import {
  sidebarContentList,
  sidebarContentListType,
} from "@/content/sidebar/sidebarContent";
import { ApiResponse } from "@/types/fetch";
import { getTranslations } from "next-intl/server";
import { SidebarContentListItem } from "./components/SidebarContentListItem";
import "./css/sidebarContentList.css";

export const SidebarContentList = async () => {
  const texts = await getTranslations("Sidebar");
  const todosDueTodayCount = await getTodosDueTodayCount<ApiResponse<number>>();

  return (
    <ul className="sidebar__content">
      {sidebarContentList
        .filter((item) => item.render)
        .map((item: sidebarContentListType) => {
          const todayUrl = "/today";
          if (item.href === todayUrl) {
            return (
              <SidebarContentListItem
                title={texts(`${item.title}`)}
                todosDueTodayCount={todosDueTodayCount.data?.data}
                key={item.href}
                item={item}
              />
            );
          }
          return (
            <SidebarContentListItem
              title={texts(`${item.title}`)}
              key={item.href}
              item={item}
            />
          );
        })}

      <LocaleSwitcher className={"sidebar__content__localeSwitcher"} />
    </ul>
  );
};
