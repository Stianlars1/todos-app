import "./css/gridContainer.css";
import { GridProps } from "./types";

export const GridContainer = ({ children }: GridProps) => {
  return <div className="grid-container">{children}</div>;
};
