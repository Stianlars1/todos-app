import { DashboardSwitch } from "@/LandingPages/dashboardPage/components/dashboardSwitch/dashboardSwitch";
import { DashboardPage } from "@/LandingPages/dashboardPage/dashboard";

export default async function Dashboard() {
  return (
    <>
      <DashboardSwitch />
      <DashboardPage />
    </>
  );
}
