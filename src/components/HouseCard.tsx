import { memo } from "react";
import { useNavigate } from "react-router-dom";

import translations from "../data/translations";
import type { House } from "../types/house";

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

  const image3d =
    house.images.find((img) => img.type === "3d")?.image || "";

  function openHouse() {
    fetch(
      `https://house-design-platform-server.vercel.app/api/houses/${house.id}`,
      {
        cache: "force-cache",
      }
    ).catch(() => {});

    navigate(`/house/${house.id}`);
  }

  function openFloorPlan(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.stopPropagation();

    fetch(
      `https://house-design-platform-server.vercel.app/api/houses/${house.id}`,
      {
        cache: "force-cache",
      }
    ).catch(() => {});

    navigate(
      `/floorplan/${house.folder}/${house.complete}/${house.id}`
    );
  }

  function openEstimate(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.stopPropagation();

    fetch(
      `https://house-design-platform-server.vercel.app/api/houses/${house.id}`,
      {
        cache: "force-cache",
      }
    ).catch(() => {});

    navigate(
      `/estimate/${house.folder}/${house.complete}/${house.id}`
    );
  }

  return (
    <div
      onClick={openHouse}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-8px)";
        e.currentTarget.style.boxShadow =
          "0 18px 40px rgba(0,0,0,.45)";
        e.currentTarget.style.borderColor =
          "#2563eb";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 8px 20px rgba(0,0,0,.25)";
        e.currentTarget.style.borderColor =
          "#2d2d2d";
      }}
      style={{
        width: "390px",
        borderRadius: "18px",
        overflow: "hidden",
        background: "#1f1f1f",
        border: "1px solid #2d2d2d",
        cursor: "pointer",
        transition: ".30s",
        boxShadow:
          "0 8px 20px rgba(0,0,0,.25)",
      }}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={image3d}
          alt="House Design"
          loading="lazy"
          decoding="async"
          fetchPriority="high"
          draggable={false}
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
          {house.complete} {t.story}
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
          🏠 {house.complete} {t.story} {t.complete}
        </div>

        <button
          onClick={openFloorPlan}
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
          onClick={openEstimate}
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

export default memo(HouseCard);