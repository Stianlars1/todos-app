"use client";
import { MdClose, MdError } from "react-icons/md";

import { useState } from "react";
import "./css/errorMessage.css";

export const ErrorMessage = ({
  isError,
  errorMessage,
  closeButton,
  margins = false,
}: {
  isError: boolean;
  errorMessage: string | null;
  closeButton?: boolean;
  margins?: boolean;
}) => {
  const [hide, setHide] = useState(false);
  if (!isError) return;

  if (hide) return;

  if (isError) {
    return (
      <div className={`error-message ${margins ? "with-margins" : " "}`}>
        <MdError className="error-message__icon" />{" "}
        <p className="error-message__message">{errorMessage}</p>
        {closeButton && (
          <MdClose
            className="error-message__close-button"
            onClick={() => setHide(true)}
          />
        )}
      </div>
    );
  }
};
