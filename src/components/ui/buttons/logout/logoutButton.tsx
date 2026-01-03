"use client";

import { logout } from "@/app/actions/auth/logout";
import { Button, Loader } from "@stianlarsen/react-ui-kit";
import {
  JSXElementConstructor,
  ReactElement,
  useState,
  useTransition,
} from "react";
import "./logoutButton.scss";
import { cx } from "@/utils/cx";

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
    await logout();
    setIsLoggingOut(false);
  };

  return (
    <Button
      aria-disabled={isLoggingOut}
      loading={isLoggingOut}
      loadingText={buttonLoadingTitle}
      className={`logout-button ${className}`}
      onClick={handleLogout}
      variant="link"
    >
      {buttonTitle}
    </Button>
  );
};
export const LogoutButtonSidebar = ({
  title,
  icon,
  className,
}: {
  title: string;
  icon: ReactElement<any, string | JSXElementConstructor<any>>;
  className?: string;
}) => {
  const [isLoggingOut, startLogout] = useTransition();

  function handleLogout() {
    startLogout(async () => {
      await logout();
    });
  }

  return (
    <button
      disabled={isLoggingOut}
      aria-disabled={isLoggingOut}
      className={cx(className)}
      onClick={handleLogout}
    >
      {isLoggingOut ? <Loader widthAndHeight={24} /> : icon}
      <span className="link-text">{title}</span>
    </button>
  );
};
