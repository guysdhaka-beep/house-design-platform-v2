import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import translations from "../data/translations";
import HomeButton from "../components/HomeButton";

function FloorPlanPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const language =
    (localStorage.getItem("language") as keyof typeof translations) || "bn";

  const [house, setHouse] = useState<any>(null);

  useEffect(() => {
    fetch(`https://house-design-platform-server.vercel.app/api/houses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setHouse(data.house);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!house) {
    return <h2>Loading...</h2>;
  }

  const image2d =
    house.images?.find((img: any) => img.type === "2d")?.image || "";

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px",
        boxSizing: "border-box",
        textAlign: "center",
      }}
    >
      <div style={{ textAlign: "left", marginBottom: "20px" }}>
        <HomeButton />
      </div>

      <h1>📐 2D Floor Plan</h1>

      <img
        src={`https://house-design-platform-server.vercel.app/uploads/2d/${image2d}`}
        alt="2D Floor Plan"
        style={{
          width: "100%",
          maxWidth: "700px",
          borderRadius: "12px",
          display: "block",
          margin: "30px auto",
          boxShadow: "0 8px 25px rgba(0,0,0,.25)",
        }}
      />

      <div className="button-group">
        <button onClick={() => navigate(`/house/${house.id}`)}>
          🏠 {translations[language].view3d}
        </button>

        <button onClick={() => navigate(`/estimate/${house.id}`)}>
          💰 {translations[language].estimate}
        </button>
      </div>
    </div>
  );
}

export default FloorPlanPage;