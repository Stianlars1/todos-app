"use client";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css"; // Ensure CSS is loaded
import { SuspenseFallback } from "../suspenseFallback/suspenseFallback";
interface TextEditorProps {
  content: string;
  setContent?: Dispatch<SetStateAction<string>>;
  onChange?: (e: any) => void;
}

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // Disable server-side rendering
  loading: () => <SuspenseFallback fixed={false} />, // Optional loading component
});

export const TextEditor: React.FC<TextEditorProps> = ({
  content,
  setContent,
  onChange,
}) => {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  // This useEffect will only run once, during the first client render
  useEffect(() => {
    // Updating a state causes a re-render
    setInitialRenderComplete(true);
  }, []);
  // if document is not defined
  if (typeof document === "undefined") {
    return undefined;
  }
  const handleChange = (content: string, e: any) => {
    onChange && onChange(e);
    setContent && setContent(content);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <>
      {initialRenderComplete && (
        <div suppressHydrationWarning suppressContentEditableWarning>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleChange}
            modules={modules}
          />
        </div>
      )}
    </>
  );
};
