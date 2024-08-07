import { useEffect, useState } from "react";

const usePlatform = () => {
  const [platform, setPlatform] = useState<"mac" | "windows" | "unknown">(
    "unknown"
  );

  useEffect(() => {
    const userAgent = navigator.userAgent.toUpperCase();
    if (userAgent.indexOf("MAC") >= 0) {
      setPlatform("mac");
    } else if (userAgent.indexOf("WIN") >= 0) {
      setPlatform("windows");
    } else {
      setPlatform("unknown");
    }
  }, []);

  return platform;
};

export default usePlatform;
