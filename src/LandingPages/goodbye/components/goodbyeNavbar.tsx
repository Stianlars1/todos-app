"use client";
import { useIsDarkmodeActive } from "@/hooks/useDarkmode";
import { useEffect, useState } from "react";
import { LogoOnDarkmode } from "./nav/assets/LogoOnDarkmode";
import { LogoOnLightmode } from "./nav/assets/LogoOnLightmode";

export const GoodbyeNavbar = ({ className }: { className: string }) => {
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
        <LogoOnDarkmode className={className} />
      ) : (
        <LogoOnLightmode className={className} />
      )}
    </>
  );
};
