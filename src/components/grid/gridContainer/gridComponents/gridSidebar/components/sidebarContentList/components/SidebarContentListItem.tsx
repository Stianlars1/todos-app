"use client";
import { LogoutButtonSidebar } from "@/components/ui/buttons/logoutButton";
import { sidebarContentListType } from "@/content/sidebar/sidebarContent";
import { useLinkUrl } from "@/utils/urls";
import { handleCloseNav } from "@/utils/utils";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarContentListItem = ({
  item,
  title,
}: {
  item: sidebarContentListType;
  title: string;
}) => {
  const pathname = usePathname();
  const locale = useLocale();

  const url = item.href;
  const isActive = url === pathname;

  const Icon = item.icon;
  const linkurl = useLinkUrl(item.href);

  const onlyOnMobile = item.renderMobileOnly;

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
      </Link>
    </li>
  );
};
