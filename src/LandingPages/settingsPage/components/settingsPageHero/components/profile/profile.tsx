"use client";
import { updateUserProfile } from "@/app/actions/user/api";
import { UserDetailsDTO } from "@/app/actions/user/types";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { CustomForm } from "@/components/form/components/customForm/customForm";
import {
  CustomInput,
  CustomInputLabel,
  CustomInputLabelWrapper,
} from "@/components/form/components/customInput/customInput";
import { FormContentWrapper } from "@/components/form/formContentWrapper";
import { toast } from "@/components/ui/toast/toast";
import { conflictError } from "@/utils/fetch/errorMessages";
import { Button } from "@stianlarsen/react-ui-kit";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { ProfilePicture } from "../../../profilePicture/profilePicture";
import styles from "./css/profile.module.css";

export interface UpdatedUserDetails {
  firstName: string;
  lastName: string;
  email: string;
}

export const SettingsProfileContent = ({
  userDetails,
}: {
  userDetails: UserDetailsDTO;
}) => {
  const [state, dispatch] = useActionState(updateUserProfile, undefined);
  const todayPageText = useTranslations("TodayPage");

  const SettingsPageTexts = useTranslations("SettingsPage");
  const [isClient, setIsClient] = useState(false);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [userState, setUserState] = useState<UpdatedUserDetails>(userDetails);
  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const newState = { ...userState, [e.target.name]: e.target.value };
    setUserState(newState);

    setHasUnsavedChanges(
      newState.firstName !== userDetails.firstName ||
        newState.lastName !== userDetails.lastName ||
        newState.email !== userDetails.email,
    );
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (state?.isSuccess) {
      setHasUnsavedChanges(false);
      toast.success(
        SettingsPageTexts("profile.userUpdatedSuccessfully"),
        "bottomRight",
      );
      cacheInvalidate({ cacheKey: CacheKeys.USER_DETAILS });
    }

    if (state?.isError) {
      const isConflictError = state.error && state.error === conflictError;
      if (isConflictError) {
        toast.error(
          SettingsPageTexts("profile.emailConflict") || "",
          "bottomRight",
        );
      } else {
        toast.error(state.error || "", "bottomRight");
      }
    }
  }, [state]);

  const handleCancel = () => {
    if (userDetails) {
      setUserState(mapUserDTOtoUpdatedUserDetails(userDetails));
      setHasUnsavedChanges(false);
    }
  };

  if (!isClient) return null;

  return (
    <>
      <div className={styles.profile}>
        <ProfilePicture profilePicture={userDetails.profilePictureUrl || ""} />

        <div className={styles.details}>
          <CustomForm action={dispatch} className={styles.customFormOverride}>
            <FormContentWrapper
              className={styles.customFormContentWrapperOverride}
            >
              <div className={styles.formProfileSection}>
                <CustomInputLabelWrapper
                  className={styles.customInputLabelWrapperOverride}
                >
                  <CustomInputLabel>
                    {SettingsPageTexts("profile.firstname.label")}
                  </CustomInputLabel>
                  <CustomInput
                    className={styles.customInputOverrider}
                    value={userState.firstName}
                    name="firstName"
                    id="firstName"
                    onChange={handleOnChange}
                    placeholder={SettingsPageTexts(
                      "profile.firstname.placeholder",
                    )}
                    width="100%"
                  />
                </CustomInputLabelWrapper>
                <CustomInputLabelWrapper
                  className={styles.customInputLabelWrapperOverride}
                >
                  <CustomInputLabel>
                    {SettingsPageTexts("profile.lastname.label")}
                  </CustomInputLabel>
                  <CustomInput
                    className={styles.customInputOverrider}
                    value={userState.lastName}
                    name="lastName"
                    id="lastName"
                    onChange={handleOnChange}
                    placeholder={SettingsPageTexts(
                      "profile.lastname.placeholder",
                    )}
                    width="100%"
                  />
                </CustomInputLabelWrapper>
              </div>

              <div className={styles.formProfileSection}>
                <CustomInputLabelWrapper
                  className={styles.customInputLabelWrapperOverride}
                >
                  <CustomInputLabel>
                    {SettingsPageTexts("profile.email.label")}
                  </CustomInputLabel>
                  <CustomInput
                    className={styles.customInputOverrider}
                    value={userState.email}
                    name="email"
                    id="email"
                    onChange={handleOnChange}
                    placeholder={SettingsPageTexts("profile.email.placeholder")}
                  />
                </CustomInputLabelWrapper>
              </div>
              <CustomInputLabelWrapper>
                <CustomInputLabel
                  style={{ fontSize: "12px", letterSpacing: "0.2px" }}
                >
                  <i>
                    {SettingsPageTexts("profile.lastUpdated.label")}{" "}
                    <strong>
                      {new Date(userDetails.updatedAt).toLocaleDateString()}
                    </strong>
                  </i>
                </CustomInputLabel>
              </CustomInputLabelWrapper>

              {hasUnsavedChanges && (
                <CustomInputLabelWrapper>
                  <SaveButton />
                  <Button onClick={handleCancel} variant="outline">
                    {todayPageText("taskViewer.cancel")}
                  </Button>
                </CustomInputLabelWrapper>
              )}
            </FormContentWrapper>
          </CustomForm>
        </div>
      </div>
    </>
  );
};

const SaveButton = () => {
  const { pending } = useFormStatus();
  const todayPageText = useTranslations("TodayPage");
  return (
    <Button
      variant="primary"
      type="submit"
      loading={pending}
      disabled={pending}
      loadingText={todayPageText("taskViewer.savingChanges")}
    >
      {todayPageText("taskViewer.saveChanges")}
    </Button>
  );
};

const mapUserDTOtoUpdatedUserDetails = (
  userDetails: UserDetailsDTO,
): UpdatedUserDetails => {
  return {
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    email: userDetails.email,
  };
};
