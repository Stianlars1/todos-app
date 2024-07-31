"use client";
import { useEffect, useState } from "react";

const detectSafari = (userAgent: string) =>
  /^((?!chrome|android).)*safari/i.test(userAgent);
const detectMobile = (userAgent: string) =>
  /iPhone|iPad|iPod|Android/i.test(userAgent);
const detectTouchDevice = () =>
  "ontouchstart" in window || navigator.maxTouchPoints > 0;

export const useBrowserInfo = () => {
  const [isSafari, setIsSafari] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileSize, setIsMobileSize] = useState(false);
  const updateDeviceInfo = () => {
    if (typeof window !== "undefined") {
      const userAgent = window.navigator.userAgent;
      setIsSafari(detectSafari(userAgent));

      // Detect mobile based on user agent and touch capabilities
      const mobileDetected = detectMobile(userAgent) || detectTouchDevice();
      setIsMobile(mobileDetected);
    }
  };

  const checkMobileSize = () => {
    if (typeof window !== "undefined") {
      setIsMobileSize(window.innerWidth < 768);
    }
  };

  useEffect(() => {
    updateDeviceInfo();
    // No need to listen to resize events anymore since we're not relying on window dimensions
    checkMobileSize();
    window.addEventListener("resize", checkMobileSize);
  }, []);

  return { isSafari, isMobile, isMobileSize };
};
