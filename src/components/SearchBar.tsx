import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import translations from "../data/translations";

const API =
  "https://house-design-platform-server.vercel.app/api";

type Props = {
  language: keyof typeof translations;
  compact?: boolean;
};

type House = {
  id: number;
  title: string;
  houseType: string;
  folder: string;
  length: number;
  width: number;
  foundation: number;
  complete: number;

  images: {
    id: number;
    type: string;
    image: string;
  }[];
};

export default function SearchBar({
  language,
  compact = false,
}: Props) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [results, setResults] = useState<
    House[]
  >([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const text = search.trim();

    if (!text) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${API}/houses/search?q=${encodeURIComponent(
            text
          )}`,
          {
            cache: "no-store",
          }
        );

        const data = await res.json();

console.log("API =", data);

setResults(data.houses || data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [search]);

  function openHouse(house: House) {
    setSearch("");

    const story =
      house.folder === "tinshade"
        ? "tin-shade"
        : house.folder;

    const slug = (house.title || "house")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    navigate(
      `/house/${story}/${slug}/${house.id}`
    );
  }

  const placeholder =
    language === "bn"
      ? "🔍 বাড়ির ডিজাইন খুঁজুন..."
      : language === "hi"
      ? "🔍 घर खोजें..."
      : language === "ar"
      ? "🔍 ابحث عن منزل..."
      : language === "es"
      ? "🔍 Buscar casa..."
      : "🔍 Search house...";

  const noResult =
    language === "bn"
      ? "কোনো বাড়ি পাওয়া যায়নি"
      : language === "hi"
      ? "कोई घर नहीं मिला"
      : language === "ar"
      ? "لم يتم العثور على منزل"
      : language === "es"
      ? "No se encontró ninguna casa"
      : "No house found";

      console.log("Results =", results);
console.log("Length =", results.length);

  return (
        <div
      style={{
        width: compact ? "100%" : "100%",
        maxWidth: compact ? "100%" : "720px",
        margin: compact ? "0" : "25px auto",
        position: "relative",
      }}
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        type="text"
        style={{
          width: "100%",
          height: compact ? "42px" : "56px",
          padding: compact ? "0 14px" : "0 18px",
          background: compact ? "transparent" : "#0f0f0f",
          color: "#fff",
          border: compact
            ? "none"
            : "2px solid #3b82f6",
          borderRadius: compact ? "0" : "12px",
          outline: "none",
          fontSize: compact ? "15px" : "16px",
          boxSizing: "border-box",
        }}
      />

      {search.trim() !== "" && (
        <div
          style={{
            position: "absolute",
            top: compact ? "48px" : "62px",
            left: 0,
            right: 0,
            background: "#151515",
            border: "1px solid #3b82f6",
            borderRadius: "12px",
            overflow: "hidden",
            maxHeight: "420px",
            overflowY: "auto",
            zIndex: 99999,
            boxShadow:
              "0 15px 35px rgba(0,0,0,.45)",
          }}
        >
          {loading ? (
            <div
              style={{
                padding: "18px",
                textAlign: "center",
                color: "#3b82f6",
                fontWeight: 600,
              }}
            >
              {language === "bn"
                ? "লোড হচ্ছে..."
                : language === "hi"
                ? "लोड हो रहा है..."
                : language === "ar"
                ? "جارٍ التحميل..."
                : language === "es"
                ? "Cargando..."
                : "Loading..."}
            </div>
          ) : results.length === 0 ? (
            <div
              style={{
                padding: "18px",
                textAlign: "center",
                color: "#9ca3af",
              }}
            >
              {noResult}
            </div>
          ) : (
            results.map((house) => {
              const image3d =
                house.images.find(
                  (img) => img.type === "3d"
                )?.image || "";

              return (
                <div
                  key={house.id}
                  onClick={() => openHouse(house)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px",
                    cursor: "pointer",
                    borderBottom:
                      "1px solid rgba(255,255,255,.06)",
                  }}
                >
                  <img
                    src={image3d}
                    alt={house.title}
                    style={{
                      width: "88px",
                      height: "66px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border:
                        "1px solid #3b82f6",
                      flexShrink: 0,
                    }}
                  />

                  <div
                    style={{
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "14px",
                        lineHeight: 1.35,
                      }}
                    >
                      {house.title}
                    </div>

                    <div
                      style={{
                        marginTop: "4px",
                        color: "#60a5fa",
                        fontSize: "12px",
                      }}
                    >
                      📐 {house.length} × {house.width} Feet
                    </div>

                    <div
                      style={{
                        marginTop: "3px",
                        color: "#9ca3af",
                        fontSize: "12px",
                      }}
                    >
                      🏗 {house.foundation} | 🏠 {house.complete}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}