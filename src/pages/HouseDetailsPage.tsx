
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import translations from "../data/translations";
import { incrementView } from "../data/views";

import "../styles/house-details.css";
import HomeButton from "../components/HomeButton";

function HouseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const language =
    (localStorage.getItem("language") as keyof typeof translations) || "bn";

  const [house, setHouse] = useState<any>(null);

  // House API
  useEffect(() => {
    fetch(`http://localhost:5000/api/houses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setHouse(data.house);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // View Count
  useEffect(() => {
    if (house) {
      incrementView(house.id);
    }
  }, [house]);

  if (!house) {
    return <h2>Loading...</h2>;
  }

  // 3D Image
  const image3d =
    house.images?.find((img: any) => img.type === "3d")?.image || "";

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

      {/* House Title */}
      <h2
        style={{
          fontSize: "26px",
          fontWeight: 600,
          margin: "15px 0 5px",
        }}
      >
        {house.title}
      </h2>

      <img
        src={`http://localhost:5000/uploads/3d/${image3d}`}
        alt={house.title || "3D House"}
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
        <button
          onClick={() => navigate(`/floorplan/${house.id}`)}
          style={{
            padding: "12px 25px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          📐 {translations[language].view2d}
        </button>

        <button
          onClick={() => navigate(`/estimate/${house.id}`)}
          style={{
            padding: "12px 25px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          💰 {translations[language].estimate}
        </button>
      </div>
    </div>
  );
}

export default HouseDetailsPage;
