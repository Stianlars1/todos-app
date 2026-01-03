"use client";

import { useIsDarkmodeActive } from "@/hooks/useDarkmode";
import { useEffect, useState } from "react";
import { GoodbyeDarkModeSVG } from "../assets/GoodbyeDarkModeSVG";
import { GoodbyeLightModeSVG } from "../assets/GoodbyeLightModeSVG";

export const GoodbyeImage = ({ className }: { className: string }) => {
  const [hasHydrated, setHasHydrated] = useState(false);
  const { isDarkmodeActive } = useIsDarkmodeActive();
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) {
    return null;
  }
  return (
    <>
      {isDarkmodeActive ? (
        <GoodbyeDarkModeSVG className={className} />
      ) : (
        <GoodbyeLightModeSVG className={className} />
      )}
    </>
  );
};
