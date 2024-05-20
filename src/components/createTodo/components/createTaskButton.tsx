import { Button } from "@stianlarsen/react-ui-kit";
import { ReactElement, ReactNode } from "react";
import { useFormStatus } from "react-dom";

export const ConfirmCreateTaskButton = ({
  children,
  loadingText,
}: {
  children: ReactElement | ReactNode;
  loadingText: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      loading={pending}
      disabled={pending}
      loadingText={loadingText}
      type="submit"
      variant="primary"
    >
      {children}
    </Button>
  );
};
