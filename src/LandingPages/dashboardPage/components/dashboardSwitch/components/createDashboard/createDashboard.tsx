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
import styles from "./css/createDashboard.module.css";

export const CreateDashboard = ({ onClose }: { onClose: () => void }) => {
  const text = useTranslations("CreateDashboard");
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const response = await createDashboard(newName);

    if (response.isError) {
      console.error("Error creating dashboard", response.error);
      toast.error("Error creating dashboard", "bottomRight");
      setLoading(false);
    }

    if (response.isSuccess && response.data) {
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
      console.log("response", response);
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
                  type="text"
                  placeholder={text("form.placeholder")}
                  onChange={(event) => setNewName(event.target.value)}
                />
              </CustomInputLabelWrapper>
            </FormContentWrapper>

            <div className={styles.CTA}>
              <Button type="button" onClick={handleSubmit} variant="primary">
                {text("form.submit")}
              </Button>
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
