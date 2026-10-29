import "./HouseTypeGrid.css";
import { useNavigate } from "react-router-dom";
import houseTypes from "../data/houseTypes";

type HouseTypeGridProps = {
  language: keyof typeof houseTypes;
};

function HouseTypeGrid({ language }: HouseTypeGridProps) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 180px)",
        gap: "15px",
        justifyContent: "center",
      }}
    >
      {houseTypes[language].map((item) => (
        <button
          className="house-btn"
          key={item.path}
          onClick={() => navigate(`/houses/${item.path}`)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default HouseTypeGrid;