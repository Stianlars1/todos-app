import { MdCheck } from "react-icons/md";

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
