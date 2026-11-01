
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminSidebar from "../components/layout/AdminSidebar";
import AdminTopbar from "../components/layout/AdminTopbar";
import "./AddHouse.css";

type HouseFormData = {
  title: string;
  houseType: string;
  folder: string;
  length: string;
  lengthInch: string;
  width: string;
  widthInch: string;
  foundation: string;
  complete: string;
  featured: boolean;
  status: string;
  image3d: File | null;
  image2d: File | null;
};

type HouseImage = {
  id: number;
  type: string;
  image: string;
};

const API = "http://localhost:5000/api/houses";
const IMAGE_URL = "http://localhost:5000/uploads";

const initialFormData: HouseFormData = {
  title: "",
  houseType: "1-story",
  folder: "",
  length: "",
  lengthInch: "",
  width: "",
  widthInch: "",
  foundation: "1",
  complete: "1",
  featured: false,
  status: "Published",
  image3d: null,
  image2d: null,
};

function splitFeet(value: number) {
  const feet = Math.floor(value);
  const inches = Math.round((value - feet) * 12);

  if (inches === 12) {
    return {
      feet: String(feet + 1),
      inches: "0",
    };
  }

  return {
    feet: String(feet),
    inches: String(inches),
  };
}

export default function EditHouse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState<HouseFormData>(initialFormData);

  const [images, setImages] = useState<HouseImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadHouse() {
      try {
        const response = await fetch(`${API}/${id}`);
        const data = await response.json();

        if (!response.ok || !data.house) {
          throw new Error(data.message || "House not found");
        }

        const house = data.house;

        const length = splitFeet(Number(house.length));
        const width = splitFeet(Number(house.width));

        setFormData({
          title: house.title || "",
          houseType: house.houseType || "1-story",
          folder: house.folder || "",
          length: length.feet,
          lengthInch: length.inches,
          width: width.feet,
          widthInch: width.inches,
          foundation: String(house.foundation ?? 1),
          complete: String(house.complete ?? 1),
          featured: Boolean(house.isFeatured),
          status: house.status || "Published",
          image3d: null,
          image2d: null,
        });

        setImages(house.images || []);
      } catch (error) {
        console.error(error);
        alert("House information could not be loaded.");
        navigate("/admin/houses");
      } finally {
        setIsLoading(false);
      }
    }

    void loadHouse();
  }, [id, navigate]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file =
        (e.target as HTMLInputElement).files?.[0] || null;

      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      return;
    }

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function updateHouse() {
    if (isSaving) return;

    if (!formData.title.trim()) {
      alert("Please enter House Title.");
      return;
    }

    if (!formData.folder.trim()) {
      alert("Please enter Folder Name.");
      return;
    }

    setIsSaving(true);

    try {
      const body = new FormData();

      const length =
        Number(formData.length || 0) +
        Number(formData.lengthInch || 0) / 12;

      const width =
        Number(formData.width || 0) +
        Number(formData.widthInch || 0) / 12;

      body.append("title", formData.title);
      body.append("houseType", formData.houseType);
      body.append("folder", formData.folder);
      body.append("length", String(length));
      body.append("width", String(width));
      body.append("foundation", formData.foundation);
      body.append("complete", formData.complete);
      body.append("featured", String(formData.featured));
      body.append("status", formData.status);

      if (formData.image3d) {
        body.append("image3d", formData.image3d);
      }

      if (formData.image2d) {
        body.append("image2d", formData.image2d);
      }

      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        body,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }

      alert("House Updated Successfully!");

      navigate("/admin/houses");
    } catch (error) {
      console.error("Error updating house:", error);
      alert("House Update Failed.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="admin-house-message">
        Loading house information...
      </div>
    );
  }

  function getImage(type: string) {
    return images.find((image) => image.type === type)?.image;
  }

  return (
    <div className="add-house-page">
      <AdminSidebar />

      <div className="add-house-main">
        <AdminTopbar title="Edit House" />

        <main className="add-house-content">
          <section className="add-house-card">

            <div className="add-house-heading">
              <div>
                <span>HOUSE MANAGEMENT</span>
                <h1>Edit House #{id}</h1>
              </div>

              <div className="add-house-heading-line" />
            </div>

            <form
              className="add-house-form"
              onSubmit={(e) => {
                e.preventDefault();
                void updateHouse();
              }}
            >
              {/* Title */}
              <div className="add-house-field">
                <label htmlFor="title">House Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter house title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Type and Folder */}
              <div className="add-house-grid">
                <div className="add-house-field">
                  <label htmlFor="houseType">House Type</label>
                  <select
                    id="houseType"
                    name="houseType"
                    value={formData.houseType}
                    onChange={handleChange}
                  >
                    <option value="1-story">1-story</option>
                    <option value="2-story">2-story</option>
                    <option value="3-story">3-story</option>
                    <option value="4-story">4-story</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Tin Shade">Tin Shade</option>
                  </select>
                </div>

                <div className="add-house-field">
                  <label htmlFor="folder">Folder Name</label>
                  <input
                    id="folder"
                    name="folder"
                    type="text"
                    value={formData.folder}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Length */}
              <div className="add-house-size">
                <div className="add-house-size-title">
                  <span>01</span>
                  <strong>Length</strong>
                </div>

                <div className="add-house-size-fields">
                  <div className="add-house-field">
                    <label htmlFor="length">Feet</label>
                    <input
                      id="length"
                      name="length"
                      type="number"
                      min="0"
                      placeholder="Feet"
                      value={formData.length}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="add-house-field">
                    <label htmlFor="lengthInch">Inch</label>
                    <input
                      id="lengthInch"
                      name="lengthInch"
                      type="number"
                      min="0"
                      max="11"
                      placeholder="Inch"
                      value={formData.lengthInch}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Width */}
              <div className="add-house-size">
                <div className="add-house-size-title">
                  <span>02</span>
                  <strong>Width</strong>
                </div>

                <div className="add-house-size-fields">
                  <div className="add-house-field">
                    <label htmlFor="width">Feet</label>
                    <input
                      id="width"
                      name="width"
                      type="number"
                      min="0"
                      placeholder="Feet"
                      value={formData.width}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="add-house-field">
                    <label htmlFor="widthInch">Inch</label>
                    <input
                      id="widthInch"
                      name="widthInch"
                      type="number"
                      min="0"
                      max="11"
                      placeholder="Inch"
                      value={formData.widthInch}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Foundation and Complete */}
              <div className="add-house-grid">
                <div className="add-house-field">
                  <label htmlFor="foundation">Foundation</label>
                  <select
                    id="foundation"
                    name="foundation"
                    value={formData.foundation}
                    onChange={handleChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>

                <div className="add-house-field">
                  <label htmlFor="complete">Complete</label>
                  <select
                    id="complete"
                    name="complete"
                    value={formData.complete}
                    onChange={handleChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>

              {/* Status */}
              <div className="add-house-field">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              {/* 3D Image */}
              <div className="add-house-field">
                <label>3D Image</label>

                {getImage("3d") && (
                  <div className="edit-house-current-image">
                    <img
                      src={`${IMAGE_URL}/3d/${getImage("3d")}`}
                      alt="Current 3D House"
                    />
                    <span>Current 3D Image</span>
                  </div>
                )}

                <input
                  type="file"
                  name="image3d"
                  accept="image/*"
                  onChange={handleChange}
                />

                {formData.image3d && (
                  <small>New: {formData.image3d.name}</small>
                )}
              </div>

              {/* 2D Image */}
              <div className="add-house-field">
                <label>2D Image</label>

                {getImage("2d") && (
                  <div className="edit-house-current-image">
                    <img
                      src={`${IMAGE_URL}/2d/${getImage("2d")}`}
                      alt="Current 2D Floor Plan"
                    />
                    <span>Current 2D Image</span>
                  </div>
                )}

                <input
                  type="file"
                  name="image2d"
                  accept="image/*"
                  onChange={handleChange}
                />

                {formData.image2d && (
                  <small>New: {formData.image2d.name}</small>
                )}
              </div>

              {/* Featured */}
              <div className="add-house-bottom">
                <label className="add-house-featured">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                  />

                  <span className="add-house-checkbox">✓</span>
                  <span>Featured House</span>
                </label>

                <button
                  type="submit"
                  className="add-house-save-button"
                  disabled={isSaving}
                >
                  <span>
                    {isSaving ? "Updating..." : "Update House"}
                  </span>

                  {!isSaving && <b>→</b>}
                </button>
              </div>

              <button
                type="button"
                className="edit-house-back-button"
                onClick={() => navigate("/admin/houses")}
              >
                ← Back to House List
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}
