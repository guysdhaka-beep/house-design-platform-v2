import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HouseCard from "../components/HouseCard";
import translations from "../data/translations";
import HomeButton from "../components/HomeButton";
import type { House } from "../types/house";

type HouseListPageProps = {
  language: keyof typeof translations;
};

function HouseListPage({ language }: HouseListPageProps) {
  const { type } = useParams();

  const t = translations[language];

  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://house-design-platform-server.vercel.app/api/houses", {
      cache: "force-cache",
    })
      .then((res) => res.json())
      .then((data) => {
        setHouses(data.houses || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = houses.filter(
    (house) => house.houseType === type
  );

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          color: "#fff",
          marginTop: "60px",
          fontSize: "22px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "40px 20px",
        textAlign: "center",
        boxSizing: "border-box",
      }}
    >
      <div style={{ textAlign: "left", marginBottom: "20px" }}>
        <HomeButton />
      </div>

      <h1
        style={{
          color: "#fff",
          marginBottom: "10px",
        }}
      >
        {t.houseList}
      </h1>

      <p
        style={{
          color: "#aaa",
          marginBottom: "35px",
          fontSize: "18px",
        }}
      >
        {type}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(390px, 1fr))",
          gap: "25px",
          justifyItems: "center",
        }}
      >
        {filtered.length > 0 ? (
          filtered.map((house) => (
            <HouseCard
              key={house.id}
              house={house}
              language={language}
            />
          ))
        ) : (
          <h2 style={{ color: "#fff" }}>
            {t.noHouse}
          </h2>
        )}
      </div>
    </div>
  );
}

export default HouseListPage;