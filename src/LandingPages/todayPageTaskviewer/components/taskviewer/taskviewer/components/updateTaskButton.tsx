"use client";
import { Button } from "@stianlarsen/react-ui-kit";
import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";

export const UpdateTaskButton = () => {
  const { pending } = useFormStatus();
  const text = useTranslations("TodayPage.taskViewer");

  return (
    <>
      <Button
        loading={pending}
        disabled={pending}
        type="submit"
        variant="primary"
      >
        {text("saveChanges")}
      </Button>
    </>
  );
};
