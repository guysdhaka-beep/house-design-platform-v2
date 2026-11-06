
import { useState, type ChangeEvent, type FormEvent } from "react";
import AdminSidebar from "../components/layout/AdminSidebar";
import AdminTopbar from "../components/layout/AdminTopbar";
import "./AddHouse.css";

type ImageType = "image3d" | "image2d";

type RoomName =
  | "bedroom"
  | "bathroom"
  | "balcony"
  | "kitchen"
  | "livingRoom"
  | "diningRoom"
  | "stair";

type SeoFields = {
  image3dTitle: string;
  image3dAlt: string;
  image3dCaption: string;
  image3dDescription: string;
  image3dFileName: string;
  image3dKeywords: string;

  image2dTitle: string;
  image2dAlt: string;
  image2dCaption: string;
  image2dDescription: string;
  image2dFileName: string;
  image2dKeywords: string;
};

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

  designStyle: string;
  keywords: string;

  bedroom: string;
  bathroom: string;
  balcony: string;
  kitchen: string;
  livingRoom: string;
  diningRoom: string;
  stair: string;

  garage: boolean;
  terrace: boolean;
  frontGarden: boolean;
  backGarden: boolean;
  swimmingPool: boolean;
  lift: boolean;
  servantRoom: boolean;

  image3d: File | null;
  image2d: File | null;
} & SeoFields;

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

  designStyle: "",
  keywords: "",

  bedroom: "0",
  bathroom: "0",
  balcony: "0",
  kitchen: "0",
  livingRoom: "0",
  diningRoom: "0",
  stair: "0",

  garage: false,
  terrace: false,
  frontGarden: false,
  backGarden: false,
  swimmingPool: false,
  lift: false,
  servantRoom: false,

  image3d: null,
  image2d: null,

  image3dTitle: "",
  image3dAlt: "",
  image3dCaption: "",
  image3dDescription: "",
  image3dFileName: "",
  image3dKeywords: "",

  image2dTitle: "",
  image2dAlt: "",
  image2dCaption: "",
  image2dDescription: "",
  image2dFileName: "",
  image2dKeywords: "",
};

const API_URL =
  "https://house-design-platform-server.vercel.app/api/houses";

const houseTypes = [
  { value: "1-story", label: "1 Story" },
  { value: "2-story", label: "2 Story" },
  { value: "3-story", label: "3 Story" },
  { value: "4-story", label: "4 Story" },
  { value: "Luxury", label: "Luxury" },
  { value: "Tin Shade", label: "Tin Shade" },
];

const designStyles = [
  "Modern House",
  "Small House",
  "Tiny House",
  "Duplex House",
  "Luxury House",
  "Beautiful House",
  "Tinshade House",
  "New Model House",
  "Modern Village House",
  "Single Story House",
  "Two Story House",
  "Three Story House",
  "Four Story House",
  "Budget House",
  "Family House",
];

const roomFields: { name: RoomName; label: string }[] = [
  { name: "bedroom", label: "Bedroom" },
  { name: "bathroom", label: "Bathroom" },
  { name: "balcony", label: "Balcony" },
  { name: "kitchen", label: "Kitchen" },
  { name: "livingRoom", label: "Living Room" },
  { name: "diningRoom", label: "Dining Room" },
  { name: "stair", label: "Stair" },
];

const roomOptions = ["0", "1", "2", "3", "4", "5"];

const seoFieldNames: (keyof SeoFields)[] = [
  "image3dTitle",
  "image3dAlt",
  "image3dCaption",
  "image3dDescription",
  "image3dFileName",
  "image3dKeywords",
  "image2dTitle",
  "image2dAlt",
  "image2dCaption",
  "image2dDescription",
  "image2dFileName",
  "image2dKeywords",
];

const featureLabels = [
  { name: "garage", label: "Garage" },
  { name: "terrace", label: "Terrace" },
  { name: "frontGarden", label: "Front Garden" },
  { name: "backGarden", label: "Back Garden" },
  { name: "swimmingPool", label: "Swimming Pool" },
  { name: "lift", label: "Lift" },
  { name: "servantRoom", label: "Servant Room" },
] as const;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getDimension(form: HouseFormData) {
  const length =
    Number(form.length || 0) +
    Number(form.lengthInch || 0) / 12;

  const width =
    Number(form.width || 0) +
    Number(form.widthInch || 0) / 12;

  const lengthText =
    `${form.length || "0"}${Number(form.lengthInch || 0) ? `-${form.lengthInch}` : ""}`;

  const widthText =
    `${form.width || "0"}${Number(form.widthInch || 0) ? `-${form.widthInch}` : ""}`;

  return {
    length,
    width,
    text: `${lengthText} x ${widthText} feet`,
    area: Number((length * width).toFixed(2)),
  };
}

function roomText(value: string, singular: string) {
  const count = Number(value || 0);
  return `${count} ${singular}${count === 1 ? "" : "s"}`;
}

function getRoomSummary(form: HouseFormData) {
  return [
    roomText(form.bedroom, "Bedroom"),
    roomText(form.bathroom, "Bathroom"),
    roomText(form.balcony, "Balcony"),
    roomText(form.kitchen, "Kitchen"),
    roomText(form.livingRoom, "Living Room"),
    roomText(form.diningRoom, "Dining Room"),
    roomText(form.stair, "Staircase"),
  ];
}

function getRoomKeywords(form: HouseFormData) {
  return [
    `${form.bedroom} bedroom house plan`,
    `${form.bathroom} bathroom house plan`,
    `${form.balcony} balcony house plan`,
    `${form.kitchen} kitchen house plan`,
    `${form.livingRoom} living room layout`,
    `${form.diningRoom} dining room layout`,
    `${form.stair} staircase house plan`,
  ].filter((item) => !item.startsWith("0 "));
}

// =====================================
// SEO GENERATOR
// =====================================

function createSeoData(form: HouseFormData): SeoFields {
  const title = form.title.trim() || "House Design";
  const style = form.designStyle.trim();

  const dimension = getDimension(form);
  const dimensionText = dimension.text;

  const houseKeywords = form.keywords
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const selectedFeatures = featureLabels
    .filter(({ name }) => form[name])
    .map(({ label }) => label);

  const featureText = selectedFeatures.length
    ? selectedFeatures.join(", ")
    : "modern architectural exterior";

  const featureKeywords = selectedFeatures.map(
    (item) => `${item.toLowerCase()} house`
  );

  // 3D SEO: House Title + Design + Exterior Features

  const threeDTitleParts = [
    title,
    style,
    "3D Exterior Design",
  ].filter(Boolean);

  const image3dTitle = threeDTitleParts.join(" - ");

  const image3dAlt =
    `${style || "Modern"} ${title} exterior view, ${dimensionText}, featuring ${featureText.toLowerCase()}.`;

  const image3dCaption =
    `${title}: ${style || "Modern"} architectural exterior with ${featureText.toLowerCase()}.`;

  const image3dDescription =
    `Explore this ${style || "modern"} ${title.toLowerCase()}, measuring ${dimensionText}. ` +
    `The exterior design features ${featureText.toLowerCase()}. ` +
    `View the architectural appearance and 3D house design.`;

  const image3dKeywords = Array.from(
    new Set([
      title,
      style,
      ...houseKeywords,
      ...featureKeywords,
      "3D house design",
      "house exterior design",
      "front elevation",
      dimensionText,
    ].filter(Boolean))
  ).join(", ");

  // 2D SEO: Room Information + Dimensions

  const rooms = getRoomSummary(form);

  const roomConfiguration = [
    roomText(form.bedroom, "Bedroom"),
    roomText(form.bathroom, "Bathroom"),
  ].join(" and ");

  const image2dTitle =
    `${roomConfiguration} House Floor Plan - ${dimensionText}`;

  const image2dAlt =
    `${dimensionText} house floor plan featuring ${rooms.join(", ").toLowerCase()}.`;

  const image2dCaption =
    `Functional ${dimensionText} floor layout with ${roomConfiguration.toLowerCase()} and dedicated living spaces.`;

  const image2dDescription =
    `Explore the ${dimensionText} house floor plan with ${rooms.join(", ").toLowerCase()}. ` +
    `This layout shows the room arrangement, kitchen, living space, dining area and staircase. ` +
    `The floor plan is designed for practical home planning and space utilization.`;

  const image2dKeywords = Array.from(
    new Set([
      ...getRoomKeywords(form),
      ...houseKeywords,
      `${dimensionText} floor plan`,
      `${form.bedroom} bedroom floor plan`,
      `${form.bathroom} bathroom layout`,
      "2D house floor plan",
      "house room layout",
    ].filter(Boolean))
  ).join(", ");

  return {
    image3dTitle,
    image3dAlt,
    image3dCaption,
    image3dDescription,
    image3dFileName: `${slugify(title) || "house"}-3d-exterior`,
    image3dKeywords,

    image2dTitle,
    image2dAlt,
    image2dCaption,
    image2dDescription,
    image2dFileName:
      `${form.bedroom}-bedroom-${form.bathroom}-bathroom-${slugify(dimensionText)}-floor-plan`,
    image2dKeywords,
  };
}

function AddHouse() {
  const [formData, setFormData] =
    useState<HouseFormData>(initialFormData);

  const [roomModes, setRoomModes] = useState<
    Record<RoomName, string>
  >({
    bedroom: "0",
    bathroom: "0",
    balcony: "0",
    kitchen: "0",
    livingRoom: "0",
    diningRoom: "0",
    stair: "0",
  });

  const [roomCustomValues, setRoomCustomValues] = useState<
    Record<RoomName, string>
  >({
    bedroom: "",
    bathroom: "",
    balcony: "",
    kitchen: "",
    livingRoom: "",
    diningRoom: "",
    stair: "",
  });

  const [manualSeoFields, setManualSeoFields] = useState<
    Set<keyof SeoFields>
  >(new Set());

  const [isSaving, setIsSaving] = useState(false);
  const [formKey, setFormKey] = useState(0);

  // =====================================
  // AUTO SEO UPDATE
  // =====================================

  const updateFormAndSeo = (
    name: string,
    value: string
  ) => {
    setFormData((previous) => {
      const updated = {
        ...previous,
        [name]: value,
      };

      const generated = createSeoData(updated);

      seoFieldNames.forEach((field) => {
        if (!manualSeoFields.has(field)) {
          updated[field] = generated[field];
        }
      });

      return updated;
    });
  };

  const handleFieldChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    if (
      name === "title" ||
      name === "designStyle" ||
      name === "keywords" ||
      name === "length" ||
      name === "lengthInch" ||
      name === "width" ||
      name === "widthInch"
    ) {
      updateFormAndSeo(name, value);
      return;
    }

    if (seoFieldNames.includes(name as keyof SeoFields)) {
      const seoName = name as keyof SeoFields;

      setManualSeoFields((previous) => {
        const next = new Set(previous);
        next.add(seoName);
        return next;
      });
    }

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================
  // CHECKBOX CHANGE
  // =====================================

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target;

    setFormData((previous) => {
      const updated = {
        ...previous,
        [name]: checked,
      };

      const generated = createSeoData(updated);

      seoFieldNames.forEach((field) => {
        if (!manualSeoFields.has(field)) {
          updated[field] = generated[field];
        }
      });

      return updated;
    });
  };

  // =====================================
  // ROOM CHANGE
  // =====================================

  const handleRoomChange = (
    name: RoomName,
    value: string
  ) => {
    setRoomModes((previous) => ({
      ...previous,
      [name]: value,
    }));

    const nextValue = value === "custom" ? "" : value;

    setFormData((previous) => {
      const updated = {
        ...previous,
        [name]: nextValue,
      };

      const generated = createSeoData(updated);

      seoFieldNames.forEach((field) => {
        if (!manualSeoFields.has(field)) {
          updated[field] = generated[field];
        }
      });

      return updated;
    });
  };

  const handleRoomCustomChange = (
    name: RoomName,
    value: string
  ) => {
    setRoomCustomValues((previous) => ({
      ...previous,
      [name]: value,
    }));

    setFormData((previous) => {
      const updated = {
        ...previous,
        [name]: value,
      };

      const generated = createSeoData(updated);

      seoFieldNames.forEach((field) => {
        if (!manualSeoFields.has(field)) {
          updated[field] = generated[field];
        }
      });

      return updated;
    });
  };

  // =====================================
  // IMAGE UPLOAD
  // =====================================

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, files } = event.target;
    const file = files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image size must be 10 MB or less.");
      event.target.value = "";
      return;
    }

    if (name !== "image3d" && name !== "image2d") return;

    setFormData((previous) => ({
      ...previous,
      [name]: file,
    }));
  };

  // =====================================
  // IMAGE METADATA
  // =====================================

  const appendImageMetadata = (
    data: FormData,
    imageType: ImageType,
    values: HouseFormData
  ) => {
    const fields = [
      "Title",
      "Alt",
      "Caption",
      "Description",
      "FileName",
    ] as const;

    fields.forEach((field) => {
      const key = `${imageType}${field}` as keyof SeoFields;
      data.append(`${imageType}${field}`, values[key].trim());
    });

    const keywordKey = `${imageType}Keywords` as keyof SeoFields;

    const imageKeywords = values[keywordKey]
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    data.append(
      `${imageType}Keywords`,
      JSON.stringify(imageKeywords)
    );
  };

  // =====================================
  // SAVE HOUSE
  // =====================================

  const saveHouse = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter House Title.");
      return;
    }

    if (!formData.folder.trim()) {
      alert("Please enter Folder Name.");
      return;
    }

    const dimension = getDimension(formData);

    if (
      dimension.length <= 0 ||
      dimension.width <= 0 ||
      !Number.isFinite(dimension.length) ||
      !Number.isFinite(dimension.width)
    ) {
      alert("Please enter valid Length and Width.");
      return;
    }

    if (
      Number(formData.lengthInch || 0) > 11 ||
      Number(formData.widthInch || 0) > 11
    ) {
      alert("Inches must be between 0 and 11.");
      return;
    }

    if (!formData.image3d && !formData.image2d) {
      alert("Please upload at least one 3D or 2D image.");
      return;
    }

    for (const room of roomFields) {
      const value = formData[room.name];

      if (
        value === "" ||
        Number(value) < 0 ||
        !Number.isFinite(Number(value))
      ) {
        alert(`Please enter a valid ${room.label} number.`);
        return;
      }
    }

    setIsSaving(true);

    try {
      const data = new FormData();

      // Basic Information
      data.append("title", formData.title.trim());
      data.append("houseType", formData.houseType);
      data.append("folder", formData.folder.trim());
      data.append("designStyle", formData.designStyle);

      // Dimensions
      data.append("length", String(dimension.length));
      data.append("width", String(dimension.width));
      data.append(
        "lengthInches",
        String(Number(formData.lengthInch || 0))
      );
      data.append(
        "widthInches",
        String(Number(formData.widthInch || 0))
      );
      data.append("area", String(dimension.area));

      // Foundation
      data.append("foundation", formData.foundation);
      data.append("complete", formData.complete);
      data.append("featured", String(formData.featured));

      // House Keywords
      const houseKeywords = formData.keywords
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      data.append("keywords", JSON.stringify(houseKeywords));

      // Room Information
      roomFields.forEach(({ name }) => {
        data.append(name, String(Number(formData[name] || 0)));
      });

      // House Features
      data.append("garage", String(formData.garage));
      data.append("terrace", String(formData.terrace));
      data.append("frontGarden", String(formData.frontGarden));
      data.append("backGarden", String(formData.backGarden));
      data.append("swimmingPool", String(formData.swimmingPool));
      data.append("lift", String(formData.lift));
      data.append("servantRoom", String(formData.servantRoom));

      // 3D Image
      if (formData.image3d) {
        data.append("image3d", formData.image3d);
      }

      appendImageMetadata(data, "image3d", formData);

      // 2D Image
      if (formData.image2d) {
        data.append("image2d", formData.image2d);
      }

      appendImageMetadata(data, "image2d", formData);

      const response = await fetch(API_URL, {
        method: "POST",
        body: data,
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message ||
            result?.error ||
            "House could not be saved."
        );
      }

      alert("House successfully saved!");

      setFormData(initialFormData);

      setRoomModes({
        bedroom: "0",
        bathroom: "0",
        balcony: "0",
        kitchen: "0",
        livingRoom: "0",
        diningRoom: "0",
        stair: "0",
      });

      setRoomCustomValues({
        bedroom: "",
        bathroom: "",
        balcony: "",
        kitchen: "",
        livingRoom: "",
        diningRoom: "",
        stair: "",
      });

      setManualSeoFields(new Set());
      setFormKey((previous) => previous + 1);
    } catch (error) {
      console.error("Save House Error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "An error occurred while saving the house."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // =====================================
  // UI
  // =====================================

  return (
    <div className="add-house-page">
      <AdminSidebar />

      <div className="add-house-main">
        <AdminTopbar />

        <div className="add-house-content">
          <div className="add-house-card">
            <h2 className="add-house-heading">
              Add New House
            </h2>

            <div className="add-house-heading-line" />

            <form
              key={formKey}
              className="add-house-form"
              onSubmit={saveHouse}
            >
              {/* BASIC INFORMATION */}

              <h3>Basic House Information</h3>

              <div className="add-house-grid">
                <div className="add-house-field add-house-full">
                  <label htmlFor="title">House Title *</label>

                  <input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleFieldChange}
                    placeholder="Example: Modern 2 Story House Design"
                    required
                  />
                </div>

                <div className="add-house-field">
                  <label htmlFor="houseType">House Type *</label>

                  <select
                    id="houseType"
                    name="houseType"
                    value={formData.houseType}
                    onChange={handleFieldChange}
                  >
                    {houseTypes.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="add-house-field">
                  <label htmlFor="folder">Folder Name *</label>

                  <input
                    id="folder"
                    name="folder"
                    value={formData.folder}
                    onChange={handleFieldChange}
                    placeholder="Example: 1_story"
                    required
                  />
                </div>

                <div className="add-house-field">
                  <label htmlFor="designStyle">Design Style</label>

                  <select
                    id="designStyle"
                    name="designStyle"
                    value={formData.designStyle}
                    onChange={handleFieldChange}
                  >
                    <option value="">Select Design Style</option>

                    {designStyles.map((style) => (
                      <option key={style} value={style}>
                        {style}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="add-house-field add-house-full">
                  <label htmlFor="keywords">House Keywords</label>

                  <input
                    id="keywords"
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleFieldChange}
                    placeholder="modern house, 2 story house, 30x40, 25 lakh"
                  />

                  <small>
                    Separate multiple keywords with commas.
                  </small>
                </div>
              </div>

              {/* DIMENSIONS */}

              <h3>House Dimensions</h3>

              <div className="add-house-grid">
                <div className="add-house-size">
                  <div className="add-house-size-title">
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
                        step="any"
                        value={formData.length}
                        onChange={handleFieldChange}
                        placeholder="Feet"
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
                        value={formData.lengthInch}
                        onChange={handleFieldChange}
                        placeholder="Inch"
                      />
                    </div>
                  </div>
                </div>

                <div className="add-house-size">
                  <div className="add-house-size-title">
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
                        step="any"
                        value={formData.width}
                        onChange={handleFieldChange}
                        placeholder="Feet"
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
                        value={formData.widthInch}
                        onChange={handleFieldChange}
                        placeholder="Inch"
                      />
                    </div>
                  </div>
                </div>

                <div className="add-house-field">
                  <label htmlFor="foundation">Foundation</label>

                  <select
                    id="foundation"
                    name="foundation"
                    value={formData.foundation}
                    onChange={handleFieldChange}
                  >
                    {[1, 2, 3, 4].map((number) => (
                      <option key={number} value={number}>
                        {number} Story Foundation
                      </option>
                    ))}
                  </select>
                </div>

                <div className="add-house-field">
                  <label htmlFor="complete">Complete Story</label>

                  <select
                    id="complete"
                    name="complete"
                    value={formData.complete}
                    onChange={handleFieldChange}
                  >
                    {[1, 2, 3, 4].map((number) => (
                      <option key={number} value={number}>
                        {number} Story Complete
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ROOM INFORMATION */}

              <h3>Room Information</h3>

              <div className="add-house-grid">
                {roomFields.map(({ name, label }) => (
                  <div className="add-house-field" key={name}>
                    <label htmlFor={name}>{label}</label>

                    <select
                      id={name}
                      value={roomModes[name]}
                      onChange={(event) =>
                        handleRoomChange(name, event.target.value)
                      }
                    >
                      {roomOptions.map((number) => (
                        <option key={number} value={number}>
                          {number}
                        </option>
                      ))}

                      <option value="custom">Custom</option>
                    </select>

                    {roomModes[name] === "custom" && (
                      <input
                        type="number"
                        min="0"
                        value={roomCustomValues[name]}
                        onChange={(event) =>
                          handleRoomCustomChange(name, event.target.value)
                        }
                        placeholder={`Enter ${label} number`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* HOUSE FEATURES */}

              <h3>House Features</h3>

              <div className="add-house-grid">
                {featureLabels.map(({ name, label }) => (
                  <div className="add-house-checkbox" key={name}>
                    <label>
                      <input
                        type="checkbox"
                        name={name}
                        checked={formData[name]}
                        onChange={handleCheckboxChange}
                      />
                      <span>{label}</span>
                    </label>
                  </div>
                ))}
              </div>

              {/* 3D IMAGE */}

              <h3>3D House Image</h3>

              <div className="add-house-grid">
                <div className="add-house-field add-house-full">
                  <label htmlFor="image3d">Upload 3D Image</label>

                  <input
                    id="image3d"
                    name="image3d"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    onChange={handleImageChange}
                  />

                  {formData.image3d && (
                    <small>
                      Selected: {formData.image3d.name}
                    </small>
                  )}
                </div>

                <div className="add-house-field">
                  <label htmlFor="image3dTitle">Image SEO Title</label>

                  <input
                    id="image3dTitle"
                    name="image3dTitle"
                    value={formData.image3dTitle}
                    onChange={handleFieldChange}
                    placeholder="Auto-generated from house information"
                  />
                </div>

                <div className="add-house-field">
                  <label htmlFor="image3dFileName">SEO File Name</label>

                  <input
                    id="image3dFileName"
                    name="image3dFileName"
                    value={formData.image3dFileName}
                    onChange={handleFieldChange}
                    placeholder="Auto-generated file name"
                  />
                </div>

                <div className="add-house-field add-house-full">
                  <label htmlFor="image3dAlt">Alt Text</label>

                  <input
                    id="image3dAlt"
                    name="image3dAlt"
                    value={formData.image3dAlt}
                    onChange={handleFieldChange}
                    placeholder="Auto-generated exterior description"
                  />
                </div>

                <div className="add-house-field add-house-full">
                  <label htmlFor="image3dCaption">Image Caption</label>

                  <input
                    id="image3dCaption"
                    name="image3dCaption"
                    value={formData.image3dCaption}
                    onChange={handleFieldChange}
                    placeholder="Auto-generated exterior caption"
                  />
                </div>

                <div className="add-house-field add-house-full">
                  <label htmlFor="image3dDescription">
                    Image Description
                  </label>

                  <textarea
                    id="image3dDescription"
                    name="image3dDescription"
                    rows={3}
                    value={formData.image3dDescription}
                    onChange={handleFieldChange}
                    placeholder="Auto-generated exterior description"
                  />
                </div>

                <div className="add-house-field add-house-full">
                  <label htmlFor="image3dKeywords">
                    Image Keywords
                  </label>

                  <input
                    id="image3dKeywords"
                    name="image3dKeywords"
                    value={formData.image3dKeywords}
                    onChange={handleFieldChange}
                    placeholder="Auto-generated exterior keywords"
                  />
                </div>
              </div>

              {/* 2D IMAGE */}

              <h3>2D Floor Plan Image</h3>

              <div className="add-house-grid">
                <div className="add-house-field add-house-full">
                  <label htmlFor="image2d">Upload 2D Image</label>

                  <input
                    id="image2d"
                    name="image2d"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    onChange={handleImageChange}
                  />

                  {formData.image2d && (
                    <small>
                      Selected: {formData.image2d.name}
                    </small>
                  )}
                </div>

                <div className="add-house-field">
                  <label htmlFor="image2dTitle">Image SEO Title</label>

                  <input
                    id="image2dTitle"
                    name="image2dTitle"
                    value={formData.image2dTitle}
                    onChange={handleFieldChange}
                    placeholder="Auto-generated from room information"
                  />
                </div>

                <div className="add-house-field">
                  <label htmlFor="image2dFileName">SEO File Name</label>

                  <input
                    id="image2dFileName"
                    name="image2dFileName"
                    value={formData.image2dFileName}
                    onChange={handleFieldChange}
                    placeholder="Auto-generated room-based file name"
                  />
                </div>

                <div className="add-house-field add-house-full">
                  <label htmlFor="image2dAlt">Alt Text</label>

                  <input
                    id="image2dAlt"
                    name="image2dAlt"
                    value={formData.image2dAlt}
                    onChange={handleFieldChange}
                    placeholder="Auto-generated room layout description"
                  />
                </div>

                <div className="add-house-field add-house-full">
                  <label htmlFor="image2dCaption">Image Caption</label>

                  <input
                    id="image2dCaption"
                    name="image2dCaption"
                    value={formData.image2dCaption}
                    onChange={handleFieldChange}
                    placeholder="Auto-generated floor plan caption"
                  />
                </div>

                <div className="add-house-field add-house-full">
                  <label htmlFor="image2dDescription">
                    Image Description
                  </label>

                  <textarea
                    id="image2dDescription"
                    name="image2dDescription"
                    rows={3}
                    value={formData.image2dDescription}
                    onChange={handleFieldChange}
                    placeholder="Auto-generated room layout description"
                  />
                </div>

                <div className="add-house-field add-house-full">
                  <label htmlFor="image2dKeywords">
                    Image Keywords
                  </label>

                  <input
                    id="image2dKeywords"
                    name="image2dKeywords"
                    value={formData.image2dKeywords}
                    onChange={handleFieldChange}
                    placeholder="Auto-generated room and floor plan keywords"
                  />
                </div>
              </div>

              {/* FEATURED HOUSE */}

              <div className="add-house-featured">
                <label className="add-house-checkbox">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleCheckboxChange}
                  />
                  <span>Featured House</span>
                </label>
              </div>

              {/* SAVE */}

              <div className="add-house-bottom">
                <button
                  type="submit"
                  className="add-house-save-button"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save House"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddHouse;
