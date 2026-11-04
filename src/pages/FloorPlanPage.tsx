
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import translations from "../data/translations";
import HomeButton from "../components/HomeButton";
import { getHouse, saveHouse } from "../data/houseCache";

import "../styles/floorplan.css";

type Language = keyof typeof translations;

function FloorPlanPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const language = (localStorage.getItem("language") as Language) || "bn";
  const t = translations[language] ?? translations.bn;

  const [house, setHouse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadHouse() {
      try {
        setLoading(true);
        setLoadError(false);

        const data = await getHouse(Number(id));

        if (!ignore) {
          if (data) {
            saveHouse(data);
            setHouse(data);
          } else {
            setHouse(null);
          }
        }
      } catch (error) {
        console.error("Failed to load house:", error);

        if (!ignore) {
          setHouse(null);
          setLoadError(true);
        }
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

  const image2d =
    house?.images?.find((img: any) => img.type === "2d")?.image || "";

  function open3D() {
    navigate(`/house/${house.id}`);
  }

  function openEstimate() {
    navigate(
      `/estimate/${house.folder}/${house.complete}/${house.id}`
    );
  }

  return (
    <main className="floorplan-container">
      <header className="floorplan-header">
        <div className="floorplan-home">
          <HomeButton />
        </div>

        <h1 className="floorplan-title">
          📐 {t.view2d}
        </h1>
      </header>

      {loading ? (
        <section
          className="floorplan-status"
          role="status"
          aria-live="polite"
        >
          <span className="floorplan-loader" />
          <p>Loading...</p>
        </section>
      ) : loadError ? (
        <section className="floorplan-status" role="alert">
          <div className="floorplan-status-icon" aria-hidden="true">
            !
          </div>
          <h2>Unable to load floor plan</h2>
          <p>Please try again later.</p>
        </section>
      ) : !house ? (
        <section className="floorplan-status" role="status">
          <div className="floorplan-status-icon" aria-hidden="true">
            ⌂
          </div>
          <h2>House not found</h2>
        </section>
      ) : (
        <section className="floorplan-content">
          <div className="floorplan-image-card">
            {image2d ? (
              <img
                src={image2d}
                alt="2D Floor Plan"
                className="floorplan-image"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                draggable={false}
              />
            ) : (
              <div className="floorplan-placeholder">
                <span aria-hidden="true">📐</span>
                <h2>No 2D image found.</h2>
              </div>
            )}
          </div>

          <div className="floorplan-buttons">
            <button
              type="button"
              className="floorplan-button floorplan-blue-button"
              onClick={open3D}
            >
              <span className="floorplan-button-icon" aria-hidden="true">
                🏠
              </span>
              <span>{t.view3d}</span>
            </button>

            <button
              type="button"
              className="floorplan-button floorplan-green-button"
              onClick={openEstimate}
            >
              <span className="floorplan-button-icon" aria-hidden="true">
                💰
              </span>
              <span>{t.estimate}</span>
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default FloorPlanPage;
