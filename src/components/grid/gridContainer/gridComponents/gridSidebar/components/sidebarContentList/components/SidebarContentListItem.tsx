"use client";
import { LogoutButtonSidebar } from "@/components/ui/buttons/logout/logoutButton";
import { sidebarContentListType } from "@/content/sidebar/sidebarContent";
import { useLinkUrl } from "@/utils/urls";
import { handleCloseNav } from "@/utils/utils";
import { usePathname } from "next/navigation";
import { SidebarDueCount } from "./sidebarDueCount/sidebarDueCount";
import Link from "next/link";
import styles from "../css/sidebarContentList.module.scss";

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
  const showDueCount = !!(todosDueTodayCount && todosDueTodayCount > 0);
  const dueCount = todosDueTodayCount;

  if (onlyOnMobile) {
    return (
      <li
        key={item.href}
        className={`${styles.item} ${onlyOnMobile ? styles.mobileOnlyItem : ""}`}
      >
        <LogoutButtonSidebar
          className={styles.link}
          title={title}
          icon={Icon}
        />
      </li>
    );
  }
  return (
    <li key={item.href} className={styles.item}>
      <Link
        className={`${styles.link} ${isActive ? styles.activeLink : ""}`}
        href={linkurl}
        onClick={handleCloseNav}
      >
        {Icon}

        <span className={styles.linkText}>{title}</span>

        {showDueCount && <SidebarDueCount dueCount={dueCount!} />}
      </Link>
    </li>
  );
};
