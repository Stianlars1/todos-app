"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "../icons/icons";
import {
  InfoToastIcon,
  TaskBuddyToastIcon,
  WarningToastIcon,
} from "./icons/icons";
import "./toast.css";
export const toast = {
  success: (message: string, position?: ToastPositions) =>
    document.dispatchEvent(
      new CustomEvent("add-toast", {
        detail: { message, type: "success", position: position },
      })
    ),
  error: (message: string, position?: ToastPositions) =>
    document.dispatchEvent(
      new CustomEvent("add-toast", {
        detail: { message, type: "error", position: position },
      })
    ),
  info: (message: string, position?: ToastPositions) =>
    document.dispatchEvent(
      new CustomEvent("add-toast", {
        detail: { message, type: "info", position: position },
      })
    ),
};

type ToastPositions =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "bottomLeft"
  | "bottomCenter"
  | "bottomRight";

interface ToastType {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  position: ToastPositions;
}
export const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const isClient = typeof window !== "undefined"; // Check if it's running in the client

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const handleAddToast = (event: CustomEvent) => {
      const { message, type, position = "topCenter" } = event.detail;
      const newToast: ToastType = {
        id: Date.now().toString(),
        message,
        type,
        position,
      };

      setToasts((prevToasts) => [newToast, ...prevToasts].slice(0, 3)); // Keep only the latest 3 toasts
    };

    document.addEventListener("add-toast", handleAddToast as EventListener);
    return () =>
      document.removeEventListener(
        "add-toast",
        handleAddToast as EventListener
      );
  }, [isClient]);

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  // Prevent component from rendering on server-side
  if (!isClient) {
    return (
      <div className="toastContainer">
        <ol className="toastList"></ol>
      </div>
    );
  }

  return createPortal(
    <div suppressHydrationWarning className={`toastContainer`}>
      <ol className="toastList">
        {toasts.map((toast, index: number) => {
          return (
            <Toast
              key={`${toast.id}_${index}`}
              removeToast={removeToast}
              {...toast}
              style={{
                transform: `scale(${1 - index * 0.05}) translateY(-${
                  index * 20
                }px)`,
                zIndex: 1000 - index,
              }}
            />
          );
        })}
      </ol>
    </div>,
    document.body
  );
};

interface ToastProps {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  position: ToastPositions;
  style: React.CSSProperties;
  removeToast: (id: string) => void;
}
const Toast = ({
  id,
  message,
  type,
  style,
  position = "bottomRight",
  removeToast,
}: ToastProps) => {
  const [status, setStatus] = useState(" "); // New toasts start as 'entering'

  useEffect(() => {
    // Transition from 'entering' to 'entered'
    const enteringTimeout = setTimeout(() => {
      setStatus("entering"); // Change to 'entered' after the toast has appeared
    }, 0); // Short delay matching the enter animation time
    const enterTimeout = setTimeout(() => {
      setStatus("entered"); // Change to 'entered' after the toast has appeared
    }, 500); // Short delay matching the enter animation time

    // Schedule the transition to 'exiting' and then removal
    const exitTimeout = setTimeout(() => {
      setStatus("exiting"); // Start exit animation after 3 seconds visible time
      setTimeout(() => removeToast(id), 500); // Wait for exit animation to finish before removing
    }, 3500); // Visible duration (total time visible = 3s + 0.5s for enter animation)

    return () => {
      clearTimeout(enteringTimeout);
      clearTimeout(enterTimeout);
      clearTimeout(exitTimeout);
    };
  }, [id, removeToast]);

  return (
    <div className={`toast ${position} ${type} ${status}`} style={style}>
      <Icon type={type} /> {message}
    </div>
  );
};
const SuccessIcon = () => (
  <TaskBuddyToastIcon className="toastIcon checkMark" />
);
SuccessIcon.displayName = "SuccessIcon";

const ErrorIcon = () => <CloseIcon />;
ErrorIcon.displayName = "ErrorIcon";

const WarningIcon = () => <WarningToastIcon className="toastIcon" />;
WarningIcon.displayName = "WarningIcon";

const InfoIcon = () => <InfoToastIcon className="toastIcon" />;
InfoIcon.displayName = "InfoIcon";

const iconMap = {
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon,
};

const Icon = ({ type }: { type: ToastType["type"] }) => {
  const IconComponent = iconMap[type];
  return IconComponent ? <IconComponent /> : null;
};
