"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type Quill from "quill";
import { SuspenseFallback } from "../suspenseFallback/suspenseFallback";
import "./css/TextEditor.scss";
import "quill/dist/quill.snow.css"; // Import Quill styles
interface TextEditorProps {
  content: string;
  setContent?: Dispatch<SetStateAction<string>>;
  onChange?: (content: string, delta: any, source: string, editor: any) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;

  tabIndex?: number;
}

export const TextEditor = ({
  content,
  setContent,
  onChange,
  placeholder = "Write something...",
  readOnly = false,
  className = "",
  tabIndex = -1,
}: TextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const initializeQuill = useCallback(async () => {
    if (!editorRef.current || !isClient) return;

    try {
      // Dynamic import to handle SSR
      const QuillModule = await import("quill");
      const Quill = QuillModule.default;

      // Define toolbar modules
      const modules = {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
      };

      const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "bullet",
        "link",
        "image",
      ];

      // Initialize Quill
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules,
        formats,
        placeholder,
        readOnly,
      });

      // Set initial content
      if (content) {
        quill.root.innerHTML = content;
      }

      // Handle content changes
      quill.on("text-change", (delta, oldDelta, source) => {
        const html = quill.root.innerHTML;
        const editorApi = {
          getHTML: () => html,
          getText: () => quill.getText(),
          getContents: () => quill.getContents(),
          getLength: () => quill.getLength(),
          getSelection: () => quill.getSelection(),
          getBounds: (index: number, length?: number) =>
            quill.getBounds(index, length),
        };

        // Update content
        if (setContent && source !== "api") {
          setContent(html);
        }

        // Call onChange if provided
        if (onChange) {
          onChange(html, delta, source, editorApi);
        }
      });

      // Store quill instance
      quillRef.current = quill;

      // Disable tabbing into editor elements
      const editorElement = quill.root;
      if (editorElement) {
        editorElement.setAttribute("tabIndex", tabIndex.toString());
      }

      // Access the toolbar element through the DOM
      const quillContainer = editorRef.current;
      const toolbarElement = quillContainer?.querySelector(".ql-toolbar");
      if (toolbarElement) {
        const toolbarButtons =
          toolbarElement.querySelectorAll("button, [tabindex]");
        toolbarButtons.forEach((button: Element) => {
          (button as HTMLElement).setAttribute("tabindex", tabIndex.toString());
        });
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Failed to initialize Quill:", error);
      setIsLoading(false);
    }
  }, [
    content,
    setContent,
    onChange,
    placeholder,
    readOnly,
    tabIndex,
    isClient,
  ]);

  // Update content when prop changes
  useEffect(() => {
    if (quillRef.current && content !== quillRef.current.root.innerHTML) {
      const currentSelection = quillRef.current.getSelection();
      quillRef.current.root.innerHTML = content;

      // Restore selection if it existed
      if (currentSelection) {
        quillRef.current.setSelection(currentSelection);
      }
    }
  }, [content]);

  // Initialize Quill when component mounts
  useEffect(() => {
    if (isClient) {
      initializeQuill();
    }

    // Cleanup on unmount
    return () => {
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, [initializeQuill, isClient]);

  // Handle readOnly changes
  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.enable(!readOnly);
    }
  }, [readOnly]);

  // SSR guard
  if (!isClient) {
    return <SuspenseFallback fixed={false} />;
  }

  return (
    <div
      className={`${"textEditorContainer"} ${"qlTooltip"} ${className}`}
      suppressHydrationWarning
      suppressContentEditableWarning
      tabIndex={tabIndex}
    >
      {isLoading && <SuspenseFallback fixed={false} />}
      <div
        ref={editorRef}
        className={"quillEditor"}
        style={{ display: isLoading ? "none" : "block" }}
        aria-label="text-editor"
      />
    </div>
  );
};
