import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HouseCard from "../components/HouseCard";
import translations from "../data/translations";
import HomeButton from "../components/HomeButton";
import type { House } from "../types/house";

type HouseListPageProps = {
  language: keyof typeof translations;
};

const ITEMS_PER_PAGE = 15;

function HouseListPage({ language }: HouseListPageProps) {
  const { type } = useParams();

  const t = translations[language];

  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);

    fetch(
      `https://house-design-platform-server.vercel.app/api/houses?page=${page}&limit=${ITEMS_PER_PAGE}`,
      {
        cache: "force-cache",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const filtered = (data.houses || []).filter(
          (house: House) => house.houseType === type
        );

        setHouses(filtered);
        setTotalPages(data.totalPages || 1);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page, type]);

  useEffect(() => {
    setPage(1);
  }, [type]);

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
          gridTemplateColumns: "repeat(auto-fit, minmax(390px, 1fr))",
          gap: "25px",
          justifyItems: "center",
        }}
      >
        {houses.length > 0 ? (
          houses.map((house) => (
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

      {totalPages > 1 && (
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ◀ Prev
          </button>

          <span
            style={{
              color: "#fff",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}

export default HouseListPage;