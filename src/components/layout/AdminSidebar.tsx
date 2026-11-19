import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Add House", path: "/admin/add-house" },
  { name: "House List", path: "/admin/houses" },
  { name: "Upload Images", path: "/admin/upload" },
  { name: "Statistics", path: "/admin/statistics" },
  { name: "Settings", path: "/admin/settings" },
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
          <NavLink
            key={item.path}
            to={item.path}
            style={{
              textDecoration: "none",
            }}
          >
            {({ isActive }) => (
              <button
                style={{
                  width: "100%",
                  padding: 12,
                  cursor: "pointer",
                  border: "none",
                  borderRadius: 6,
                  fontWeight: 600,
                  color: "#fff",
                  backgroundColor: isActive ? "#22c55e" : "#6b6b6b",
                  transition: "all 0.2s ease",
                }}
              >
                {item.name}
              </button>
            )}
          </NavLink>
        ))}

        <button
          style={{
            marginTop: 50,
            width: "100%",
            padding: 12,
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            background: "#6b6b6b",
            color: "#fff",
            fontWeight: 600,
          }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}