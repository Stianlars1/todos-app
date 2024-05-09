"use client";

import { logout } from "@/app/actions/auth/logout";
import { Button, Loader } from "@stianlarsen/react-ui-kit";
import { JSXElementConstructor, ReactElement, useState } from "react";
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
export const LogoutButtonSidebar = ({
  title,
  icon,
}: {
  title: string;
  icon: ReactElement<any, string | JSXElementConstructor<any>>;
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
    <button className={`sidebar__content__item__link `} onClick={handleLogout}>
      {isLoggingOut ? <Loader widthAndHeight={24} /> : icon}
      <span className="link-text">{title}</span>
    </button>
  );
};
