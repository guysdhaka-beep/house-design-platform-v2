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

  function openHouse() {
    getHouse(house.id).catch(() => {});

    const story =
      house.folder === "tinshade"
        ? "tin-shade"
        : house.folder;

    const slug = (house.title || "house")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    navigate(`/house/${story}/${slug}/${house.id}`);
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
            left: "12px",
            top: "12px",
            background: "#2563eb",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: "25px",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          {house.length} × {house.width} {t.feet}
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