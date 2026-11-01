type AdminTopbarProps = {
  title?: string;
};

export default function AdminTopbar({
  title = "Dashboard",
}: AdminTopbarProps) {
  return (
    <div
      style={{
        height: 70,
        background: "#1b1b1b",
        borderBottom: "1px solid #333",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
        color: "#fff",
      }}
    >
      <h2>{title}</h2>

      <div>
        Welcome Admin 👋
      </div>
    </div>
  );
}