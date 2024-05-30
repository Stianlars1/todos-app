"use client";
import { Modal } from "../modal/modal";
import { Task } from "../task/task";
import { useFetchTask } from "./hooks/useFetchTask";

export const TodoModal = ({
  taskId,
  onClose,
}: {
  taskId: string;
  onClose: () => void;
}) => {
  const { task, isSuccess, isError, isLoading, error } = useFetchTask(taskId);

  return (
    <Modal onClose={onClose} replaceUrl url="">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error}</p>}
      {isSuccess && task && <Task task={task} />}
    </Modal>
  );
};
