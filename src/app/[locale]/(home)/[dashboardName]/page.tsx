import { DashboardSwitch } from "@/LandingPages/dashboardPage/components/dashboard/dashboardSwitch/dashboardSwitch";
import { DashboardPage } from "@/LandingPages/dashboardPage/dashboard";

type Props = {
  params: { dashboardName: string };
};
export default async function Dashboard({ params }: Props) {
  const dashboardName = decodeURI(params.dashboardName);

  return (
    <>
      {/* <DashboardSwitch /> */}
      {/* <header className={styles.dashboardName}>{dashboardName}</header> */}
      <DashboardSwitch />

      <DashboardPage dashboardName={dashboardName} />
    </>
  );
}
