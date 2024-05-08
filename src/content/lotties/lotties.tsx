"use client";
import Lottie from "lottie-react";
import emailAnimationData from "./animations/email.json";
import signupAnimationData from "./animations/signup.json";
import successAnimationData from "./animations/success.json";
import tasksAnimationData from "./animations/tasks.json";

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
    },
    className: "lottie-animation",
  };

  return <Lottie {...defaultLottieOptions} />;
};
export const TasksAnimation = ({
  widthHeight = 250,
}: {
  widthHeight?: number | undefined;
}) => {
  const defaultLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: tasksAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    style: {
      width: `${widthHeight}px`,
      height: `${widthHeight}px`,
    },
    className: "lottie-animation",
  };

  return <Lottie {...defaultLottieOptions} />;
};
export const SignupAnimation = ({
  widthHeight = 250,
}: {
  widthHeight?: number | undefined;
}) => {
  const defaultLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: signupAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    style: {
      width: `${widthHeight}px`,
      height: `${widthHeight}px`,
    },
    className: "lottie-animation",
  };

  return <Lottie {...defaultLottieOptions} />;
};
export const EmailSentAnimation = ({
  widthHeight = 250,
}: {
  widthHeight?: number | undefined;
}) => {
  const defaultLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: emailAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    style: {
      width: `${widthHeight}px`,
      height: `${widthHeight}px`,
    },
    className: "lottie-animation",
  };

  return <Lottie {...defaultLottieOptions} />;
};
