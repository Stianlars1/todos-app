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
