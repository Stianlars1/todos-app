export const DropHere = () => {
  return (
    <>
      <div
        style={{
          padding: "20px",
          border: "1.3px dashed hsl(var(--muted))",
          textAlign: "center",
          borderRadius: "var(--radius)",
        }}
      >
        <p>Drop a task in here to change it&apos;s status</p>
      </div>
    </>
  );
};
