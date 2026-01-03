/*
"use client";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css"; // Ensure CSS is loaded
import { SuspenseFallback } from "../suspenseFallback/suspenseFallback";
import "./css/textEditor.css";
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
    setInitialRenderComplete(true);

    // Once the editor is rendered, disable tabbing into its elements
    if (typeof document !== "undefined") {
      const editorElement = document.querySelector(".ql-editor");
      if (editorElement) {
        editorElement.setAttribute("tabIndex", "-1"); // Disable tabbing into the editor
      }

      // Optionally, remove tabbing from the toolbar as well
      const toolbarElement = document.querySelector(".ql-toolbar");
      if (toolbarElement) {
        const toolbarButtons =
          toolbarElement.querySelectorAll("button, [tabindex]");
        toolbarButtons.forEach((button) => {
          button.setAttribute("tabindex", "-1");
        });
      }
    }
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
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <>
      {initialRenderComplete && (
        <div
          suppressHydrationWarning
          suppressContentEditableWarning
          tabIndex={-1} // Set tabIndex to -1 to skip tabbing into the editor
        >
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleChange}
            modules={modules}
            className={"qlTooltip"}
            aria-label="text-editor"
            tabIndex={-1}
          />
        </div>
      )}
    </>
  );
};
*/
