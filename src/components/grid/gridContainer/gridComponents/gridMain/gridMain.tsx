import { GridProps } from "../../types";
import "./css/gridMain.css";

export const GridMain = ({ children, activeDashboardName }: GridProps) => {
  return (
    <main className="grid-container__main">
      {activeDashboardName && (
        <div className="grid-container__activeDashboardName">
          {activeDashboardName}
        </div>
      )}
      {children}
    </main>
  );
};
