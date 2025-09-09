"use client";
import { Button } from "@stianlarsen/react-ui-kit";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ReactElement, ReactNode, useCallback, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import "./css/modal.css";

export const Modal = ({
  onClose,
  children,
  hasUnsavedChanges,
  replaceUrl = false,
  url = "",
  closeButton,
  className = "",
}: {
  children: ReactNode | ReactNode[] | ReactElement | ReactElement[];
  onClose?: () => void;
  hasUnsavedChanges?: boolean;
  replaceUrl?: boolean;
  url?: string;
  closeButton?: boolean;
  className?: string;
}) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const locale = useLocale();
  const router = useRouter();
  const text = useTranslations("general");

  const closeModal = useCallback(() => {
    if (hasUnsavedChanges) {
      const userConfirmed = window.confirm(
        text("tasks.CREATION.messages.UNSAVED_CHANGES"),
      );
      if (!userConfirmed) return;
    }

    if (replaceUrl) {
      const nextUrl = url ? `/${locale}/${url}` : `/${locale}`;
      router.replace(nextUrl, undefined);
    }

    onClose?.();

    // Close the native dialog if still mounted/open
    const el = modalRef.current;
    if (el?.open) el.close();

    document.body.removeAttribute("taskviewer-modal-open");
  }, [hasUnsavedChanges, replaceUrl, url, locale, router, onClose, text]);

  // Open the dialog ONCE on mount, do not re-focus on re-renders
  useEffect(() => {
    const el = modalRef.current;
    if (!el) return;

    // Mark body so global shortcuts respect the modal
    document.body.setAttribute("taskviewer-modal-open", "true");

    // Only open if not already open
    if (!el.open) {
      // Keep dialog out of the tab order; don't steal focus
      el.setAttribute("tabindex", "-1");
      el.showModal();
    }

    return () => {
      document.body.removeAttribute("taskviewer-modal-open");
      if (el.open) el.close();
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeModal();
    }
  };

  return (
    <dialog
      className={`modal ${className}`}
      id="modal"
      ref={modalRef}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
    >
      {closeButton && (
        <Button
          className="modal__closeButton"
          variant="icon"
          onClick={closeModal}
          tabIndex={0}
        >
          <MdClose />
        </Button>
      )}
      <div className="modal__backdrop-clickable" onClick={closeModal} />
      {children}
    </dialog>
  );
};
