import "./css/dashboardHeader.css";
export const DashboardHeader = ({ name }: { name: string | undefined }) => {
  return (
    <header className="dashboard-header">
      <h1 className="dashboard-header__title">
        <span className="dashboard-header__title__hello">helloo</span>{" "}
        <span className="dashboard-header__title__name">{name}</span>
      </h1>
    </header>
  );
};
