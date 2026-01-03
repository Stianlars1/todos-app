import { useCallback } from "react";

export const useHapticFeedback = () => {
  const triggerHaptic = useCallback(() => {
    if (typeof window !== "undefined" && "navigator" in window) {
      if ("vibrate" in navigator) {
        navigator.vibrate(50); // 50ms vibration
      }
    }
  }, []);

  return { triggerHaptic, playHapticFeedback: triggerHaptic };
};
