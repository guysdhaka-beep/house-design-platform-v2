import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import translations from "../data/translations";

type Props = {
  language: keyof typeof translations;
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

export default function SearchBar({ language }: Props) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<House[]>([]);
  const [loading, setLoading] = useState(false);

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
          `http://localhost:5000/api/houses/search?q=${encodeURIComponent(
            text
          )}`
        );

        const data = await res.json();

        setResults(data.houses || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  function openHouse(id: number) {
    setSearch("");
    navigate(`/house/${id}`);
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

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "720px",
        margin: "25px auto",
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
  height: "56px",
  padding: "0 18px",
  background: "#0f0f0f",
  color: "#fff",
  border: "2px solid #3b82f6",
  borderRadius: "12px",
  outline: "none",
  fontSize: "16px",
  boxSizing: "border-box",
}}
      />

      {search.trim() !== "" && (
        <div
          style={{
            position: "absolute",
            top: "62px",
            left: 0,
            right: 0,
            background: "#151515",
            border: "1px solid #3b82f6",
            borderRadius: "12px",
            overflow: "hidden",
            maxHeight: "430px",
            overflowY: "auto",
            zIndex: 999,
            boxShadow: "0 15px 35px rgba(0,0,0,.45)",
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
          ) : (            results.map((house) => {
              const image3d =
                house.images.find((img) => img.type === "3d")?.image || "";

              return (
                <div
                  key={house.id}
                  onClick={() => openHouse(house.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "12px",
                    cursor: "pointer",
                    borderBottom: "1px solid rgba(255,255,255,.06)",
                  }}
                >
                  <img
                    src={`http://localhost:5000/uploads/3d/${image3d}`}
                    alt={house.title}
                    style={{
                      width: "95px",
                      height: "72px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #3b82f6",
                      flexShrink: 0,
                    }}
                  />

                  <div
                    style={{
                      flex: 1,
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "15px",
                        lineHeight: 1.35,
                      }}
                    >
                      {house.title}
                    </div>

                    <div
                      style={{
                        marginTop: "5px",
                        color: "#3b82f6",
                        fontSize: "13px",
                      }}
                    >
                      📐 {house.length} × {house.width} Feet
                    </div>

                    <div
                      style={{
                        marginTop: "4px",
                        color: "#9ca3af",
                        fontSize: "13px",
                      }}
                    >
                      🏠
{language === "bn"
  ? house.houseType === "1-story"
    ? "১ তলা"
    : house.houseType === "2-story"
    ? "২ তলা"
    : house.houseType === "3-story"
    ? "৩ তলা"
    : house.houseType === "4-story"
    ? "৪ তলা"
    : house.houseType === "duplex"
    ? "ডুপ্লেক্স"
    : house.houseType === "luxury"
    ? "বিলাসবহুল"
    : house.houseType === "tin"
    ? "টিন শেড"
    : house.houseType

  : language === "hi"
  ? house.houseType === "1-story"
    ? "1 मंज़िल"
    : house.houseType === "2-story"
    ? "2 मंज़िल"
    : house.houseType === "3-story"
    ? "3 मंज़िल"
    : house.houseType === "4-story"
    ? "4 मंज़िल"
    : house.houseType === "duplex"
    ? "डुप्लेक्स"
    : house.houseType === "luxury"
    ? "लक्ज़री"
    : house.houseType === "tin"
    ? "टिन शेड"
    : house.houseType

  : language === "ar"
  ? house.houseType === "1-story"
    ? "طابق واحد"
    : house.houseType === "2-story"
    ? "طابقان"
    : house.houseType === "3-story"
    ? "3 طوابق"
    : house.houseType === "4-story"
    ? "4 طوابق"
    : house.houseType === "duplex"
    ? "دوبلكس"
    : house.houseType === "luxury"
    ? "فاخر"
    : house.houseType === "tin"
    ? "منزل صفيح"
    : house.houseType

  : language === "es"
  ? house.houseType === "1-story"
    ? "1 Piso"
    : house.houseType === "2-story"
    ? "2 Pisos"
    : house.houseType === "3-story"
    ? "3 Pisos"
    : house.houseType === "4-story"
    ? "4 Pisos"
    : house.houseType === "duplex"
    ? "Dúplex"
    : house.houseType === "luxury"
    ? "Lujo"
    : house.houseType === "tin"
    ? "Casa de Chapa"
    : house.houseType

  : house.houseType}







                    </div>

                    <div
                      style={{
                        marginTop: "4px",
                        color: "#60a5fa",
                        fontSize: "12px",
                      }}
                    >
                      Foundation: {house.foundation} | Complete: {house.complete}
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