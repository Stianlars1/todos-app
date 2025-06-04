"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { StatusCode, TodoDTO } from "@/types/types";
import { deleteTask, moveTask } from "@/app/actions/dragDrop/fetch";
import { toast } from "@/components/ui/toast/toast";
import { cacheInvalidate } from "@/app/lib/cache/cache";
import { CacheKeys } from "@/app/lib/cache/keys";

type ActiveTaskState = TodoDTO & {
  originalIndex: number;
  originalPosition: number;
};

type columnsAndTasksContextType = {
  columns: StatusCode[];
  tasks: TodoDTO[];
  originalTasks: TodoDTO[];
  activeColumn: StatusCode | null;
  activeTask: ActiveTaskState | null;
  columnsIds: StatusCode[];
  activeDashboardId: number | null;

  setColumns: Dispatch<SetStateAction<StatusCode[]>>;
  setActiveDashboardId: Dispatch<SetStateAction<number | null>>;
  setTasks: Dispatch<SetStateAction<TodoDTO[]>>;
  setOriginalTasks: (tasks: TodoDTO[]) => void;
  setActiveColumn: (column: StatusCode | null) => void;
  setActiveTask: (task: ActiveTaskState | null) => void;
  removeTask: (task: TodoDTO, activeDashboardId: number) => Promise<void>;
  handleOptimisticUpdate: (id: string) => void;
};

const columnsAndTasksContext = createContext<
  columnsAndTasksContextType | undefined
>(undefined);

export const ColumnsAndTasksProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [tasks, setTasks] = useState<TodoDTO[]>([]);
  const [activeDashboardId, setActiveDashboardId] = useState<number | null>(
    null,
  );
  const [columns, setColumns] = useState<StatusCode[]>([]);
  const [originalTasks, setOriginalTasks] = useState<TodoDTO[]>([]);
  const [activeColumn, setActiveColumn] = useState<StatusCode | null>(null);
  const [activeTask, setActiveTask] = useState<ActiveTaskState | null>(null);
  const columnsIds = useMemo(() => columns.map((col) => col), [columns]);

  const handleOptimisticUpdate = (todoId: string) => {
    // API call here
    return;
  };

  const removeTask = async (task: TodoDTO, activeDashboardId: number) => {
    const todoId = task.todoId;
    setTasks((prevTasks) => prevTasks.filter((t) => t.todoId !== todoId));

    // if todo is already in the deleted column and the user wants to actually delete it permanently
    if (task.status.statusCode === "DELETED") {
      const permanentlyDelete = await deleteTask(todoId);

      if (permanentlyDelete.isError) {
        console.log("Error:", permanentlyDelete.error);
        toast.error("Error deleting task", "bottomRight");
      }
      if (permanentlyDelete.isSuccess) {
        await cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });
        await cacheInvalidate({ cacheKey: CacheKeys.ALL_TODOS });
        toast.success("Task was permanently deleted", "bottomRight");
      }
      return;
    }

    const DELETED = "DELETED";
    const deleteResponse = await moveTask({
      categoryCode: DELETED,
      newSortIndex: 1,
      todoId,
      activeDashboardId,
    });
    if (deleteResponse.isError) {
      toast.error("Error deleting task", "bottomRight");
      return;
    }

    if (deleteResponse.isSuccess) {
      await cacheInvalidate({ cacheKey: CacheKeys.CATEGORIZED_TODOS });
      await cacheInvalidate({ cacheKey: CacheKeys.ALL_TODOS });
      toast.success("Task was deleted successfully", "bottomRight");
      return;
    }
  };

  return (
    <columnsAndTasksContext.Provider
      value={{
        tasks,
        columns,
        setTasks,
        setColumns,
        removeTask,
        handleOptimisticUpdate,
        setOriginalTasks,
        setActiveColumn,
        setActiveTask,
        setActiveDashboardId,
        activeDashboardId,
        columnsIds,
        originalTasks,
        activeColumn,
        activeTask,
      }}
    >
      {children}
    </columnsAndTasksContext.Provider>
  );
};

export const useColumnsAndTasks = () => {
  const context = useContext(columnsAndTasksContext);
  if (!context) throw new Error("useItems must be used within ItemsProvider");
  return context;
};
