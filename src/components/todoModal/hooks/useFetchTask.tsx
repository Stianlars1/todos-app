import { TodoDTO } from "@/types/types";
import { FetchState } from "@/utils/fetch/customFetch";
import { useEffect, useState } from "react";

export const useFetchTask = (taskId: string) => {
  const [task, setTask] = useState<TodoDTO | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchTask = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api?taskId=${taskId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data: FetchState<TodoDTO> = await response.json();
        if (data.isError) {
          setIsError(true);
          return setError(data.error);
        }

        setTask(data.data);
        setIsSuccess(true);
      } catch (error) {
        console.error(error);
        setError("error");
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  return { task, isSuccess, isError, isLoading, error };
};
