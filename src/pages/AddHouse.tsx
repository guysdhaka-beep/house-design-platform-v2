import { useState } from "react";
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
  image3d: File | null;
image2d: File | null;

};

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
  image3d: null,
image2d: null,
};

export default function AddHouse() {
  const [formData, setFormData] =
    useState<HouseFormData>(initialFormData);

  const [isSaving, setIsSaving] = useState(false);

  function handleChange(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) {
  const { name, value, type } = e.target;

  // 👇 এটা এখানে বসাও
  if (type === "file") {
    const file = (e.target as HTMLInputElement).files?.[0] || null;

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

  async function saveHouse() {
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

body.append("title", formData.title);
body.append("houseType", formData.houseType);
body.append("folder", formData.folder);
const length =
  Number(formData.length || 0) +
  Number(formData.lengthInch || 0) / 12;

const width =
  Number(formData.width || 0) +
  Number(formData.widthInch || 0) / 12;

body.append("length", String(length));
body.append("width", String(width));
body.append("foundation", formData.foundation);
body.append("complete", formData.complete);
body.append("featured", String(formData.featured));

if (formData.image3d) {
  body.append("image3d", formData.image3d);
}

if (formData.image2d) {
  body.append("image2d", formData.image2d);
}

const response = await fetch(
  "https://house-design-platform-server.vercel.app/api/houses",
  {
    method: "POST",
    body,
  }
);

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to save house.");
        return;
      }

      alert("House Added Successfully!");

      setFormData(initialFormData);
    } catch (error) {
      console.error("Error saving house:", error);
      alert("Server Error");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="add-house-page">
      <AdminSidebar />

      <div className="add-house-main">
        <AdminTopbar title="Add House" />

        <main className="add-house-content">
          <section className="add-house-card">
            <div className="add-house-heading">
              <div>
                <span>HOUSE MANAGEMENT</span>
                <h1>Add New House</h1>
              </div>

              <div className="add-house-heading-line" />
            </div>

            <form
              className="add-house-form"
              onSubmit={(e) => {
                e.preventDefault();
                void saveHouse();
              }}
            >
              {/* Title */}
              <div className="add-house-field add-house-full">
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

              {/* Type + Folder */}
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
                    placeholder="Enter folder name"
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

              {/* Foundation + Complete */}
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

              <div className="add-house-field">
  <label>3D Image</label>

  <input
    type="file"
    name="image3d"
    accept="image/*"
    onChange={handleChange}
  />
</div>

<div className="add-house-field">
  <label>2D Image</label>

  <input
    type="file"
    name="image2d"
    accept="image/*"
    onChange={handleChange}
  />
</div>

              {/* Bottom */}
              <div className="add-house-bottom">
                <label className="add-house-featured">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                  />

                  <span className="add-house-checkbox">
                    ✓
                  </span>

                  <span>Featured House</span>
                </label>

                <button
                  type="submit"
                  className="add-house-save-button"
                  disabled={isSaving}
                >
                  <span>
                    {isSaving ? "Saving..." : "Save House"}
                  </span>

                  {!isSaving && <b>→</b>}
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}