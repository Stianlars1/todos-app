import { getUserDetails } from "@/app/actions/user/userApi";
import { CreateTodoButton } from "@/components/createTodo/components/createTodoButton/createTodoButton";
import { CreateTaskTextsProps } from "@/components/createTodo/createTask";
import { ErrorMessage } from "@/components/ui/errorMessage/errorMessage";
import { SuspenseFallback } from "@/components/ui/suspenseFallback/suspenseFallback";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { DashboardHeader } from "./components/dashboardHeader/dashboardHeader";
import { CategorizedTodos } from "./components/dashboardTodos/categorizedTodos";

export const DashboardPage = async () => {
  const { data: userDetails, error, isError } = await getUserDetails();

  const createTaskTexts: CreateTaskTextsProps = await getCreateTodosTexts();

  return (
    <Suspense fallback={<SuspenseFallback fixed={false} />}>
      <div className="dashboard">
        <DashboardHeader name={userDetails?.firstName} />

        <CreateTodoButton createTaskTexts={createTaskTexts} />
        <ErrorMessage isError={isError} errorMessage={error} />

        <CategorizedTodos />
      </div>
    </Suspense>
  );
};

const getCreateTodosTexts = async () => {
  const texts = await getTranslations("Create-task");

  const messageObject: CreateTaskTextsProps = {
    header: {
      title: texts("header.title"),
      description: texts("header.description"),
    },
    form: {
      title: {
        label: texts("form.title.label"),
        placeholder: texts("form.title.placeholder"),
      },
      description: {
        label: texts("form.description.label"),
        placeholder: texts("form.description.placeholder"),
      },
      status: {
        label: texts("form.status.label"),
      },
      priority: {
        label: texts("form.priority.label"),
      },
      dueDate: {
        label: texts("form.dueDate.label"),
        placeholder: texts("form.dueDate.placeholder"),
      },
      content: {
        label: texts("form.content.label"),
      },
      tags: {
        label: texts("form.tags.label"),
        placeholder: texts("form.tags.placeholder"),
      },
    },
    submit: {
      title: texts("submit.title"),
    },
  };

  return messageObject;
};
