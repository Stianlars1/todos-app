import { Button } from "@stianlarsen/react-ui-kit";
import { useFormStatus } from "react-dom";

export const SignUpButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      <Button
        variant="primary"
        type="submit"
        loading={pending}
        disabled={pending}
        loadingText="Signing up..."
        id="login-signup-button"
        width="100%"
      >
        Sign Up
      </Button>
    </>
  );
};
