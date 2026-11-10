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

function RelatedHouses({
  houseId,
  language,
}: Props) {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);

  const t = translations[language];

  useEffect(() => {
    console.log("RelatedHouses Mounted", houseId);

    let ignore = false;

    async function load() {
      try {
        console.log("Fetching related:", houseId);

        setLoading(true);

        const res = await fetch(`${API}/${houseId}`, {
          cache: "force-cache",
        });

        if (!res.ok) {
          throw new Error("Failed to load related houses");
        }

        const data = await res.json();

        console.log("Related Houses API:", data);

        if (!ignore) {
          setHouses(data.houses || []);
        }
      } catch (err) {
        console.error("Related Houses Error:", err);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [houseId]);

  if (loading) {
    return null;
  }

  if (houses.length === 0) {
    return null;
  }

  return (
    <section className="related-houses">
      <h2 className="related-title">
        {t.relatedHouses || "Related House Designs"}
      </h2>

      <div className="related-grid">
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