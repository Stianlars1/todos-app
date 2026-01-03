import { Button } from "@stianlarsen/react-ui-kit";
import { useFormStatus } from "react-dom";

export const LoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      <Button
        variant="primary"
        type="submit"
        loading={pending}
        disabled={pending}
        loadingText="Logging in..."
        id="login-signup-button"
        width="100%"
      >
        Login
      </Button>
    </>
  );
};
