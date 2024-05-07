"use client";

import { logout } from "@/app/actions/auth/logout";
import { Button } from "@stianlarsen/react-ui-kit";
import { useState } from "react";
import "./logoutButton.css";

export const LogoutButton = ({
  buttonTitle,
  buttonLoadingTitle,
  className = " ",
}: {
  buttonTitle: string;
  buttonLoadingTitle: string;
  className?: string;
}) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await logout();
    } catch (error) {
      setIsLoggingOut(false);
    }
  };

  return (
    <Button
      aria-disabled={isLoggingOut}
      loading={isLoggingOut}
      loadingText={buttonLoadingTitle}
      className={`logout-button ${className}`}
      onClick={handleLogout}
      variant="secondary"
    >
      {buttonTitle}
    </Button>
  );
};
