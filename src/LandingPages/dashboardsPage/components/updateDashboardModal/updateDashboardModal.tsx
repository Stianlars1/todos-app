import { updateDashboard } from "@/app/actions/dashboards/fetch";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { CustomForm } from "@/components/form/components/customForm/customForm";
import {
  CustomInput,
  CustomInputLabel,
  CustomInputLabelWrapper,
} from "@/components/form/components/customInput/customInput";
import { FormContentWrapper } from "@/components/form/formContentWrapper";
import { Modal } from "@/components/modal/modal";
import { toast } from "@/components/ui/toast/toast";
import { UpdateDashboardConfirmButton } from "@/LandingPages/dashboardPage/components/dashboard/dashboardSwitch/components/createDashboard/components/CreateDashboardConfirmButton";
import { DashboardOnlyType } from "@/LandingPages/dashboardPage/components/dashboard/dashboardSwitch/switchUtils";
import { Button } from "@stianlarsen/react-ui-kit";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { createPortal } from "react-dom";
import styles from "@/LandingPages/dashboardPage/components/dashboard/dashboardSwitch/components/createDashboard/css/createDashboard.module.css";
import { DeleteDashboardModal } from "../deleteModal/deleteModal";

export const UpdateDashboardModal = ({
  onClose,
  dashboard,
}: {
  onClose: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  dashboard: DashboardOnlyType;
}) => {
  const text = useTranslations("UpdateDashboard");
  const [newName, setNewName] = useState(dashboard.name);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [nameAlreadyExists, setNameAlreadyExists] = useState(false);

  const updateDisabled = newName === dashboard.name;
  const handleSubmit = async () => {
    setLoading(true);
    const response = await updateDashboard(dashboard.dashboardId, newName);

    if (response.isError) {
      const alreadyExists = doesDashboardNameAlreadyExist(response.error);
      console.error("Error updating dashboard", response);
      console.error("response.error", response.error);
      console.error("alreadyExists", alreadyExists);
      if (alreadyExists) {
        setNameAlreadyExists(true);
        toast.error("Dashboard name already exists", "bottomRight");
      }
      toast.error("Error when updating dashboard name", "bottomRight");
      setLoading(false);
    }

    if (response.isSuccess && response.data) {
      if (nameAlreadyExists) {
        setNameAlreadyExists(false);
      }
      // update active dashboard id

      setNewName("");
      toast.success("Dashboard updated", "bottomRight");
      cacheInvalidate({ cacheKey: CacheKeys.DASHBOARDS });
      onClose();
      setLoading(false);
    }
  };

  const handleDelete = () => {
    setIsDeleting(true);
  };
  const handleOnDeleted = () => {
    setIsDeleting(false);
    onClose();
  };
  return (
    <>
      <Modal className={styles.modal} onClose={onClose} closeButton>
        <div className={styles.createDashboardModal}>
          <h2>{text("header.title")}</h2>
          <p>{text("header.description")}</p>

          <CustomForm>
            <FormContentWrapper>
              <CustomInputLabelWrapper>
                <CustomInputLabel>{text("form.label")}</CustomInputLabel>
                <CustomInput
                  width="100%"
                  type="text"
                  placeholder={text("form.placeholder")}
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                />

                {nameAlreadyExists && (
                  <ul>
                    <li className={styles.errorMessageLi}>
                      {text("form.dashboardNameAlreadyExists")}
                    </li>
                  </ul>
                )}
              </CustomInputLabelWrapper>
            </FormContentWrapper>

            {isDeleting &&
              createPortal(
                <DeleteDashboardModal
                  dashboard={dashboard}
                  onClose={() => setIsDeleting(false)}
                  onDeleted={handleOnDeleted}
                />,
                document.body,
              )}

            <div className={styles.CTA}>
              <UpdateDashboardConfirmButton
                title={text("form.submit")}
                loadingTitle={text("form.loadingSubmit")}
                onClick={handleSubmit}
                pending={loading}
                updateDisabled={updateDisabled}
              />
              <Button
                type="button"
                onClick={(event) => onClose(event)}
                variant="secondary"
              >
                {text("form.cancel")}
              </Button>
              <Button
                className={styles.deleteButton}
                type="button"
                onClick={handleDelete}
                variant="secondary"
              >
                {text("form.delete")}
              </Button>
            </div>
          </CustomForm>
        </div>
      </Modal>
    </>
  );
};

const doesDashboardNameAlreadyExist = (error: any) => {
  switch (error) {
    case "Dashboard name already in use. Please choose a different name.":
      return true;

    default:
      return false;
  }
};
