import { getUserDetails } from "@/app/actions/user/userApi";
import { ErrorMessage } from "@/components/ui/errorMessage/errorMessage";
import { SuspenseFallback } from "@/components/ui/suspenseFallback/suspenseFallback";
import { Suspense } from "react";
import { DashboardHeader } from "./components/dashboardHeader/dashboardHeader";
import { Taskboard } from "./components/taskboard/taskboard";

export const DashboardPage = async () => {
  const { data: userDetails, error, isError } = await getUserDetails();

  return (
    <Suspense fallback={<SuspenseFallback fixed={false} />}>
      <div className="dashboard">
        <ErrorMessage isError={isError} errorMessage={error} />
        <DashboardHeader name={userDetails?.firstName} />

        <Taskboard userSettings={userDetails?.settings} />
      </div>
    </Suspense>
  );
};
