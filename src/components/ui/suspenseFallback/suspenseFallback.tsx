import "./css/suspenseFallback.css";
export const SuspenseFallback = ({
  fixed = false,
  classname = "",
}: {
  fixed: boolean;
  classname?: string;
}) => {
  return (
    <div
      className={` ${
        fixed
          ? `suspense-fallback-fixed ${classname}`
          : `suspense-fallback ${classname}`
      }`}
    >
      <div
        className={` ${
          fixed
            ? "suspense-fallback-fixed__loader"
            : "suspense-fallback__loader"
        }`}
      />
    </div>
  );
};
export const Spinner = ({ classname = "" }: { classname?: string }) => {
  return (
    <div className={` ${`loaderWrapper ${classname}`}`}>
      <div className={` loaderWrapper__loader`} />
    </div>
  );
};
export const SpinnerWithTitle = ({
  title,
  classname = "",
}: {
  title: string;
  classname?: string;
}) => {
  return (
    <div className={` ${`loaderWrapper ${classname}`}`}>
      <div className={` loaderWrapper__loader`} />
      <i className="loaderWrapper__title">{title}</i>
    </div>
  );
};
