
import { useEffect, useState } from "react";

import AdminSidebar from "../components/layout/AdminSidebar";
import AdminTopbar from "../components/layout/AdminTopbar";
import "../styles/admin-dashboard.css";

type House = {
  id: number;
  status: string;
  isFeatured: boolean;
};

const API = "http://localhost:5000/api/houses";

export default function AdminDashboard() {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadStatistics() {
      try {
        const response = await fetch(API);
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Statistics loading failed");
        }

        setHouses(data.houses || []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    void loadStatistics();
  }, []);

  const statistics = [
    {
      title: "Total Houses",
      count: houses.length,
      icon: "🏠",
    },
    {
      title: "Published",
      count: houses.filter(
        (house) => house.status === "Published"
      ).length,
      icon: "🌐",
    },
    {
      title: "Draft",
      count: houses.filter(
        (house) => house.status === "Draft"
      ).length,
      icon: "📝",
    },
    {
      title: "Featured",
      count: houses.filter(
        (house) => house.isFeatured
      ).length,
      icon: "⭐",
    },
  ];

  return (
    <div className="dashboard-page">
      <AdminSidebar />

      <div className="dashboard-main">
        <AdminTopbar title="Dashboard" />

        <main className="dashboard-content">
          <div className="dashboard-heading">
            <span>ADMINISTRATION PANEL</span>
            <h1>House Design Platform CMS</h1>
            <p>Welcome to Admin Dashboard.</p>
          </div>

          {error && (
            <div className="dashboard-error">
              Unable to load statistics. Please check your server.
            </div>
          )}

          <div className="dashboard-statistics">
            {statistics.map((item) => (
              <div className="dashboard-stat-card" key={item.title}>
                <div className="dashboard-stat-icon">
                  {item.icon}
                </div>

                <h3>{item.title}</h3>

                <h2>
                  {loading ? "..." : item.count}
                </h2>
              </div>
            ))}
          </div>

          <div className="dashboard-footer">
            <span>House Design Platform</span>
            <span>Live Database Statistics</span>
          </div>
        </main>
      </div>
    </div>
  );
}
