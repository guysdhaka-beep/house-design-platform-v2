import { Link } from "react-router-dom";

const menu = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    name: "Add House",
    path: "/admin/add-house",
  },
  {
    name: "House List",
    path: "/admin/houses",
  },
  {
    name: "Upload Images",
    path: "/admin/upload",
  },
  {
    name: "Statistics",
    path: "/admin/statistics",
  },
  {
    name: "Settings",
    path: "/admin/settings",
  },
];

export default function AdminSidebar() {
  return (
    <aside
      style={{
        width: 260,
        background: "#111",
        color: "#fff",
        minHeight: "100vh",
        padding: 25,
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          marginBottom: 40,
          color: "#d4af37",
        }}
      >
        House Design
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              textDecoration: "none",
            }}
          >
            <button
              style={{
                width: "100%",
                padding: 12,
                cursor: "pointer",
              }}
            >
              {item.name}
            </button>
          </Link>
        ))}

        <button
          style={{
            marginTop: 50,
          }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}