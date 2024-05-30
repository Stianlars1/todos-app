import React from "react";
import styles from "./skeleton.module.css";

type SkeletonProps = {
  variant?: "pulse" | "skimmer";
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
};

const Skeleton: React.FC<SkeletonProps> = ({
  variant = "pulse",
  width,
  height,
  style,
}) => {
  const skeletonStyle: React.CSSProperties = {
    width,
    height,
    ...style,
  };

  return (
    <div
      className={`${styles.skeleton} ${styles[variant]}`}
      style={skeletonStyle}
    ></div>
  );
};

export default Skeleton;
