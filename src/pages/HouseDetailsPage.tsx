import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import translations from "../data/translations";
import { houses } from "../data/houses";
import { incrementView } from "../data/views";

import "../styles/house-details.css";
import HomeButton from "../components/HomeButton";

function HouseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const language =
    (localStorage.getItem("language") as keyof typeof translations) || "bn";

  const house = houses.find((h) => h.id === Number(id));

  if (!house) {
    return <h2>House Not Found</h2>;
  }

  const imagePath = `/images/${house.folder}/${house.id}/3d.png`;

  useEffect(() => {
  if (house) {
    incrementView(house.id);
  }
}, [house]);

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

      <h1>🏠 House Details</h1>

      <h2>House ID: {id}</h2>

      <img
  src={imagePath}
  alt="3D House"
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
          onClick={() => navigate(`/floorplan/${house.folder}/${house.id}`)}
          style={{
            padding: "12px 25px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          📐 {translations[language].view2d}
        </button>

        <button
          onClick={() => navigate(`/estimate/${house.folder}/${house.id}`)}
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