
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import translations from "../data/translations";
import HomeButton from "../components/HomeButton";
import { getHouse, saveHouse } from "../data/houseCache";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

import "../styles/floorplan.css";
import "../styles/house-details.css";

type Language = keyof typeof translations;

function FloorPlanPage() {
  const navigate = useNavigate();
const location = useLocation();

  const { id } = useParams();

  const language = (localStorage.getItem("language") as Language) || "bn";
  const t = translations[language] ?? translations.bn;

  const [house, setHouse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [showDetails, setShowDetails] = useState(false);

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

// এখান থেকে শুরু
const image2dInfo =
  house?.images?.find((img: any) => img.type === "2d");

const imageTitle =
  image2dInfo?.imageTitle || house?.title || "";

const imageAlt =
  image2dInfo?.altText || house?.title || "";

const imageDescription =
  image2dInfo?.description || "";

const imageKeywords =
  image2dInfo?.keywords || [];

const pageTitle =
  imageTitle ||
  house?.title ||
  "2D Floor Plan";

const metaDescription =
  imageDescription ||
  imageAlt ||
  pageTitle;

const canonicalUrl =
  `https://housedgn.com${location.pathname}`;

const keywords =
  imageKeywords.length > 0
    ? imageKeywords.join(", ")
    : "floor plan, 2d house plan, house design";

  function open3D() {
  const story =
    house.folder === "tinshade"
      ? "tin-shade"
      : house.folder;

  const slug = (house.title || "house")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  navigate(`/house/${story}/${slug}/${house.id}`);
}

  function openEstimate() {
    navigate(
      `/estimate/${house.folder}/${house.complete}/${house.id}`
    );
  }

  return (
  <>
    <Helmet>
      <title>{pageTitle}</title>

      <meta
        name="description"
        content={metaDescription}
      />

      <meta
        name="keywords"
        content={keywords}
      />

      <link
        rel="canonical"
        href={canonicalUrl}
      />

      <meta
        property="og:title"
        content={pageTitle}
      />

      <meta
        property="og:description"
        content={metaDescription}
      />

      <meta
        property="og:image"
        content={image2d}
      />

      <meta
        property="og:url"
        content={canonicalUrl}
      />

      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="twitter:card"
        content="summary_large_image"
      />

      <meta
        property="twitter:title"
        content={pageTitle}
      />

      <meta
        property="twitter:description"
        content={metaDescription}
      />

      <meta
        property="twitter:image"
        content={image2d}
      />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageObject",
          name: pageTitle,
          description: metaDescription,
          contentUrl: image2d,
          keywords,
        })}
      </script>
    </Helmet>

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

          <button
  type="button"
  className="house-details-button"
  onClick={() => setShowDetails(!showDetails)}
>
  {showDetails ? "Hide House Details ▲" : "House Details ▼"}
</button>

{showDetails && (
  <div className="house-details-box">

    {house.designStyle && (
      <p><strong>Design Style:</strong> {house.designStyle}</p>
    )}

    <p><strong>Size:</strong> {house.length} × {house.width} Feet</p>

    <p><strong>Floor:</strong> {house.complete}</p>

    <p><strong>Foundation:</strong> {house.foundation}</p>

    {!!house.bedroom && (
      <p><strong>Bedroom:</strong> {house.bedroom}</p>
    )}

    {!!house.bathroom && (
      <p><strong>Bathroom:</strong> {house.bathroom}</p>
    )}

    {!!house.kitchen && (
      <p><strong>Kitchen:</strong> {house.kitchen}</p>
    )}

    {!!house.livingRoom && (
      <p><strong>Living Room:</strong> {house.livingRoom}</p>
    )}

    {!!house.diningRoom && (
      <p><strong>Dining:</strong> {house.diningRoom}</p>
    )}

    {!!house.balcony && (
      <p><strong>Balcony:</strong> {house.balcony}</p>
    )}

    {house.garage && (
      <p><strong>Garage:</strong> Yes</p>
    )}

    {house.terrace && (
      <p><strong>Terrace:</strong> Yes</p>
    )}

    {house.frontGarden && (
      <p><strong>Front Garden:</strong> Yes</p>
    )}

    {house.backGarden && (
      <p><strong>Back Garden:</strong> Yes</p>
    )}

  </div>
)}

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
  </>
);
}

export default FloorPlanPage;
