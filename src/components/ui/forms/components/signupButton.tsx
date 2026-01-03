import { Button } from "@stianlarsen/react-ui-kit";
import { useFormStatus } from "react-dom";

export const SignUpButton = ({ disabled }: { disabled: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <>
      <Button
        variant="primary"
        type="submit"
        loading={pending}
        disabled={pending || disabled}
        loadingText="Signing up..."
        id="login-signup-button"
        width="100%"
      >
        Sign Up
      </Button>
    </>
  );
};
