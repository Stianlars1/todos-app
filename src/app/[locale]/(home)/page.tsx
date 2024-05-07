import { DashboardPage } from "@/LandingPages/dashboardPage/dashboard";
import { verifySession } from "@/app/actions/session";
import { LOGIN_URL } from "@/utils/urls";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  return <DashboardPage />;
}
