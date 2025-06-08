"use client";
import { toast } from "@/components/ui/toast/toast";
import { Button } from "@stianlarsen/react-ui-kit";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPortal } from "react-dom";
import { DeleteAccountModal } from "./components/deleteAccountModal";
import styles from "./css/deleteAccount.module.css";
import { deleteSessionBoolean } from "@/lib/session";

export const DeleteAccount = () => {
  const [okToDelete, setOkToDelete] = useState(false);
  const text = useTranslations("DeleteAccount");
  const router = useRouter();

  const handleDeletedAccount = async () => {
    const sessionDeleted = await deleteSessionBoolean();
    if (!sessionDeleted) {
      console.error("Error deleting account");
      toast.error("An error occured", "bottomRight");
      router.push("/goodbye");
    }
    if (sessionDeleted) {
      router.push("/goodbye");
    }
  };
  return (
    <section>
      <h3>{text("header.title")}</h3>

      <Button
        className={styles.deleteAccount}
        onClick={() => setOkToDelete(true)}
      >
        {text("form.submit")}
      </Button>

      {okToDelete && (
        <>
          {createPortal(
            <DeleteAccountModal
              onAccountDeleted={handleDeletedAccount}
              onClose={() => setOkToDelete(false)}
            />,
            document.body,
          )}
        </>
      )}
    </section>
  );
};
