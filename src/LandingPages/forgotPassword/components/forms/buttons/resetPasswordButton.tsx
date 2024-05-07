"use client";
import { Button } from "@stianlarsen/react-ui-kit";
import { useFormStatus } from "react-dom";

export const ResetPasswordButton = ({
  variant,
}: {
  variant: "forgot-password" | "reset-password";
}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      loadingText="creating reset link"
      loading={pending}
      variant="primary"
      type="submit"
    >
      {variant === "forgot-password" ? "Send reset link" : "Update password"}
    </Button>
  );
};
