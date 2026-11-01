
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../components/layout/AdminSidebar";
import AdminTopbar from "../components/layout/AdminTopbar";
import "./AdminHouseList.css";

type HouseImage = {
  id: number;
  type: string;
  image: string;
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
  status: string;
  isFeatured: boolean;
  images: HouseImage[];
};

const API = "http://localhost:5000/api/houses";
const IMAGE_URL = "http://localhost:5000/uploads";

const houseTypes = [
  { value: "1-story", label: "1 Tola" },
  { value: "2-story", label: "2 Tola" },
  { value: "3-story", label: "3 Tola" },
  { value: "4-story", label: "4 Tola" },
  { value: "Luxury", label: "Luxury" },
  { value: "Tin Shade", label: "Tin Shade" },
];

export default function AdminHouseList() {
  const navigate = useNavigate();

  const [houses, setHouses] = useState<House[]>([]);
  const [selectedType, setSelectedType] = useState("1-story");
  const [selectedHouse, setSelectedHouse] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  async function loadHouses() {
    try {
      setLoading(true);

      const response = await fetch(API);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load houses");
      }

      setHouses(data.houses || []);
    } catch (error) {
      console.error(error);
      alert("House list load failed.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadHouses();
  }, []);

  async function deleteHouse(id: number) {
    const confirmed = window.confirm(
      `Are you sure you want to delete House #${id}?`
    );

    if (!confirmed) return;

    try {
      setDeleting(id);

      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setHouses((previous) =>
        previous.filter((house) => house.id !== id)
      );

      setSelectedHouse(null);
      alert("House deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("House delete failed.");
    } finally {
      setDeleting(null);
    }
  }

  const filteredHouses = houses.filter(
    (house) => house.houseType === selectedType
  );

  return (
    <div className="admin-house-list-page">
      <AdminSidebar />

      <div className="admin-house-list-main">
        <AdminTopbar title="House Management" />

        <main className="admin-house-list-content">

          {/* Heading */}
          <div className="admin-house-list-heading">
            <div>
              <span>HOUSE MANAGEMENT</span>
              <h2>Manage House Designs</h2>
              <p>Select a house type to manage your designs.</p>
            </div>

            <button
              className="admin-house-add-btn"
              onClick={() => navigate("/admin/add-house")}
            >
              + Add House
            </button>
          </div>

          {/* House Type Tabs */}
          <div className="admin-house-type-tabs">
            {houseTypes.map((type) => {
              const count = houses.filter(
                (house) => house.houseType === type.value
              ).length;

              return (
                <button
                  key={type.value}
                  className={
                    selectedType === type.value
                      ? "admin-house-type-tab active"
                      : "admin-house-type-tab"
                  }
                  onClick={() => {
                    setSelectedType(type.value);
                    setSelectedHouse(null);
                  }}
                >
                  {type.label}
                  <span>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Gallery Information */}
          <div className="admin-house-gallery-heading">
            <h3>
              {houseTypes.find(
                (type) => type.value === selectedType
              )?.label}
            </h3>

            <span>
              {filteredHouses.length} Houses
            </span>
          </div>

          {/* Gallery */}
          {loading ? (
            <div className="admin-house-message">
              Loading houses...
            </div>
          ) : filteredHouses.length === 0 ? (
            <div className="admin-house-message">
              No houses found in this category.
            </div>
          ) : (
            <div className="admin-house-grid">
              {filteredHouses.map((house) => {
                const image3d = house.images?.find(
                  (image) => image.type === "3d"
                )?.image;

                const isSelected = selectedHouse === house.id;

                return (
                  <article
                    className={
                      isSelected
                        ? "admin-house-card selected"
                        : "admin-house-card"
                    }
                    key={house.id}
                  >
                    <button
                      type="button"
                      className="admin-house-image"
                      onClick={() =>
                        setSelectedHouse(
                          isSelected ? null : house.id
                        )
                      }
                    >
                      {image3d ? (
                        <img
                          src={`${IMAGE_URL}/3d/${image3d}`}
                          alt={house.title}
                          loading="lazy"
                        />
                      ) : (
                        <div className="admin-house-no-image">
                          No Image
                        </div>
                      )}

                      <span className="admin-house-id">
                        #{house.id}
                      </span>

                      {house.isFeatured && (
                        <span className="admin-house-featured-badge">
                          ★
                        </span>
                      )}

                      <span className="admin-house-click-hint">
                        {isSelected ? "Close" : "Select"}
                      </span>
                    </button>

                    {isSelected && (
                      <div className="admin-house-actions">
                        <button
                          className="admin-house-edit-btn"
                          onClick={() =>
                            navigate(`/admin/edit-house/${house.id}`)
                          }
                        >
                          ✏ Edit
                        </button>

                        <button
                          className="admin-house-view-btn"
                          onClick={() =>
                            window.open(`/house/${house.id}`, "_blank")
                          }
                        >
                          👁 View
                        </button>

                        <button
                          className="admin-house-delete-btn"
                          disabled={deleting === house.id}
                          onClick={() => void deleteHouse(house.id)}
                        >
                          {deleting === house.id
                            ? "Deleting..."
                            : "🗑 Delete"}
                        </button>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
