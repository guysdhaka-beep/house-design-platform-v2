
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import "./HouseCard.css";

import translations from "../data/translations";
import type { House } from "../types/house";
import { getHouse } from "../data/houseCache";

type HouseCardProps = {
  house: House;
  language: keyof typeof translations;
};

function HouseCard({
  house,
  language,
}: HouseCardProps) {
  const navigate = useNavigate();

  const t = translations[language];

  const image3d = house.images[0]?.image || "";

  console.log("HOUSE =", house);
  console.log("IMAGE =", image3d);


  function openHouse() {
    getHouse(house.id).catch(() => {});

    navigate(`/house/${house.id}`);
  }

  function openFloorPlan(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.stopPropagation();

    getHouse(house.id).catch(() => {});

    navigate(
      `/floorplan/${house.folder}/${house.complete}/${house.id}`
    );
  }

  function openEstimate(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.stopPropagation();

    getHouse(house.id).catch(() => {});

    navigate(
      `/estimate/${house.folder}/${house.complete}/${house.id}`
    );
  }

  return (
    <div
      className="house-card"
      onClick={openHouse}
    >
      <div className="house-image-wrapper">



        <img
          className="house-image"
          src={image3d}
          alt="House Design"
          loading="lazy"
          decoding="async"
          fetchPriority="high"
          draggable={false}
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
          {house.complete} {t.story}
        </div>
      </div>

      <div className="house-body">
        <div className="house-info">
          🏗️ {house.foundation} {t.story} {t.foundation}
        </div>

        <div className="house-info">
          🏠 {house.complete} {t.story} {t.complete}
        </div>

        <button
          className="house-btn house-btn-floor"
          onClick={openFloorPlan}
        >
          📐 {t.view2d}
        </button>

        <button
          className="house-btn house-btn-estimate"
          onClick={openEstimate}
        >
          💰 {t.estimate}
        </button>
      </div>
    </div>
  );
}

export default memo(HouseCard);