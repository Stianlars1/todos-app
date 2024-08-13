"use client";
import { Button } from "@stianlarsen/react-ui-kit";

export const CreateDashboardConfirmButton = ({
  title,
  loadingTitle,
  onClick,
  pending,
}: {
  title: string;
  loadingTitle: string;
  onClick: () => void;
  pending: boolean;
}) => {
  console.log("title", title);

  return (
    <Button
      loadingText={loadingTitle}
      loading={pending}
      disabled={pending}
      onClick={() => onClick()}
      variant="primary"
      type="button"
    >
      {title}
    </Button>
  );
};
