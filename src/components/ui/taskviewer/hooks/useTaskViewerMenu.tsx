import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export const useTaskViewerMenu = () => {
  const pathName = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const onTaskClick = (todoId: number) => {
    router.push(`${pathName}?selectedTask=${todoId}`, undefined);
  };

  return { onTaskClick };
};
