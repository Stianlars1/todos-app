"use client";
import { updateUserPassword } from "@/app/actions/user/api";
import { CustomForm } from "@/components/form/components/customForm/customForm";
import {
  CustomInput,
  CustomInputLabel,
  CustomInputLabelWrapper,
} from "@/components/form/components/customInput/customInput";
import { FormContentWrapper } from "@/components/form/formContentWrapper";
import { FormError } from "@/components/ui/forms/components/formError/formError";
import { IconChevron, TaskBuddyIcon } from "@/components/ui/icons/icons";
import { toast } from "@/components/ui/toast/toast";
import { FetchStateForm } from "@/utils/fetch/customFetch";
import { Button } from "@stianlarsen/react-ui-kit";
import { useTranslations } from "next-intl";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import styles from "./css/security.module.css";

export const SettingsSecurityContent = () => {
  return (
    <>
      <div className={styles.securityPage}></div>
      <SecuritySection gapSizeInREM={2}>
        <SecurityChangePassword />
      </SecuritySection>
    </>
  );
};

const SecuritySection = ({
  children,
  gapSizeInREM,
  row,
}: {
  children: ReactElement | ReactElement[] | ReactNode | ReactNode[];
  gapSizeInREM?: number;
  row?: boolean;
}) => {
  return (
    <div
      style={{
        gap: gapSizeInREM ? `${gapSizeInREM}rem` : "0.5rem",
        flexDirection: row ? "row" : "column",
        alignItems: row ? "center" : "flex-start",
      }}
      className={styles.securitySection}
    >
      {children}
    </div>
  );
};

const SecurityChangePassword = () => {
  const [state, dispatch] = useFormState(updateUserPassword, undefined);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const securityTexts = useTranslations("SettingsPage.security");
  const generalText = useTranslations("general");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordUpdatedSuccessfully, setPasswordUpdatedSuccessfully] =
    useState(false);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "password") {
      setNewPassword(e.target.value);
    } else if (e.target.name === "currentPassword") {
      setPassword(e.target.value);
    } else {
      setConfirmPassword(e.target.value);
    }
  };

  useEffect(() => {
    if (state?.isSuccess) {
      toast.success(
        securityTexts("password.passwordUpdatedSuccessfully"),
        "bottomRight",
      );
      setNewPassword("");
      setConfirmPassword("");
      setOpenChangePassword(false);
      setPassword("");
      setPasswordUpdatedSuccessfully(true);

      setTimeout(() => {
        setPasswordUpdatedSuccessfully(false);
      }, 5000);
    } else if (state?.isError) {
      switch (state.error) {
        case "User not found.":
          toast.error(securityTexts("password.userNotFound"), "bottomRight");
          break;
        case "You cannot use the same password.":
          toast.error(
            securityTexts("password.passwordSameAsCurrent"),

            "bottomRight",
          );
          break;
        case "Current password is incorrect.":
          toast.error(
            securityTexts("password.incorrectPassword"),
            "bottomRight",
          );
          break;
        default:
          toast.error(
            state.error || "Error occured, please try again later",
            "bottomRight",
          );
      }
    }
  }, [state]);
  return (
    <SecuritySection gapSizeInREM={1.5}>
      <SecuritySection gapSizeInREM={0.5}>
        <SecuritySection row gapSizeInREM={0.5}>
          <h3>{securityTexts("password.title")}</h3>
          <IconChevron
            onClick={() => setOpenChangePassword(!openChangePassword)}
            className={`${styles.chevron} ${
              openChangePassword ? styles.chevronActive : ""
            }`}
          />
          {passwordUpdatedSuccessfully && (
            <span className={styles.passwordUpdated}>
              <TaskBuddyIcon />
              {securityTexts("password.updateSuccess")}
            </span>
          )}
        </SecuritySection>
        {openChangePassword && <p>{securityTexts("password.description")}</p>}
      </SecuritySection>

      {openChangePassword && (
        <CustomForm action={dispatch}>
          <FormContentWrapper gapSizeInREM={2.5}>
            <CustomInputLabelWrapper
              className={styles.securityInputLabelWrapper}
            >
              <CustomInputLabel>
                {securityTexts("password.currentPassword.label")}
              </CustomInputLabel>
              <CustomInput
                id="currentPassword"
                value={password}
                name="currentPassword"
                className={styles.securityInput}
                autoComplete="new-password"
                onChange={handleOnChange}
                placeholder={securityTexts(
                  "password.currentPassword.placeholder",
                )}
              />
            </CustomInputLabelWrapper>

            <SecuritySection gapSizeInREM={1.5}>
              <CustomInputLabelWrapper
                className={styles.securityInputLabelWrapper}
              >
                <CustomInputLabel>
                  {securityTexts("password.newPassword.label")}
                </CustomInputLabel>
                <CustomInput
                  className={styles.securityInput}
                  name="password"
                  id="password"
                  onChange={handleOnChange}
                  value={newPassword}
                  type="password"
                  autoComplete="new-password"
                  placeholder={securityTexts(
                    "password.newPassword.placeholder",
                  )}
                />

                {state &&
                  "formErrors" in state &&
                  (state as FetchStateForm<any>).formErrors!.length > 0 && (
                    <FormError errorArray={state.formErrors} />
                  )}
              </CustomInputLabelWrapper>
              <CustomInputLabelWrapper
                className={styles.securityInputLabelWrapper}
              >
                <CustomInputLabel>
                  {securityTexts("password.confirmPassword.label")}
                </CustomInputLabel>
                <CustomInput
                  id="confirmPassword"
                  name="confirmPassword"
                  autoComplete="new-password"
                  className={styles.securityInput}
                  onChange={handleOnChange}
                  value={confirmPassword}
                  type="password"
                  placeholder={securityTexts(
                    "password.confirmPassword.placeholder",
                  )}
                />
                {newPassword.length > 0 &&
                  newPassword !== confirmPassword &&
                  confirmPassword.length > 0 && (
                    <FormError
                      errorArray={[
                        securityTexts("password.passwordsDoNotMatch"),
                      ]}
                    />
                  )}
              </CustomInputLabelWrapper>
            </SecuritySection>
            <SecuritySection row gapSizeInREM={0.5}>
              {newPassword.length > 0 &&
                newPassword === confirmPassword &&
                newPassword && <UpdateButton />}
              <Button>{generalText("buttons.cancel")}</Button>
            </SecuritySection>
          </FormContentWrapper>
        </CustomForm>
      )}
    </SecuritySection>
  );
};

const UpdateButton = () => {
  const { pending } = useFormStatus();
  const text = useTranslations("general.buttons");
  return (
    <Button
      loading={pending}
      loadingText={text("loading")}
      disabled={pending}
      variant="primary"
      type="submit"
    >
      {text("save")}
    </Button>
  );
};
