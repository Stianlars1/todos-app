"use client";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";
import "react-quill/dist/quill.snow.css"; // Ensure CSS is loaded

interface TextEditorProps {
  content: string;
  setContent?: Dispatch<SetStateAction<string>>;
}

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // Disable server-side rendering
  loading: () => <p>Loading editor...</p>, // Optional loading component
});

export const TextEditor: React.FC<TextEditorProps> = ({
  content,
  setContent,
}) => {
  // if document is not defined
  if (typeof document === "undefined") {
    return undefined;
  }
  const handleChange = (content: string) => {
    setContent && setContent(content);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <div suppressHydrationWarning>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
        modules={modules}
      />
    </div>
  );
};
