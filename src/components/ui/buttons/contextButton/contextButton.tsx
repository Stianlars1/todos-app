"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./contextButton.module.css";

interface ContextButtonProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const ContextButton: React.FC<ContextButtonProps> = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [menuOpenClass, setMenuOpenClass] = useState(styles.menuIsClosed);
  const buttonRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const updateMenuPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 5, // top position right under the button
        left: rect.right - (menuRef.current?.offsetWidth || 0), // aligns right edges
      });
    }
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    if (isOpen) {
      setMenuPosition({ top: 0, left: 0 });
      setMenuOpenClass(styles.menuIsClosed);
    }
    if (!isOpen) {
      // To ensure it updates right before opening
      updateMenuPosition();
    }
  };

  useEffect(() => {
    let intervalId: any;
    let setOpenMenuClass: any;
    if (isOpen) {
      setOpenMenuClass = setTimeout(() => {
        setMenuOpenClass(styles.menuIsOpen);
      }, 50);
      intervalId = setInterval(() => {
        updateMenuPosition();
      }, 0); // Continuously update position every 50 when menu is open
    } else {
      clearInterval(intervalId);
      clearTimeout(setOpenMenuClass);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !buttonRef.current?.contains(event.target as Node) &&
        !menuRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setMenuOpenClass(styles.menuIsClosed);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      setMenuOpenClass(styles.menuIsClosed);
    };
  }, []);

  return (
    <div
      ref={buttonRef}
      className={`${styles.contextButton} ${isOpen ? styles.isOpen : ""}`}
    >
      <div onClick={handleToggle}>
        {React.cloneElement(trigger as React.ReactElement<any>, {
          "aria-expanded": isOpen,
        })}
      </div>
      {isOpen &&
        ReactDOM.createPortal(
          <div
            ref={menuRef}
            className={`${styles.contextMenu} ${menuOpenClass}`}
            style={{
              position: "fixed",
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
              zIndex: 1,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>,
          document.body
        )}
    </div>
  );
};

export default ContextButton;
