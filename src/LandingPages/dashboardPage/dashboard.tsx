import { getUserDetails } from "@/app/actions/user/userApi";
import { CreateTodoButton } from "@/components/createTodo/components/createTodoButton/createTodoButton";
import { LogoutButton } from "@/components/ui/buttons/logoutButton";
import { ErrorMessage } from "@/components/ui/errorMessage/errorMessage";
import { SuspenseFallback } from "@/components/ui/suspenseFallback/suspenseFallback";
import { Suspense } from "react";
import { DashboardHeader } from "./components/dashboardHeader/dashboardHeader";
import { CategorizedTodos } from "./components/dashboardTodos/categorizedTodos";

export const DashboardPage = async () => {
  const { data: userDetails, error, isError } = await getUserDetails();

  //console.log("todosResponse", todosResponse);
  return (
    <Suspense fallback={<SuspenseFallback fixed={false} />}>
      <div className="dashboard">
        <DashboardHeader name={""} />
        <LogoutButton />
        <CreateTodoButton />
        <ErrorMessage isError={isError} errorMessage={error} />

        <CategorizedTodos />
      </div>
    </Suspense>
  );
};
