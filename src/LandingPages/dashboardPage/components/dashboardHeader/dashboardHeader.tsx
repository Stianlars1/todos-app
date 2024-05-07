import { getTranslations } from "next-intl/server";
import "./css/dashboardHeader.css";
export const DashboardHeader = async ({
  name,
}: {
  name: string | undefined;
}) => {
  const t = await getTranslations("Dashboard");

  return (
    <header className="dashboard-header">
      <h1 className="dashboard-header__title">
        <span className="dashboard-header__title__hello">{t(`title`)}</span>{" "}
        <span className="dashboard-header__title__name">{name}</span>
      </h1>
    </header>
  );
};
