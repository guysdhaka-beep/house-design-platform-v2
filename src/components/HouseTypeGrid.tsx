import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import "./HouseTypeGrid.css";
import houseTypes from "../data/houseTypes";

type HouseTypeGridProps = {
  language: keyof typeof houseTypes;
};

function HouseTypeGrid({
  language,
}: HouseTypeGridProps) {
  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (path: string) => {
      navigate(`/houses/${path}`);
    },
    [navigate]
  );

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
          key={item.path}
          className="house-btn"
          onClick={() => handleNavigate(item.path)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default memo(HouseTypeGrid);