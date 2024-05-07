"use client";
import { sidebarContentListType } from "@/content/sidebar/sidebarContent";
import { useLinkUrl } from "@/utils/urls";
import { handleCloseNav } from "@/utils/utils";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarContentListItem = ({
  item,
}: {
  item: sidebarContentListType;
}) => {
  const pathname = usePathname();
  const locale = useLocale();

  const url = item.href;
  const isActive = url === pathname;

  const Icon = item.icon;
  const linkurl = useLinkUrl(item.href);
  console.log("linkurl", linkurl);
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
        <span className="link-text">{item.title}</span>
      </Link>
    </li>
  );
};
