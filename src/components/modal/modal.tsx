"use client";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import "./css/modal.css";

export const Modal = ({
  onClose,
  children,
}: {
  children: ReactNode | ReactNode[] | ReactElement | ReactElement[];
  onClose: () => void;
}) => {
  const [isModalOpen, setModalOpen] = useState(true);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleCloseModal = () => {
    if (onClose) onClose();
    setModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }

    return () => {};
  }, [isModalOpen, modalRef.current]);
  return (
    <dialog
      className="modal"
      id="modal"
      ref={modalRef}
      onKeyDown={handleKeyDown}
    >
      <div
        className="modal__backdrop-clickable"
        onClick={handleCloseModal} // Close the modal if this backdrop is clicked
      />

      {children}
    </dialog>
  );
};
