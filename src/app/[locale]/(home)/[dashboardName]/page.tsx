import { NewDashboardPage } from "./components/newDashboard/newDashboard";
import styles from "./css/page.module.css";
type Props = {
  params: { dashboardName: string };
};
export default async function Dashboard({ params }: Props) {
  const dashboardName = decodeURI(params.dashboardName);

  return (
    <>
      {/* <DashboardSwitch /> */}
      <header className={styles.dashboardName}>{dashboardName}</header>
      <NewDashboardPage dashboardName={dashboardName} />
    </>
  );
}
