
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import translations from "../data/translations";
import { incrementView } from "../data/views";
import HomeButton from "../components/HomeButton";
import { getHouse, saveHouse } from "../data/houseCache";

import "../styles/house-details.css";


type Language = keyof typeof translations;

function HouseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const language = useMemo(
    () =>
      (localStorage.getItem("language") as Language) || "bn",
    []
  );

  const t = translations[language] ?? translations.bn;

  const [house, setHouse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadHouse() {
      try {
        setLoading(true);
        setLoadError(false);
        setImageError(false);

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

  useEffect(() => {
    if (house?.id != null) {
      incrementView(house.id);
    }
  }, [house?.id]);

  const image3d =
    house?.images?.find((img: any) => img.type === "3d")?.image || "";

  function open2D() {
    navigate(
      `/floorplan/${house.folder}/${house.complete}/${house.id}`
    );
  }

  function openEstimate() {
    navigate(
      `/estimate/${house.folder}/${house.complete}/${house.id}`
    );
  }

  return (
    <main className="house-details-container">
      <header className="house-details-header">
        <div className="house-details-home">
          <HomeButton />
        </div>

        {!loading && house && (
          <h1 className="house-title">
            {house.title}
          </h1>
        )}
      </header>

      {loading ? (
        <section
          className="house-details-status"
          role="status"
          aria-live="polite"
        >
          <span className="house-details-loader" />
          <p>Loading...</p>
        </section>
      ) : loadError ? (
        <section className="house-details-status" role="alert">
          <div className="house-details-status-icon">!</div>
          <h2>Unable to load house</h2>
          <p>Please try again later.</p>
        </section>
      ) : !house ? (
        <section className="house-details-status" role="status">
          <div className="house-details-status-icon">⌂</div>
          <h2>House not found</h2>
        </section>
      ) : (
        <section className="house-details-content">
          <div className="house-image-card">
            {image3d && !imageError ? (
              <img
                src={image3d}
                alt={house.title || "3D House"}
                className="house-main-image"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                draggable={false}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="house-image-placeholder">
                <span>🏠</span>
                <h2>3D Image Not Available</h2>
              </div>
            )}
          </div>

          <div className="house-details-actions">
            <button
              type="button"
              className="estimate-action-button"
              onClick={open2D}
            >
              <span
                className="estimate-action-icon"
                aria-hidden="true"
              >
                📐
              </span>

              <span className="estimate-action-label">
                {t.view2d}
              </span>
            </button>

            <button
              type="button"
              className="estimate-action-button"
              onClick={openEstimate}
            >
              <span
                className="estimate-action-icon"
                aria-hidden="true"
              >
                💰
              </span>

              <span className="estimate-action-label">
                {t.estimate}
              </span>
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default HouseDetailsPage;
