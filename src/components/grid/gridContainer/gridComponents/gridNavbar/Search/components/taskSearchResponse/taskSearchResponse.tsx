"use client";
import { shouldReturn } from "@/components/ui/cards/draggableCard/draggableCard";
import { TaskCard } from "@/components/ui/cards/taskCard/taskCard";
import { CloseIcon } from "@/components/ui/icons/icons";
import { TodoDTO } from "@/types/types";
import { sortTasks } from "@/utils/utils";
import { Button } from "@stianlarsen/react-ui-kit";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./css/taskSearchResponse.module.css";

export const TaskSearchResponse = ({
  tasks,
  searchTerm,
  onClose,
}: {
  tasks: TodoDTO[] | undefined;
  searchTerm: string;
  onClose?: () => void;
}) => {
  const text = useTranslations("Search");
  const pathName = usePathname();
  const [hasMounted, setHasMounted] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState<TodoDTO[]>(tasks || []);
  const [filters, setFilters] = useState({
    title: true,
    description: true,
    tags: true,
  });
  const locale = useLocale();
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasMounted(true);
      const closeModalOnESC = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          const taskViewer = document.body.getAttribute(
            "taskviewer-modal-open"
          );
          if (taskViewer === "true") {
            return;
          }

          console.log("ESC pressed in TaskSearchResponse");
          document.body.setAttribute("search-modal-open", false.toString());
          onClose && onClose();
        }
      };

      if (tasks && tasks.length > 0) {
        window.addEventListener("keydown", closeModalOnESC);
        document.body.setAttribute("search-modal-open", true.toString());
        document.body.style.overflow = "hidden";
      }

      return () => {
        window.removeEventListener("keydown", closeModalOnESC);
        document.body.style.overflow = "auto";
      };
    }
  }, [tasks, onClose]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (tasks) {
        setFilteredTasks(
          sortTasks(
            tasks.filter((task) => {
              if (
                filters.title &&
                task.title.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return true;
              }
              if (
                filters.description &&
                task.description &&
                task.description
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return true;
              }
              if (
                filters.tags &&
                task.tags.some((tag) =>
                  tag.toLowerCase().includes(searchTerm.toLowerCase())
                )
              ) {
                return true;
              }
              return false;
            })
          )
        );
      }
    }
  }, [tasks, filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.checked });
  };

  const handleOnCardClick = (
    event: React.MouseEvent<HTMLLIElement>,
    todoId: any
  ) => {
    const shouldItReturn = shouldReturn(event);
    if (shouldItReturn) {
      return;
    }

    event.preventDefault();
    console.log("pathName", pathName);
    router.push(`${pathName}?selectedTask=${todoId}`, {
      scroll: false,
    });
  };

  return hasMounted
    ? createPortal(
        <>
          <>
            {tasks && tasks.length > 0 && (
              <section className={styles.taskSection}>
                <Button
                  className={styles.close}
                  variant="icon"
                  onClick={() => onClose && onClose()}
                >
                  <CloseIcon className={styles.svg} />
                </Button>
                <header className={styles.header}>
                  <h2 className={styles.title}>
                    {text("results")}
                    <span className={styles.resultCount}>
                      {filteredTasks.length}
                    </span>
                  </h2>
                  <div className={styles.filtersWrapper}>
                    <h3>{text("filterBy")}</h3>
                    <div className={styles.filters}>
                      <label className={styles.label}>
                        <input
                          type="checkbox"
                          name="title"
                          checked={filters.title}
                          onChange={handleFilterChange}
                        />
                        {text("filterTitle")}
                      </label>
                      <label className={styles.label}>
                        <input
                          type="checkbox"
                          name="description"
                          checked={filters.description}
                          onChange={handleFilterChange}
                        />
                        {text("filterDescription")}
                      </label>
                      <label className={styles.label}>
                        <input
                          type="checkbox"
                          name="tags"
                          checked={filters.tags}
                          onChange={handleFilterChange}
                        />
                        {text("filterTags")}
                      </label>
                    </div>
                  </div>
                </header>
                <ul className={styles.tasksList}>
                  {filteredTasks.map((task, index) => (
                    <TaskCard
                      onClick={(event) => handleOnCardClick(event, task.todoId)}
                      index={index}
                      task={task}
                      className={styles.task}
                      key={task.todoId}
                      options={{
                        showDate: true,
                        showPriority: true,
                        showTags: true,
                      }}
                    />
                  ))}
                </ul>
              </section>
            )}
          </>
        </>,
        document.getElementById("grid-container") ?? document.body
      )
    : null;
};
