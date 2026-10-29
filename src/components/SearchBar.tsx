import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { houses } from "../data/houses";

export default function SearchBar() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const results = useMemo(() => {
    const text = search.trim().toLowerCase();

    if (!text) return [];

    return houses.filter((house) => {

      // keyword search
      const keywordMatch = house.keywords.some((keyword) =>
        keyword.toLowerCase().includes(text)
      );

      // size search
      const sizeMatch =
        `${house.length}x${house.width}`.includes(text) ||
        `${house.width}x${house.length}`.includes(text);

      // cost search
      const costMatch = house.cost.toLowerCase().includes(text);

      // floor search
      const floorMatch =
        house.floor.toString() === text ||
        house.foundation.toString() === text;

      return (
        keywordMatch ||
        sizeMatch ||
        costMatch ||
        floorMatch
      );

    });

  }, [search]);

  function openHouse(id: number) {
    navigate(`/house/${id}`);
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "700px",
        margin: "25px auto",
        position: "relative",
      }}
    >
      <input
        type="text"
        placeholder="🔍 Search house, floor, size, cost..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "14px 18px",
          borderRadius: "10px",
          border: "1px solid #3b82f6",
          background: "#1f2937",
          color: "#fff",
          fontSize: "16px",
          outline: "none",
          boxSizing: "border-box",
        }}
      />
            {search.trim() !== "" && (

        <div
          style={{
            position: "absolute",
            top: "58px",
            left: 0,
            right: 0,
            background: "#111827",
            border: "1px solid #374151",
            borderRadius: "10px",
            overflow: "hidden",
            zIndex: 100,
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >

          {results.length === 0 ? (

            <div
              style={{
                padding: "16px",
                color: "#9ca3af",
                textAlign: "center",
              }}
            >
              No house found.
            </div>

          ) : (

            results.map((house) => (

              <div
                key={house.id}
                onClick={() => openHouse(house.id)}
                style={{
                  padding: "14px 16px",
                  borderBottom: "1px solid #374151",
                  cursor: "pointer",
                  transition: ".2s",
                }}
              >

                <div
                  style={{
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "16px",
                  }}
                >
                  {house.type.toUpperCase()}
                </div>

                <div
                  style={{
                    color: "#cbd5e1",
                    fontSize: "14px",
                    marginTop: "4px",
                  }}
                >
                  {house.length} × {house.width} Feet
                </div>

                <div
                  style={{
                    color: "#60a5fa",
                    fontSize: "14px",
                    marginTop: "2px",
                  }}
                >
                  {house.cost}
                </div>

              </div>

            ))

          )}

        </div>

      )}
            {search.trim() !== "" && (
        <div
          style={{
            position: "absolute",
            top: "58px",
            left: 0,
            right: 0,
            background: "#111827",
            border: "1px solid #374151",
            borderRadius: "10px",
            overflow: "hidden",
            zIndex: 100,
            maxHeight: "400px",
            overflowY: "auto",
            boxShadow: "0 8px 20px rgba(0,0,0,.35)",
          }}
        >
          {results.length === 0 ? (
            <div
              style={{
                padding: "16px",
                color: "#9ca3af",
                textAlign: "center",
              }}
            >
              No house found.
            </div>
          ) : (
            results.map((house) => (
              <div
                key={house.id}
                onClick={() => {
                  setSearch("");
                  openHouse(house.id);
                }}
                style={{
                  padding: "14px 16px",
                  borderBottom: "1px solid #374151",
                  cursor: "pointer",
                  transition: ".2s",
                }}
              >
                <div
                  style={{
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "16px",
                  }}
                >
                  {house.type.replace("-", " ").toUpperCase()}
                </div>

                <div
                  style={{
                    color: "#d1d5db",
                    fontSize: "14px",
                    marginTop: "5px",
                  }}
                >
                  📐 {house.length} × {house.width} Feet
                </div>

                <div
                  style={{
                    color: "#60a5fa",
                    fontSize: "14px",
                    marginTop: "3px",
                  }}
                >
                  💰 {house.cost}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}