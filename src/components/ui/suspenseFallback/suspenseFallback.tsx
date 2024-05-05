import "./css/suspenseFallback.css";
export const SuspenseFallback = ({ fixed = false }: { fixed: boolean }) => {
  return (
    <div
      className={` ${fixed ? "suspense-fallback-fixed" : "suspense-fallback"}`}
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
