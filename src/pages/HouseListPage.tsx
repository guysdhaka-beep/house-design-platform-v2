import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import HouseCard from "../components/HouseCard";
import HomeButton from "../components/HomeButton";

import translations from "../data/translations";
import type { House } from "../types/house";
import "../styles/house-listPage.css";

type HouseListPageProps = {
  language: keyof typeof translations;
};

const ITEMS_PER_PAGE = 15;

const API =
  "https://house-design-platform-server.vercel.app/api/houses";

function HouseListPage({
  language,
}: HouseListPageProps) {
  const { type } = useParams();

  const t = translations[language];

  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [type]);

  useEffect(() => {
    let ignore = false;

    async function loadHouses() {
      try {
        setLoading(true);

        const response = await fetch(
          `${API}?type=${type}&page=${page}&limit=${ITEMS_PER_PAGE}`,
          {
            cache: "force-cache",
          }
        );

        const data = await response.json();

        if (ignore) return;

        setHouses(data.houses || []);
        setTotalPages(data.totalPages || 1);

        // Prefetch first 3 house details
        (data.houses || [])
          .slice(0, 3)
          .forEach((house: House) => {
            fetch(`${API}/${house.id}`, {
              cache: "force-cache",
            }).catch(() => {});
          });
      } catch (err) {
        console.error(err);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadHouses();

    return () => {
      ignore = true;
    };
  }, [page, type]);

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
    <div className="house-list-container">

      <div
        style={{
          textAlign: "left",
          marginBottom: "20px",
        }}
      >
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

      <div className="house-list-grid">

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
            style={{
              padding: "10px 18px",
              cursor:
                page === 1
                  ? "not-allowed"
                  : "pointer",
            }}
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
            style={{
              padding: "10px 18px",
              cursor:
                page === totalPages
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}

export default HouseListPage;


  