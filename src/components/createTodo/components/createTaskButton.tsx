import { Button } from "@stianlarsen/react-ui-kit";
import { ReactElement, ReactNode } from "react";
import { useFormStatus } from "react-dom";

export const ConfirmCreateTaskButton = ({
  children,
  loadingText,
  disabled,
}: {
  children: ReactElement | ReactNode;
  loadingText: string;
  disabled: boolean;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      loading={pending}
      disabled={pending || disabled}
      loadingText={loadingText}
      type="submit"
      variant="primary"
    >
      {children}
    </Button>
  );
};
