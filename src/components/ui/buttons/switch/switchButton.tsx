"use client";
import { useState } from "react";
import styles from "./switchButton.module.css";

interface SwitchButtonProps {
  checked: boolean;
  onToggle: () => void;
  label?: string;
  size?: "xs" | "sm" | "md" | "lg"; // Adding size option
}

export const SwitchButton = ({
  checked,
  onToggle,
  label,
  size = "md", // default size
}: SwitchButtonProps) => {
  const [toggled, setToggled] = useState<boolean>(checked);

  const handleToggle = () => {
    setToggled(!toggled);
    onToggle();
  };
  return (
    <label className={`${styles.switch} ${styles[size]}`}>
      {label && <span className={styles.label}>{label}</span>}
      <input
        type="checkbox"
        checked={toggled}
        onChange={handleToggle}
        className={styles.input}
      />
      <span className={styles.slider}></span>
    </label>
  );
};
