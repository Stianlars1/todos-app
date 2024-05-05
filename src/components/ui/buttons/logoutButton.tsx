"use client";

import { logout } from "@/app/actions/auth/logout";
import { Button } from "@stianlarsen/react-ui-kit";
import { useState } from "react";
import "./logoutButton.css";

export const LogoutButton = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  return (
    <Button
      aria-disabled={isLoggingOut}
      loading={isLoggingOut}
      loadingText="Logging out..."
      className="logout-button"
      onClick={async () => {
        try {
          setIsLoggingOut(true);
          await logout();
        } catch (error) {
          setIsLoggingOut(false);
        } finally {
          setIsLoggingOut(false);
        }
      }}
      variant="secondary"
    >
      Logout
    </Button>
  );
};
