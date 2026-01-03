import { createDashboard } from "@/app/actions/dashboards/fetch";
import { updateUserSettings } from "@/app/actions/user/api";
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
import { Button } from "@stianlarsen/react-ui-kit";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { CreateDashboardConfirmButton } from "./components/CreateDashboardConfirmButton";
import styles from "./css/createDashboard.module.css";

export const CreateDashboard = ({ onClose }: { onClose: () => void }) => {
  const text = useTranslations("CreateDashboard");
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameAlreadyExists, setNameAlreadyExists] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const response = await createDashboard(newName);

    if (response.isError) {
      const alreadyExists = doesDashboardNameAlreadyExist(response.error);
      console.error("Error creating dashboard", response);
      console.error("alreadyExists", alreadyExists);

      toast.error("Error creating dashboard", "bottomRight");
      setLoading(false);
      setNameAlreadyExists(true);
    }

    if (response.isSuccess && response.data) {
      if (nameAlreadyExists) {
        setNameAlreadyExists(false);
      }
      // update active dashboard id
      const updateResponse = await updateUserSettings({
        activeDashboardId: response.data.dashboardId,
      });

      if (!updateResponse.success) {
        console.error("Error updating active dashboard", updateResponse);
        toast.error("Error updating active dashboard", "bottomRight");
        setLoading(false);
        return;
      }

      if (updateResponse.success) {
        cacheInvalidate({ cacheKey: CacheKeys.DASHBOARDS });
      }
      setNewName("");
      toast.success("Dashboard created successfully", "bottomRight");
      cacheInvalidate({ cacheKey: CacheKeys.DASHBOARDS });
      onClose();
      setLoading(false);
    }
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

            <div className={styles.CTA}>
              <CreateDashboardConfirmButton
                title={text("form.submit")}
                loadingTitle={text("form.loadingSubmit")}
                onClick={handleSubmit}
                pending={loading}
              />
              <Button onClick={onClose} variant="secondary">
                {text("form.cancel")}
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
