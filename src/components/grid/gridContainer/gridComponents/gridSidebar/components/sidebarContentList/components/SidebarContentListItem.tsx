"use client";
import { LogoutButtonSidebar } from "@/components/ui/buttons/logout/logoutButton";
import { sidebarContentListType } from "@/content/sidebar/sidebarContent";
import { useLinkUrl } from "@/utils/urls";
import { handleCloseNav } from "@/utils/utils";
import { usePathname } from "next/navigation";
import { SidebarDueCount } from "./sidebarDueCount/sidebarDueCount";
import Link from "next/link";

export const SidebarContentListItem = ({
  item,
  title,
  todosDueTodayCount,
}: {
  item: sidebarContentListType;
  title: string;
  todosDueTodayCount?: number | null;
}) => {
  const pathname = usePathname();

  const url = item.href;
  const isActive = url === pathname;

  const Icon = item.icon;
  const linkurl = useLinkUrl(item.href);

  const onlyOnMobile = item.renderMobileOnly;
  const showDueCount =
    todosDueTodayCount && todosDueTodayCount > 0 ? true : false;
  const dueCount = todosDueTodayCount;

  if (onlyOnMobile) {
    return (
      <li
        key={item.href}
        className={`sidebar__content__item ${
          onlyOnMobile ? "sidebar__content__item-mobile-only" : " "
        }`}
      >
        <LogoutButtonSidebar title={title} icon={Icon} />
      </li>
    );
  }
  return (
    <li key={item.href} className="sidebar__content__item">
      <Link
        className={`sidebar__content__item__link ${
          isActive ? "sidebar__content__item__link-active" : ""
        }`}
        href={linkurl}
        onClick={handleCloseNav}
      >
        {Icon}

        <span className="link-text">{title}</span>

        {showDueCount && <SidebarDueCount dueCount={dueCount!} />}
      </Link>
    </li>
  );
};
