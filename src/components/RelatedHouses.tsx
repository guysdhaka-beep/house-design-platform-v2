
import { useEffect, useState } from "react";

import HouseCard from "./HouseCard";
import translations from "../data/translations";

import type { House } from "../types/house";

import "../styles/relatedHouses.css";

type Props = {
  houseId: number;
  language: "bn" | "en" | "hi" | "ar" | "es";
};

const API =
  "https://house-design-platform-server.vercel.app/api/houses/related";

function RelatedHouses({ houseId, language }: Props) {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);

  const t = translations[language];

  useEffect(() => {
    let ignore = false;

    async function loadRelatedHouses() {
      try {
        setLoading(true);

        const response = await fetch(`${API}/${houseId}`, {
          cache: "no-cache",
        });

        if (!response.ok) {
          throw new Error("Failed to load related houses");
        }

        const data = await response.json();

        if (!ignore) {
          setHouses(data.houses || []);
        }
      } catch (error) {
        console.error("Related Houses Error:", error);

        if (!ignore) {
          setHouses([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadRelatedHouses();

    return () => {
      ignore = true;
    };
  }, [houseId]);

  if (loading || houses.length === 0) {
    return null;
  }

  return (
    <section
      className="related-houses"
      style={{
        position: "relative",
        width: "100%",
        marginTop: "40px",
        paddingTop: "20px",
      }}
    >
      <h2
        className="related-title"
        style={{
          position: "relative",
          display: "block",
          width: "100%",
          boxSizing: "border-box",
          textAlign: "center",
          margin: "0 0 28px",
          padding: "12px 16px",
          lineHeight: 1.5,
          zIndex: 1,
        }}
      >
        {t.relatedHouses || "Related House Designs"}
      </h2>

      <div
        className="related-grid"
        style={{
          position: "relative",
          marginTop: "0",
        }}
      >
        {houses.map((house) => (
          <HouseCard
            key={house.id}
            house={house}
            language={language}
          />
        ))}
      </div>
    </section>
  );
}

export default RelatedHouses;
