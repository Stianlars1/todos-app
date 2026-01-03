import {
  CSSProperties,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
} from "react";
import styles from "./css/customTextArea.module.scss";
import { geistSans } from "@/fonts";

interface CustomTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  width?: "100%" | "fit-content";
}

export const CustomTextArea = ({ width, ...props }: CustomTextAreaProps) => {
  const customStyle: CSSProperties = width
    ? { width: width, height: "fit-content" }
    : {};

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      const adjustHeight = () => {
        textArea.style.height = "auto"; // Reset height to auto
        textArea.style.height = `${
          textArea.scrollHeight === 0
            ? "fit-content"
            : `${textArea.scrollHeight}px`
        }`; // Set height to scrollHeight
      };
      adjustHeight(); // Adjust height on mount
      textArea.addEventListener("input", adjustHeight); // Adjust height on input
      return () => textArea.removeEventListener("input", adjustHeight); // Cleanup
    }
  }, [props]);
  return (
    <textarea
      ref={textAreaRef}
      style={customStyle}
      {...props}
      className={`${styles.customTextArea} ${geistSans.className} ${
        props.className ? props.className : " "
      } `}
    />
  );
};
