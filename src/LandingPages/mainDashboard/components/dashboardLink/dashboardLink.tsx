"use client";

import { updateActiveDashboardId } from "@/app/actions/user/api";
import { IconAdd } from "@/components/ui/icons/icons";
import { useBrowserInfo } from "@/hooks/useBrowserInfo";
import { CreateDashboard } from "@/LandingPages/dashboardPage/components/dashboardSwitch/components/createDashboard/createDashboard";
import { DashboardOnlyType } from "@/LandingPages/dashboardPage/components/dashboardSwitch/switchUtils";
import { UpdateDashboardModal } from "@/LandingPages/dashboardsPage/components/updateDashboardModal/updateDashboardModal";
import { Button } from "@stianlarsen/react-ui-kit";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { LoadingTasks } from "./components/loadingTasks/loadingTasks";
import styles from "./css/dashboardLink.module.css";
export const DashboardLink = ({
  dashboard,
}: {
  dashboard: DashboardOnlyType;
}) => {
  const pathName = usePathname();
  const [loading, setLoading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { isMobile } = useBrowserInfo();
  const text = useTranslations("general.tasks");
  const url = `${pathName}/${dashboard.name}`;
  const formattedDate = new Date(dashboard.createdAt).toLocaleDateString(
    "en-GB", // Specify the locale you want to use
    {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }
  );

  const [longPressTimeout, setLongPressTimeout] =
    useState<NodeJS.Timeout | null>(null);

  const startLongPress = useCallback(() => {
    const timeout = setTimeout(() => {
      setModalOpen(true);
    }, 1000); // Trigger onLongPress after 500ms
    setLongPressTimeout(timeout);
  }, [modalOpen]);

  const stopLongPress = useCallback(() => {
    if (longPressTimeout) {
      clearTimeout(longPressTimeout);
      setLongPressTimeout(null);
    }
    setIsHovering(false);
  }, [longPressTimeout]);

  const handleOnClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    const isIconClick =
      event.target instanceof
      (SVGElement || HTMLDialogElement || HTMLButtonElement);

    if (isIconClick) {
      event.stopPropagation();
      event.preventDefault();
      return; // Prevent the handleOnClick if the icon was clicked
    }
    setLoading(true);
    const updateActiveDashboardSuccess = await updateActiveDashboardId(
      dashboard.dashboardId
    );

    // Explicitly specify the locale and options for consistent date formatting
    if (!updateActiveDashboardSuccess) {
      event.preventDefault();
      event.stopPropagation();
      setLoading(false);
    }

    if (updateActiveDashboardSuccess) {
      return;
    }
  };

  const hasTasks = dashboard.totalTasks && dashboard.totalTasks > 0;

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setModalOpen(true);
  };
  const handleCloseEdit = (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined
  ) => {
    event && event.stopPropagation();
    setModalOpen(false);
    return;
  };

  return (
    <div
      className={styles.dashboardLinkWrapper}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={stopLongPress}
      onTouchStart={startLongPress}
      onTouchEnd={stopLongPress}
    >
      <Link
        href={url}
        className={styles.dashboardLink}
        onClick={(event) => handleOnClick(event)}
      >
        <>
          <header className={styles.header}>
            <h2 className={styles.h2}>{dashboard.name}</h2>
          </header>
          <div className={styles.info}>
            <>
              <span>
                <>
                  {hasTasks ? (
                    <>
                      {text("total_tasks")}
                      {": "}
                      {dashboard.totalTasks}
                    </>
                  ) : (
                    <>{text("no_tasks")}</>
                  )}
                </>
              </span>
              <i>{formattedDate}</i>
            </>
          </div>

          {loading && (
            <>
              <LoadingTasks className={styles.loadingTasks} />
            </>
          )}
        </>
      </Link>

      {(isHovering || isMobile) && (
        <button
          className={`${styles.editButton}`}
          onClick={(event) => handleEditClick(event)}
        >
          <HiOutlineDotsHorizontal
            className={`${styles.editIcon}  ${
              isMobile ? styles.editIconMobile : ""
            }`}
          />
        </button>
      )}

      {modalOpen &&
        createPortal(
          <UpdateDashboardModal
            dashboard={dashboard}
            onClose={(event?: React.MouseEvent<HTMLButtonElement>) =>
              handleCloseEdit(event)
            }
          />,
          document.body
        )}
    </div>
  );
};

export const CreateNewDashboard = ({
  className = "",
}: {
  className: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const text = useTranslations("CreateDashboard");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleKeydown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "d") {
        event.preventDefault(); // Prevent default browser action (usually bold text)
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);
  return (
    <>
      <Button
        variant="primary"
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.createDashboardLink} ${className}`}
      >
        <header className={styles.header}>
          <IconAdd className={styles.plus} /> {text("create_dashboard")}
        </header>
      </Button>
      {isOpen &&
        createPortal(
          <CreateDashboard onClose={() => setIsOpen(false)} />,
          document.body
        )}
    </>
  );
};
