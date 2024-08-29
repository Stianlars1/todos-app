import { checkPasswordMatch, deleteAccount } from "@/app/actions/user/api";
import { CustomForm } from "@/components/form/components/customForm/customForm";
import {
  CustomInput,
  CustomInputLabel,
  CustomInputLabelWrapper,
} from "@/components/form/components/customInput/customInput";
import { FormContentWrapper } from "@/components/form/formContentWrapper";
import { Modal } from "@/components/modal/modal";
import { SpinnerWithTitle } from "@/components/ui/suspenseFallback/suspenseFallback";
import { toast } from "@/components/ui/toast/toast";
import { Button } from "@stianlarsen/react-ui-kit";
import { useTranslations } from "next-intl";
import { useState } from "react";
import styles from "./deleteAccountModal.module.css";
const DELETED_MESSAGE = "User not found";
// "DeleteAccount": {
//     "header": {
//       "title": "Slett konto",
//       "description": "Er du sikker på at du vil slette kontoen din? Denne handlingen kan ikke angres."
//     },
//     "form": {
//       "label": "Skriv inn passordet ditt for å bekrefte",
//       "placeholder": "Passord",
//       "submit": "Slett konto",
//       "loadingSubmit": "Sletter konto...",
//       "cancel": "Avbryt",
//       "passwordIncorrect": "Passordet er feil"
//     }
//   }
export const DeleteAccountModal = ({
  onAccountDeleted,
  onClose,
}: {
  onAccountDeleted: () => void;
  onClose: () => void;
}) => {
  const text = useTranslations("DeleteAccount");
  const [wrongPassword, setWrongPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const handleDelete = async () => {
    setIsDeleting(true);
    toast.info("Deleting account", "bottomRight");
    const passwordElement = document.getElementById(
      "password"
    ) as HTMLInputElement;
    const password = passwordElement.value;
    const passwordMatch = await checkPasswordMatch(password);
    if (passwordMatch.isError || passwordMatch.error) {
      console.error("Error checking password", passwordMatch);
      toast.error(text("form.passwordIncorrect"), "bottomRight");
      setWrongPassword(true);
      setIsDeleting(false);

      return;
    }

    if (passwordMatch.isSuccess) {
      toast.success("passwords matched", "bottomRight");
    }

    if (passwordMatch.isSuccess) {
      const deleteAccountRequest = await deleteAccount();

      if (deleteAccountRequest.isError) {
        if (
          deleteAccountRequest.error &&
          deleteAccountRequest.error === DELETED_MESSAGE
        ) {
          // tHE USER WAS DELETED AND THE DELETION WAS SUCCESSFULL
          toast.success("Account deleted successfully", "bottomRight");
          return onAccountDeleted();
        }
        console.error("Error deleting account", deleteAccountRequest);
        toast.error("Error deleting account", "bottomRight");
        setIsDeleting(false);
        return onClose();
      }

      if (deleteAccountRequest.isSuccess) {
        toast.success("Account deleted successfully", "bottomRight");
        return onAccountDeleted();
      }
    }
  };
  return (
    <Modal
      className={styles.deleteAccountModal}
      onClose={onClose}
      closeButton={!isDeleting}
    >
      <div
        className={`${styles.deleteAccount} ${isDeleting ? styles.isDeleting : ""}`}
      >
        {isDeleting && <SpinnerWithTitle title={text("form.loadingSubmit")} />}

        {!isDeleting && (
          <>
            <>
              <header className={styles.header}>
                <h2>{text("header.title")}</h2>
                <p>{text("header.description")}</p>
              </header>
              <CustomForm className={styles.form}>
                <FormContentWrapper>
                  <CustomInputLabelWrapper>
                    <CustomInputLabel>{text("form.label")}</CustomInputLabel>
                    <CustomInput
                      type="password"
                      id="password"
                      name="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder={text("form.placeholder")}
                    />
                    {wrongPassword && (
                      <p className={styles.incorrect}>
                        {text("form.passwordIncorrect")}
                      </p>
                    )}
                  </CustomInputLabelWrapper>

                  <div className={styles.CTA}>
                    <Button
                      className={styles.delete}
                      loadingText={text("form.loadingSubmit")}
                      disabled={isDeleting || currentPassword.length < 1}
                      onClick={handleDelete}
                    >
                      {text("form.submit")}
                    </Button>
                    <Button
                      variant="outline"
                      loadingText={text("form.loadingSubmit")}
                      onClick={onClose}
                    >
                      {text("form.cancel")}
                    </Button>
                  </div>
                </FormContentWrapper>
              </CustomForm>
            </>
          </>
        )}
      </div>
    </Modal>
  );
};
