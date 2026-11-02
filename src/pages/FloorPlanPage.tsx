import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import translations from "../data/translations";
import HomeButton from "../components/HomeButton";

const API =
  "https://house-design-platform-server.vercel.app/api/houses";

function FloorPlanPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const language =
    (localStorage.getItem("language") as keyof typeof translations) || "bn";

  const t = translations[language];

  const [house, setHouse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadHouse() {
      try {
        const response = await fetch(`${API}/${id}`, {
          cache: "force-cache",
        });

        const data = await response.json();

        if (!ignore) {
          setHouse(data.house);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadHouse();

    return () => {
      ignore = true;
    };
  }, [id]);

  const image2d = useMemo(() => {
    return (
      house?.images?.find(
        (img: any) => img.type === "2d"
      )?.image || ""
    );
  }, [house]);

  function open3D() {
    navigate(`/house/${house.id}`);
  }

  function openEstimate() {
    navigate(
      `/estimate/${house.folder}/${house.complete}/${house.id}`
    );
  }

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "60px",
          color: "#fff",
          fontSize: "22px",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!house) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "60px",
          color: "#fff",
          fontSize: "22px",
        }}
      >
        House not found
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px",
        boxSizing: "border-box",
        textAlign: "center",
      }}
    >
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
          marginBottom: "20px",
        }}
      >
        📐 2D Floor Plan
      </h1>

      {image2d ? (
        <img
          src={image2d}
          alt="2D Floor Plan"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          draggable={false}
          style={{
            width: "100%",
            maxWidth: "700px",
            borderRadius: "12px",
            display: "block",
            margin: "30px auto",
            boxShadow:
              "0 8px 25px rgba(0,0,0,.25)",
          }}
        />
      ) : (
        <h3>No 2D image found.</h3>
      )}

      <div className="button-group">
        <button onClick={open3D}>
          🏠 {t.view3d}
        </button>

        <button onClick={openEstimate}>
          💰 {t.estimate}
        </button>
      </div>
    </div>
  );
}

export default FloorPlanPage;