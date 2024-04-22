"use client";
import Lottie from "lottie-react";
import successAnimationData from "./animations/success.json";

export const SuccessAnimation = ({
  widthHeight = 250,
}: {
  widthHeight?: number | undefined;
}) => {
  const defaultLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: successAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    style: {
      width: `${widthHeight}px`,
      height: `${widthHeight}px`,
      margin: "0 auto",
    },
    className: "success-animation",
  };

  return <Lottie {...defaultLottieOptions} />;
};
