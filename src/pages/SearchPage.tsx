import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import HouseCard from "../components/HouseCard";
import translations from "../data/translations";
import type { House } from "../types/house";

const API =
  "https://house-design-platform-server.vercel.app/api";

type Props = {
  language: keyof typeof translations;
};

export default function SearchPage({
  language,
}: Props) {
  const [params] = useSearchParams();

  const keyword = params.get("q") || "";

  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const res = await fetch(
          `${API}/houses/search?q=${encodeURIComponent(
            keyword
          )}`,
          {
            cache: "no-store",
          }
        );

        const data = await res.json();

        setHouses(data.houses || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (keyword.trim()) {
      load();
    } else {
      setLoading(false);
      setHouses([]);
    }
  }, [keyword]);

  return (
    <main
      style={{
        maxWidth: "1300px",
        margin: "0 auto",
        padding: "90px 15px 40px",
      }}
    >
      <h1
        style={{
          color: "#fff",
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        Search: "{keyword}"
      </h1>

      {loading ? (
        <p
          style={{
            color: "#fff",
            textAlign: "center",
          }}
        >
          Loading...
        </p>
      ) : houses.length === 0 ? (
        <p
          style={{
            color: "#fff",
            textAlign: "center",
          }}
        >
          No house found.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(280px,1fr))",
            gap: "22px",
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
      )}
    </main>
  );
}