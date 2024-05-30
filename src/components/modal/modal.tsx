"use client";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import "./css/modal.css";

export const Modal = ({
  onClose,
  children,
  hasUnsavedChanges,
  replaceUrl = false,
  url = "",
}: {
  children: ReactNode | ReactNode[] | ReactElement | ReactElement[];
  onClose: () => void;
  hasUnsavedChanges?: boolean;
  replaceUrl?: boolean;
  url?: string;
}) => {
  const [isModalOpen, setModalOpen] = useState(true);
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const locale = useLocale();
  const router = useRouter();
  const text = useTranslations("general");
  const handleCloseModal = () => {
    if (hasUnsavedChanges) {
      const userConfirmed = window.confirm(
        text("tasks.CREATION.messages.UNSAVED_CHANGES")
      );
      if (!userConfirmed) {
        return;
      }
    }

    if (replaceUrl) {
      const replaceUrl = url ? `/${locale}/${url}` : `/${locale}`;
      router.replace(replaceUrl, undefined);
    }

    if (onClose) onClose();
    setModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
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
