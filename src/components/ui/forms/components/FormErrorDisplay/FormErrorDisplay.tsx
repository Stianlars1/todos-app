"use client";

import { MdError, MdNetworkCheck, MdWarning } from "react-icons/md";
import styles from "./FormErrorDisplay.module.scss";

interface FormErrorDisplayProps {
  error: {
    type: "validation" | "authentication" | "server" | "network";
    message: string;
    fields?: Record<string, string[]>;
  };
  showFieldErrors?: boolean;
}

export const FormErrorDisplay = ({
  error,
  showFieldErrors = true,
}: FormErrorDisplayProps) => {
  const getErrorIcon = () => {
    switch (error.type) {
      case "network":
        return <MdNetworkCheck className={styles.icon} />;
      case "authentication":
        return <MdWarning className={styles.icon} />;
      default:
        return <MdError className={styles.icon} />;
    }
  };

  const getErrorClass = () => {
    return `${styles.base} ${styles[error.type]}`;
  };

  return (
    <div className={getErrorClass()}>
      {getErrorIcon()}
      <div className={styles.content}>
        <p className={styles.message}>{error.message}</p>

        {showFieldErrors && error.fields && (
          <ul className={styles.fieldList}>
            {Object.entries(error.fields).map(([field, messages]) => (
              <li key={field} className={styles.fieldItem}>
                <strong>{field}:</strong> {messages.join(", ")}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
