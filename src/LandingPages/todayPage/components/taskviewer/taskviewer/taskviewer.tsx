import { updateTodo } from "@/app/actions/todos/fetch";
import { UpdatedTodoDTO } from "@/app/actions/todos/types";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";
import { useFetchTask } from "@/components/todoModal/hooks/useFetchTask";
import { CloseIcon } from "@/components/ui/icons/icons";
import { SuspenseFallback } from "@/components/ui/suspenseFallback/suspenseFallback";
import { Tag } from "@/components/ui/tag/tags";
import { toast } from "@/components/ui/toast/toast";
import { Button } from "@stianlarsen/react-ui-kit";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import styles from "./css/taskviewer.module.scss";
type UPDATE_TASK = {
  isUpdating: boolean;
  isError: boolean | undefined;
  isSuccess: boolean | undefined;
};
export const Taskviewer = ({
  taskId,
  sidebarOpen,
}: {
  taskId: string;
  sidebarOpen: boolean;
}) => {
  const { task } = useFetchTask(taskId);
  const [markAsCompletedState, setMarkAsCompletedState] = useState<UPDATE_TASK>(
    { isUpdating: false, isError: undefined, isSuccess: undefined }
  );
  const [showTaskModal, setShowTaskModal] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  if (!task) return null;

  const handleClose = () => {
    router.replace(`/${locale}/today`, undefined);
    document
      .getElementById("grid-container")
      ?.setAttribute("data-sidebar-open", String(sidebarOpen));
  };

  const handleMarkAsCompleted = async () => {
    setMarkAsCompletedState({
      isUpdating: true,
      isError: undefined,
      isSuccess: undefined,
    });
    const updatedTask: UpdatedTodoDTO = { statusId: 3 };
    const updateResponse = await updateTodo(taskId, updatedTask);
    if (updateResponse.isError) {
      setMarkAsCompletedState({
        isUpdating: false,
        isError: true,
        isSuccess: false,
      });
    }

    setMarkAsCompletedState({
      isUpdating: false,
      isError: false,
      isSuccess: true,
    });
    router.replace(`/${locale}/today`, undefined);
    document
      .getElementById("grid-container")
      ?.setAttribute("data-sidebar-open", String(sidebarOpen));

    cacheInvalidate({ cacheKey: CacheKeys.TODOS_TODAY });
    toast.success("Task marked as completed");
  };

  if (!task) return <h2>No tasks due today</h2>;

  return (
    <Suspense fallback={<SuspenseFallback fixed={false} />}>
      <div className={styles.taskViewer}>
        <Button
          loading={markAsCompletedState.isUpdating}
          disabled={markAsCompletedState.isUpdating}
          variant="primary"
          onClick={handleMarkAsCompleted}
          loadingText="updating status.."
        >
          Mark as completed?
        </Button>
        <Button
          variant="icon"
          className={`${styles.backButton} ${
            markAsCompletedState.isSuccess && styles.success
          } ${markAsCompletedState.isError && styles.error}`}
          onClick={handleClose}
        >
          <CloseIcon />
        </Button>
        <header className={styles.header}>
          <h2 className={styles.title}>{task?.title}</h2>
          {task?.description && (
            <p className={styles.description}>{task?.description}</p>
          )}

          {(task?.priority || task?.tags) && (
            <div className={styles.info}>
              {task?.priority && (
                <Tag variant="priority" priority={task.priority!} />
              )}

              {task?.tags && <Tag variant="tag" tags={task.tags} />}
            </div>
          )}
        </header>

        {task?.content && (
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: task.content }}
          />
        )}
      </div>
    </Suspense>
  );
};
