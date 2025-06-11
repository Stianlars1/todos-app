import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const useTaskViewerMenu = () => {
  const [isOpeningTask, setIsOpeningTask] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  const onTaskClick = (todoId: number) => {
    console.log("onTaskClick", todoId);
    setIsOpeningTask(true);
    try {
      router.replace(`${pathName}?selectedTask=${todoId}`, undefined);
    } finally {
      setIsOpeningTask(false);
    }
  };

  return { onTaskClick, isOpeningTask };
};
