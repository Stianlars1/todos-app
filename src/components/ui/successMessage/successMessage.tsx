"use client";
import { MdCheck, MdClose, MdError } from "react-icons/md";

import { useState } from "react";
import "./css/successMessage.css";

export const SuccessMessage = ({ message }: { message: string }) => {
  if (message) {
    return (
      <div className={`success-message`}>
        <MdCheck className="success-message__icon" />{" "}
        <p className="success-message__message">{message}</p>
      </div>
    );
  }
};
