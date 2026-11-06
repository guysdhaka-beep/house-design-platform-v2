
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import translations from "../data/translations";
import { incrementView } from "../data/views";
import HomeButton from "../components/HomeButton";
import { getHouse, saveHouse } from "../data/houseCache";
import { Helmet } from "react-helmet-async";


import "../styles/house-details.css";


type Language = keyof typeof translations;

function HouseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const location = useLocation();

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
  const [showDetails, setShowDetails] = useState(false);

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

  const image3dInfo =
  house?.images?.find((img: any) => img.type === "3d");

const image3d = image3dInfo?.image || "";
const imageTitle = image3dInfo?.imageTitle || house?.title || "";
const imageAlt = image3dInfo?.altText || house?.title || "";
const imageDescription = image3dInfo?.description || "";
const imageKeywords = image3dInfo?.keywords || [];

const pageTitle =
  imageTitle ||
  house?.title ||
  "House Design Platform";

const metaDescription =
  imageDescription ||
  imageAlt ||
  imageTitle ||
  "Modern House Design";

const canonicalUrl = `https://housedgn.com${location.pathname}`;

const keywords =
  imageKeywords.length > 0
    ? imageKeywords.join(", ")
    : "house design, floor plan, home design";

const shortDescription =
  imageDescription.length > 180
    ? imageDescription.substring(0, 180) + "..."
    : imageDescription;

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

  console.log(house);

  return (
  <>
    <Helmet>
  <title>{pageTitle}</title>

  <meta name="description" content={metaDescription} />
  <meta name="keywords" content={keywords} />

  <link rel="canonical" href={canonicalUrl} />

  <meta property="og:type" content="website" />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={metaDescription} />
  <meta property="og:image" content={image3d} />
  <meta property="og:url" content={canonicalUrl} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={metaDescription} />
  <meta name="twitter:image" content={image3d} />

<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "House",

    name: pageTitle,
    description: metaDescription,
    url: canonicalUrl,
    image: image3d,

    numberOfRooms: house?.bedroom || undefined,
    numberOfBathroomsTotal: house?.bathroom || undefined,
    floorSize: {
      "@type": "QuantitativeValue",
      value:
        house?.length && house?.width
          ? house.length * house.width
          : undefined,
      unitCode: "FTK",
    },

    keywords,
  })}
</script>

<meta property="og:site_name" content="House Design Platform" />
<meta property="og:locale" content="en_US" />

<meta
  property="og:image:alt"
  content={imageAlt || pageTitle}
/>

<meta
  property="og:image:width"
  content="1200"
/>

<meta
  property="og:image:height"
  content="900"
/>

<meta
  name="twitter:image:alt"
  content={imageAlt || pageTitle}
/>

<link
  rel="preconnect"
  href="https://house-design-platform-server.vercel.app"
/>

<link
  rel="dns-prefetch"
  href="https://house-design-platform-server.vercel.app"
/>

<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://housedgn.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: house?.type || "House",
        item: `https://housedgn.com${location.pathname}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pageTitle,
        item: canonicalUrl,
      },
    ],
  })}
</script>

</Helmet>

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
  alt={imageAlt}
  title={imageTitle}
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

          {shortDescription && (
  <div className="house-description">
    <p>{shortDescription}</p>
  </div>
)}
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

  {(house.length > 0 && house.width > 0) && (
    <p><strong>Size:</strong> {house.length} × {house.width} Feet</p>
  )}

  {house.complete > 0 && (
    <p><strong>Floor:</strong> {house.complete}</p>
  )}

  {house.foundation > 0 && (
    <p><strong>Foundation:</strong> {house.foundation}</p>
  )}

  {house.bedroom > 0 && (
    <p><strong>Bedroom:</strong> {house.bedroom}</p>
  )}

  {house.bathroom > 0 && (
    <p><strong>Bathroom:</strong> {house.bathroom}</p>
  )}

  {house.kitchen > 0 && (
    <p><strong>Kitchen:</strong> {house.kitchen}</p>
  )}

  {house.livingRoom > 0 && (
    <p><strong>Living Room:</strong> {house.livingRoom}</p>
  )}

  {house.diningRoom > 0 && (
    <p><strong>Dining:</strong> {house.diningRoom}</p>
  )}

  {house.balcony > 0 && (
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
  </>
);

  
}

export default HouseDetailsPage;
