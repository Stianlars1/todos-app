"use client";
import { sidebarContentListType } from "@/content/sidebar/sidebarContent";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarContentListItem = ({
  item,
}: {
  item: sidebarContentListType;
}) => {
  const pathname = usePathname();
  const url = item.href;
  const isActive = url === pathname;

  const Icon = item.icon;
  return (
    <li key={item.href} className="sidebar__content__item">
      <Link
        className={`sidebar__content__item__link ${
          isActive ? "sidebar__content__item__link-active" : ""
        }`}
        href={item.href}
      >
        {Icon}
        <span className="link-text">{item.title}</span>
      </Link>
    </li>
  );
};
