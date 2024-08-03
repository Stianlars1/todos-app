"use client";
import { CSSProperties, useEffect, useState } from "react";

const ImageComponent = ({
  blob,
  alt,
  className,
  width,
  height,
}: {
  blob: any;
  alt: string;
  className?: string;
  width: number;
  height: number;
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const widthAndHeight: CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
  };
  useEffect(() => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      setImageUrl(url);

      // Clean up the blob URL after the component is unmounted
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [blob]);

  return (
    <img
      className={className ? className : ""}
      src={imageUrl}
      alt={alt}
      style={widthAndHeight}
    />
  );
};

export default ImageComponent;
