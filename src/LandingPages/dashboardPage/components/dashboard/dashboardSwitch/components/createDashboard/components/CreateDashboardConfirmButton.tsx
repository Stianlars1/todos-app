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
export const UpdateDashboardConfirmButton = ({
  title,
  loadingTitle,
  onClick,
  pending,
  updateDisabled,
}: {
  title: string;
  loadingTitle: string;
  onClick: () => void;
  pending: boolean;
  updateDisabled: boolean;
}) => {
  return (
    <Button
      loadingText={loadingTitle}
      loading={pending}
      disabled={pending || updateDisabled}
      onClick={() => onClick()}
      variant="primary"
      type="button"
    >
      {title}
    </Button>
  );
};
