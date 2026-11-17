import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

import { getHouse, saveHouse } from "../data/houseCache";
import RelatedHouses from "../components/RelatedHouses";

import "../styles/video-page.css";
import "../styles/house-details.css";

function VideoPage() {
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const language =
    (localStorage.getItem("language") as
      | "bn"
      | "en"
      | "hi"
      | "ar"
      | "es") || "bn";

  const [house, setHouse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadHouse() {
      try {
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
        console.error(error);

        if (!ignore) {
          setHouse(null);
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

  if (loading) {
    return (
      <div className="video-loading">
        Loading...
      </div>
    );
  }

  if (!house) {
    return (
      <div className="video-error">
        House Not Found
      </div>
    );
  }
console.log("HOUSE:", house);
  console.log("VIDEO URL:", house.videoUrl);

  const image3d =
    house.images?.find(
      (img: any) => img.type === "3d"
    )?.image || "";

  const title = `${house.title} Video`;

  const description =
    house.images?.find(
      (img: any) => img.type === "3d"
    )?.description ||
    `Watch ${house.title} house walkthrough video.`;

  const canonical = `https://housedgn.com${location.pathname}`;

  function getStory() {
    return house.folder === "tinshade"
      ? "tin-shade"
      : house.folder;
  }

  function getSlug() {
    return (house.title || "house")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function open3D() {
    navigate(
      `/house/${getStory()}/${getSlug()}/${house.id}`
    );
  }

  function openFloorPlan() {
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
    <>
      <Helmet>
        <title>{title}</title>

        <meta
          name="description"
          content={description}
        />

        <link
          rel="canonical"
          href={canonical}
        />

        <meta
          property="og:title"
          content={title}
        />

        <meta
          property="og:description"
          content={description}
        />

        <meta
          property="og:image"
          content={image3d}
        />

        <meta
          property="og:url"
          content={canonical}
        />

        <meta
          property="og:type"
          content="video.other"
        />

        <meta
          property="twitter:card"
          content="summary_large_image"
        />

        <meta
          property="twitter:title"
          content={title}
        />

        <meta
          property="twitter:description"
          content={description}
        />

        <meta
          property="twitter:image"
          content={image3d}
        />
      </Helmet>

      <main className="video-page">
        <div className="video-wrapper">
  {house.videoUrl ? (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <video
        className="video-player"
        src={house.videoUrl}
        controls
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          width: "100%",
          maxWidth: "540px",
          aspectRatio: "4 / 5", // 1080 × 1350
          objectFit: "cover",
          borderRadius: "16px",
          background: "#000",
        }}
      />
    </div>
  ) : (
    <div className="video-empty">
      <h2>🎥 Video Coming Soon</h2>
      <p>This house walkthrough video is being prepared.</p>
    </div>
  )}
</div>

        <button
          type="button"
          className="house-details-button"
          onClick={() =>
            setShowDetails(!showDetails)
          }
        >
          {showDetails
            ? "Hide House Details ▲"
            : "House Details ▼"}
        </button>

        {showDetails && (
          <div className="house-details-box">
            {house.designStyle && (
              <p>
                <strong>Design Style:</strong>{" "}
                {house.designStyle}
              </p>
            )}

            <p>
              <strong>Size:</strong>{" "}
              {house.length} × {house.width} Feet
            </p>

            <p>
              <strong>Floor:</strong>{" "}
              {house.complete}
            </p>

            <p>
              <strong>Foundation:</strong>{" "}
              {house.foundation}
            </p>

            {!!house.bedroom && (
              <p>
                <strong>Bedroom:</strong>{" "}
                {house.bedroom}
              </p>
            )}

            {!!house.bathroom && (
              <p>
                <strong>Bathroom:</strong>{" "}
                {house.bathroom}
              </p>
            )}

            {!!house.kitchen && (
              <p>
                <strong>Kitchen:</strong>{" "}
                {house.kitchen}
              </p>
            )}

            {!!house.livingRoom && (
              <p>
                <strong>Living Room:</strong>{" "}
                {house.livingRoom}
              </p>
            )}

            {!!house.diningRoom && (
              <p>
                <strong>Dining:</strong>{" "}
                {house.diningRoom}
              </p>
            )}

            {!!house.balcony && (
              <p>
                <strong>Balcony:</strong>{" "}
                {house.balcony}
              </p>
            )}

            {house.garage && (
              <p>
                <strong>Garage:</strong> Yes
              </p>
            )}

            {house.terrace && (
              <p>
                <strong>Terrace:</strong> Yes
              </p>
            )}

            {house.frontGarden && (
              <p>
                <strong>Front Garden:</strong> Yes
              </p>
            )}

            {house.backGarden && (
              <p>
                <strong>Back Garden:</strong> Yes
              </p>
            )}
          </div>
        )}

        <div className="estimate-button-group">
          <button
            type="button"
            className="estimate-action-button"
            onClick={open3D}
          >
            <span
              className="estimate-action-icon"
              aria-hidden="true"
            >
              🏠
            </span>

            <span className="estimate-action-label">
              3D Design
            </span>
          </button>

          <button
            type="button"
            className="estimate-action-button"
            onClick={openFloorPlan}
          >
            <span
              className="estimate-action-icon"
              aria-hidden="true"
            >
              📐
            </span>

            <span className="estimate-action-label">
              2D Floor Plan
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
              Estimate
            </span>
          </button>
        </div>

        <RelatedHouses
          houseId={house.id}
          language={language}
        />
      </main>
    </>
  );
}

export default VideoPage;