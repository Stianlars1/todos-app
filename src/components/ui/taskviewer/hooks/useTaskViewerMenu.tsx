import { usePathname, useRouter } from "next/navigation";

export const useTaskViewerMenu = () => {
  const pathName = usePathname();
  const router = useRouter();
  const onTaskClick = (todoId: number) => {
    router.push(`${pathName}?selectedTask=${todoId}`, undefined);
  };

  return { onTaskClick };
};
