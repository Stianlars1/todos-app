"use client";
import { searchTodos } from "@/app/actions/todos/fetch";
import { CustomInput } from "@/components/form/components/customInput/customInput";
import { SearchIcon } from "@/components/ui/icons/icons";
import { toast } from "@/components/ui/toast/toast";
import { TodoDTO } from "@/types/types";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { SearchShortcut } from "./components/searchShortcut/searchShortcut";
import { TaskSearchResponse } from "./components/taskSearchResponse/taskSearchResponse";
import styles from "./css/search.module.css";
export const Search = () => {
  const text = useTranslations("Search");
  const [tasks, setTasks] = useState<TodoDTO[] | undefined>(undefined);
  const searchInputRef = useRef<HTMLInputElement>(null); // Add ref for the input field
  const [hideShortcuts, setHideShortcuts] = useState(false);
  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.length < 2) {
      setTasks(undefined);
      return;
    }
    const response = await searchTodos(value);

    if (response.isError) {
      console.error("error", response.error);
    }

    if (response.isSuccess && response.data) {
      document.body.style.overflow = "hidden";

      setTasks(response.data.data);
    }
  };

  const manualSearch = async () => {
    if (document === undefined) return;

    const keyword = document.getElementById("search") as HTMLInputElement;
    if (keyword.value.length < 2) return;
    if (keyword) {
      const response = await searchTodos(keyword.value);

      if (response.isError) {
        console.error("error", response.error);
      }

      if (response.isSuccess && response.data) {
        document.body.style.overflow = "hidden";

        setTasks(response.data.data);
      }
    }
  };

  const handleEnterKey = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      manualSearch();
    }
  };

  const handleShortcut = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      const taskViewerOpened =
        document.body.getAttribute("taskviewer-modal-open") === true.toString();

      if (taskViewerOpened) {
        toast.info("Close the task viewer to search", "bottomRight");
        const searchInput = document.getElementById(
          "search",
        ) as HTMLInputElement;
        searchInput.blur();
        return;
      }
      searchInputRef.current?.focus();
    }
  };

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (
      event.key === "Escape" &&
      searchInputRef.current &&
      searchInputRef.current === document.activeElement
    ) {
      searchInputRef.current.value = "";
      searchInputRef.current.blur();
      setTasks(undefined);
      document.body.style.overflow = "auto";
    }
  };
  useEffect(() => {
    if (window === undefined) return;

    window.addEventListener("keydown", handleEnterKey);
    window.addEventListener("keydown", handleShortcut);
    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEnterKey);
      window.removeEventListener("keydown", handleShortcut);
      window.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
    };
  }, []);

  //   document.addEventListener("keydown", closeModalOnESC);
  //   if (tasks && tasks.length > 0) {
  //     document.body.style.overflow = "hidden";
  //   }

  //   return () => {
  //     document.removeEventListener("keydown", closeModalOnESC);
  //     document.body.style.overflow = "auto";
  //   };

  const handleClose = () => {
    setTasks(undefined);
    document.body.style.overflow = "auto";
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }

    window.removeEventListener("keydown", handleEscapeKey);
  };
  return (
    <div className={styles.searchWrapper}>
      <CustomInput
        id="search"
        name="search"
        type="search"
        placeholder={text("placeholder")}
        className={styles.searchInput}
        onChange={handleOnChange}
        ref={searchInputRef}
        width="100%"
        onFocus={() => setHideShortcuts(true)}
        onBlur={() => setHideShortcuts(false)}
      />

      <SearchIcon className={styles.searchIcon} />

      <SearchShortcut hide={hideShortcuts} className={styles.shortcuts} />

      <TaskSearchResponse
        fetchSuccess={!!tasks}
        searchTerm={searchInputRef.current?.value || ""}
        onClose={handleClose}
        tasks={tasks}
      />
    </div>
  );
};
