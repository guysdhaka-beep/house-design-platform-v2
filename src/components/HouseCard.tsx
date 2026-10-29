import { useNavigate } from "react-router-dom";
import translations from "../data/translations";

type HouseCardProps = {
  house: {
    id: number;
    type: string;
    folder: string;

    length: number;
    width: number;

    foundation: number;
    floor: number;

    cost: string;
  };

  language: keyof typeof translations;
};

function HouseCard({
  house,
  language,
}: HouseCardProps) {
  const navigate = useNavigate();

  const t = translations[language];


  return (
    <div
      onClick={() => navigate(`/house/${house.id}`)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow =
          "0 18px 40px rgba(0,0,0,.45)";
        e.currentTarget.style.borderColor = "#2563eb";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 8px 20px rgba(0,0,0,.25)";
        e.currentTarget.style.borderColor = "#2d2d2d";
      }}
      style={{
        width: "390px",
        borderRadius: "18px",
        overflow: "hidden",
        background: "#1f1f1f",
        border: "1px solid #2d2d2d",
        cursor: "pointer",
        transition: ".30s",
        boxShadow: "0 8px 20px rgba(0,0,0,.25)",
      }}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >

        <img
  src={`/images/${house.folder}/${house.id}/3d.png`}
  alt="House Design"
  style={{
    width: "100%",
    height: "auto",
    objectFit: "contain",
    display: "block",
    transition: ".35s",
  }}
/>

        <div
          style={{
            position: "absolute",
            left: "15px",
            top: "15px",
            background: "#2563eb",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: "30px",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {house.length} × {house.width} {t.feet}
        </div>

        <div
          style={{
            position: "absolute",
            right: "15px",
            top: "15px",
            background: "#16a34a",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: "30px",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {house.floor} {t.story}
        </div>
      </div>

      <div
        style={{
          padding: "18px",
        }}
      >
        <div
          style={{
            color: "#d5d5d5",
            fontSize: "18px",
            marginBottom: "8px",
          }}
        >
          🏗️ {house.foundation} {t.story} {t.foundation}
        </div>

        <div
          style={{
            color: "#d5d5d5",
            fontSize: "18px",
            marginBottom: "20px",
          }}
        >
          🏠 {house.floor} {t.story} {t.complete}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/floorplan/${house.folder}/${house.id}`);
          }}
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "12px",
            background:
              "linear-gradient(135deg,#2196F3,#1565C0)",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "700",
            cursor: "pointer",
            marginBottom: "12px",
            transition: ".25s",
            boxShadow:
              "0 8px 18px rgba(33,150,243,.35)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0)";
          }}
        >
          📐 {t.view2d}
        </button>
                <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/estimate/${house.folder}/${house.id}`);
          }}
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "12px",
            background:
              "linear-gradient(135deg,#22c55e,#16a34a)",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "700",
            cursor: "pointer",
            transition: ".25s",
            boxShadow:
              "0 8px 18px rgba(34,197,94,.35)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0)";
          }}
        >
          💰 {t.estimate}
        </button>
      </div>
    </div>
  );
}

export default HouseCard;