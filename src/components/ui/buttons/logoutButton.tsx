"use client";

import { logout } from "@/app/actions/authentication";
import { Button } from "@stianlarsen/react-ui-kit";

export const LogoutButton = () => {
  return (
    <Button
      onClick={async () => {
        await logout();
      }}
      variant="secondary"
    >
      Logout
    </Button>
  );
};
