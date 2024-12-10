"use client";
import { useEffect, useState } from "react";
import { Modifiers } from "@dnd-kit/core";

export const useScrollModifiers = () => {
  const [modifiers, setModifiers] = useState<Modifiers>([]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setModifiers([
          ({ transform }) => ({
            ...transform,
            y: 0,
          }),
        ]);
      } else {
        setModifiers([]);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return modifiers;
};
