import { ReactElement, ReactNode } from "react";
import "./css/badge.css";
export const Badge = ({
  children,
  variant,
  width,
  href,
}: {
  children: ReactElement | ReactNode;
  variant: "primary" | "secondary" | "muted" | "outlined" | "text" | "link";
  width?: "100%" | "fit-content";
  href?: string;
}) => {
  if (variant === "text") {
    return (
      <span style={{ width: width }} className={`badge badge-text`}>
        {children}
      </span>
    );
  }

  if (variant === "link") {
    return (
      <a
        style={{ width: width }}
        className={`badge badge-link`}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }
  return (
    <div style={{ width: width }} className={`badge badge-${variant}`}>
      {children}
    </div>
  );
};
