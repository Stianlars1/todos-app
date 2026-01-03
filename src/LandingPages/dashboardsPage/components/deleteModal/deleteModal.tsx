import { deleteDashboardAndTasks } from "@/app/actions/dashboards/fetch";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { Modal } from "@/components/modal/modal";
import { toast } from "@/components/ui/toast/toast";
import { DashboardOnlyType } from "@/LandingPages/dashboardPage/components/dashboard/dashboardSwitch/switchUtils";
import { Button } from "@stianlarsen/react-ui-kit";
import { useTranslations } from "next-intl";
import styles from "./css/deleteModal.module.css";

export const DeleteDashboardModal = ({
  dashboard,
  onClose,
  onDeleted,
}: {
  dashboard: DashboardOnlyType;
  onClose: () => void;
  onDeleted: () => void;
}) => {
  const text = useTranslations("UpdateDashboard.form");

  // delete
  // delete_are_you_sure
  // delete_all_tasks
  // delete_loading

  const handleDeleteDashboard = async () => {
    // delete dashboard
    const response = await deleteDashboardAndTasks(dashboard.dashboardId);

    if (response.isError) {
      console.error("Error deleting dashboard", response);
      toast.error("Error when deleting dashboard", "bottomRight");
      return onClose();
    }

    if (response.isSuccess) {
      toast.success("Dashboard & tasks deleted permanently", "bottomRight");
      await cacheInvalidate({ cacheKey: CacheKeys.DASHBOARDS });
      return onDeleted();
    }

    return;
  };
  return (
    <>
      <Modal onClose={onClose}>
        <div className={styles.deleteModal}>
          <h2 className={styles.title}>{text("delete")}</h2>
          <p className={styles.description}>{text("delete_are_you_sure")}</p>
          <p className={styles.warning}>{text("delete_all_tasks")}!</p>
          <div className={styles.CTA}>
            <Button className={styles.delete} onClick={handleDeleteDashboard}>
              {text("delete")}
            </Button>
            <Button variant="secondary" onClick={onClose}>
              {text("cancel")}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
