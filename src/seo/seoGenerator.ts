
/**
 * ============================================
 * House Design Platform
 * SEO Generator
 * File: seoGenerator.ts
 * ============================================
 *
 * কাজ:
 * 1. Generate SEO Title
 * 2. Generate SEO Description
 * 3. Generate Image Alt Text
 * 4. Generate Image Caption
 * 5. Generate Image Keywords
 * 6. Generate SEO Filename
 * 7. Generate separate SEO for 3D and 2D images
 *
 * Supported languages:
 * bn, en, hi, ar, es
 *
 * IMPORTANT:
 * - Existing houseType logic পরিবর্তন করবে না।
 * - SEO Design Style আলাদা থাকবে।
 * - কোনো feature false হলে SEO text-এ সেটি দেখাবে না।
 */

// --------------------------------------------
// 1. IMPORTS
// --------------------------------------------

import type {
  SeoHouseData,
  SeoImageType,
  SeoLanguage,
  SeoImageInformation,
  SeoGeneratedContent,
  SeoGeneratorResult,
} from "./seoTypes";

import {
  seoImageLabels,
  seoRoomLabels,
  seoFeatureLabels,
 
  seoTitleSettings,
  seoDescriptionSettings,
  seoAltSettings,
  seoFilenameSettings,
} from "./seoOptions";


// --------------------------------------------
// 2. TRANSLATION DATA
// --------------------------------------------

const translations = {
  bn: {
    house: "বাড়ির ডিজাইন",
    floorPlan: "বাড়ির ফ্লোর প্ল্যান",
    bedroom: "বেডরুম",
    bathroom: "বাথরুম",
    area: "বর্গফুট",
    foundation: "ফাউন্ডেশন",
    complete: "সম্পূর্ণ তলা",
    design: "ডিজাইন",
    dimensions: "আকার",
    story: "তলা",
    image3d: "3D ভিউ",
    image2d: "2D ফ্লোর প্ল্যান",
  },

  en: {
    house: "House Design",
    floorPlan: "House Floor Plan",
    bedroom: "Bedroom",
    bathroom: "Bathroom",
    area: "Square Feet",
    foundation: "Foundation",
    complete: "Completed Stories",
    design: "Design",
    dimensions: "Dimensions",
    story: "Story",
    image3d: "3D View",
    image2d: "2D Floor Plan",
  },

  hi: {
    house: "घर का डिज़ाइन",
    floorPlan: "घर का फ्लोर प्लान",
    bedroom: "बेडरूम",
    bathroom: "बाथरूम",
    area: "वर्ग फुट",
    foundation: "नींव",
    complete: "पूर्ण मंजिलें",
    design: "डिज़ाइन",
    dimensions: "आकार",
    story: "मंजिल",
    image3d: "3D दृश्य",
    image2d: "2D फ्लोर प्लान",
  },

  ar: {
    house: "تصميم المنزل",
    floorPlan: "مخطط المنزل",
    bedroom: "غرفة نوم",
    bathroom: "حمام",
    area: "قدم مربع",
    foundation: "الأساس",
    complete: "الطوابق المكتملة",
    design: "التصميم",
    dimensions: "الأبعاد",
    story: "طابق",
    image3d: "عرض ثلاثي الأبعاد",
    image2d: "مخطط ثنائي الأبعاد",
  },

  es: {
    house: "Diseño de casa",
    floorPlan: "Plano de casa",
    bedroom: "Dormitorio",
    bathroom: "Baño",
    area: "Pies cuadrados",
    foundation: "Cimentación",
    complete: "Plantas completas",
    design: "Diseño",
    dimensions: "Dimensiones",
    story: "Planta",
    image3d: "Vista 3D",
    image2d: "Plano 2D",
  },
} as const;


// --------------------------------------------
// 3. HOUSE TYPE TRANSLATIONS
// --------------------------------------------

const houseTypeLabels: Record<
  string,
  Record<SeoLanguage, string>
> = {
  "1-story": {
    bn: "একতলা",
    en: "Single Story",
    hi: "एक मंजिला",
    ar: "طابق واحد",
    es: "Una planta",
  },

  "2-story": {
    bn: "দুইতলা",
    en: "Double Story",
    hi: "दो मंजिला",
    ar: "طابقان",
    es: "Dos plantas",
  },

  "3-story": {
    bn: "তিনতলা",
    en: "Triple Story",
    hi: "तीन मंजिला",
    ar: "ثلاثة طوابق",
    es: "Tres plantas",
  },

  "4-story": {
    bn: "চারতলা",
    en: "Four Story",
    hi: "चार मंजिला",
    ar: "أربعة طوابق",
    es: "Cuatro plantas",
  },

  Luxury: {
    bn: "বিলাসবহুল বাড়ি",
    en: "Luxury House",
    hi: "लक्जरी घर",
    ar: "منزل فاخر",
    es: "Casa de lujo",
  },

  "Tin Shade": {
    bn: "টিনশেড বাড়ি",
    en: "Tin Shade House",
    hi: "टिन शेड वाला घर",
    ar: "منزل بسقف صفيحي",
    es: "Casa con techo de chapa",
  },
};


// --------------------------------------------
// 4. HELPER: GET TRANSLATIONS
// --------------------------------------------

function getTranslations(language: SeoLanguage) {
  return translations[language] ?? translations.en;
}


// --------------------------------------------
// 5. HELPER: SAFE NUMBER
// --------------------------------------------

function safeNumber(value: unknown): number {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 0;
  }

  return Math.max(0, number);
}


// --------------------------------------------
// 6. HELPER: FORMAT DIMENSION
// --------------------------------------------

function formatDimension(
  feet: number,
  inches: number = 0
): string {
  const safeFeet = safeNumber(feet);
  const safeInches = safeNumber(inches);

  if (safeInches === 0) {
    return `${safeFeet}`;
  }

  return `${safeFeet}.${safeInches}`;
}


// --------------------------------------------
// 7. HELPER: GET AREA
// --------------------------------------------

export function calculateSeoArea(
  house: SeoHouseData
): number {
  const length =
    safeNumber(house.length) +
    safeNumber(house.lengthInch) / 12;

  const width =
    safeNumber(house.width) +
    safeNumber(house.widthInch) / 12;

  const calculatedArea = Math.round(length * width);

  if (calculatedArea <= 0) {
    return 0;
  }

  return calculatedArea;
}


// --------------------------------------------
// 8. HELPER: GET DIMENSION TEXT
// --------------------------------------------

function getDimensionText(
  house: SeoHouseData
): string {
  const length = formatDimension(
    house.length,
    house.lengthInch
  );

  const width = formatDimension(
    house.width,
    house.widthInch
  );

  return `${length} × ${width} Feet`;
}


// --------------------------------------------
// 9. HELPER: GET HOUSE TYPE LABEL
// --------------------------------------------

function getHouseTypeLabel(
  houseType: string,
  language: SeoLanguage
): string {
  return (
    houseTypeLabels[houseType]?.[language] ??
    houseTypeLabels[houseType]?.en ??
    houseType
  );
}


// --------------------------------------------
// 10. HELPER: GET DESIGN STYLE
// --------------------------------------------

function getDesignStyle(
  style: string | undefined
): string {
  if (!style) {
    return "";
  }

  return style.trim();
}


// --------------------------------------------
// 11. HELPER: GET POSITIVE FEATURES
// --------------------------------------------

function getActiveFeatures(
  house: SeoHouseData,
  language: SeoLanguage
): string[] {
  const features = [
    "garage",
    "terrace",
    "frontGarden",
    "backGarden",
    "swimmingPool",
    "lift",
    "servantRoom",
  ] as const;

  return features
    .filter((feature) => house[feature] === true)
    .map((feature) => seoFeatureLabels[feature][language]);
}


// --------------------------------------------
// 12. HELPER: GET ROOM INFORMATION
// --------------------------------------------

function getRoomInformation(
  house: SeoHouseData,
  language: SeoLanguage
): string[] {
  const rooms = [
    {
      value: house.bedroom,
      label: seoRoomLabels.bedroom[language],
    },
    {
      value: house.bathroom,
      label: seoRoomLabels.bathroom[language],
    },
    {
      value: house.kitchen,
      label: seoRoomLabels.kitchen[language],
    },
    {
      value: house.livingRoom,
      label: seoRoomLabels.livingRoom[language],
    },
    {
      value: house.diningRoom,
      label: seoRoomLabels.diningRoom[language],
    },
    {
      value: house.balcony,
      label: seoRoomLabels.balcony[language],
    },
    {
      value: house.stair,
      label: seoRoomLabels.stair[language],
    },
  ];

  return rooms
    .filter((room) => safeNumber(room.value) > 0)
    .map(
      (room) => `${safeNumber(room.value)} ${room.label}`
    );
}


// --------------------------------------------
// 13. HELPER: CLEAN TEXT
// --------------------------------------------

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\s([,.])/g, "$1")
    .trim();
}


// --------------------------------------------
// 14. HELPER: LIMIT TEXT LENGTH
// --------------------------------------------

function limitText(
  text: string,
  maxLength: number
): string {
  const cleaned = cleanText(text);

  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  const shortened = cleaned
    .slice(0, maxLength + 1)
    .replace(/\s+\S*$/, "")
    .trim();

  return shortened || cleaned.slice(0, maxLength).trim();
}


// --------------------------------------------
// 15. HELPER: GET SEO KEYWORDS
// --------------------------------------------

export function generateSeoKeywords(
  house: SeoHouseData,
  imageType: SeoImageType,
  language: SeoLanguage = house.language
): string[] {
  const t = getTranslations(language);

  const dimension = getDimensionText(house);

  const area = safeNumber(
    house.area || calculateSeoArea(house)
  );

  const houseType = getHouseTypeLabel(
    house.houseType,
    language
  );

  const style = getDesignStyle(house.designStyle);

  const imageLabel = seoImageLabels[imageType][language];

  const rooms = getRoomInformation(house, language);

  const features = getActiveFeatures(house, language);

  const keywords = [
    imageLabel,
    houseType,
    style,
    dimension,
    `${area} ${t.area}`,
    t.house,
    t.floorPlan,
    ...rooms,
    ...features,
  ];

  return Array.from(
    new Set(
      keywords
        .map((keyword) => cleanText(keyword))
        .filter((keyword) => keyword.length > 0)
    )
  );
}


// --------------------------------------------
// 16. HELPER: GENERATE SEO TITLE
// --------------------------------------------

export function generateSeoTitle(
  house: SeoHouseData,
  imageType: SeoImageType,
  language: SeoLanguage = house.language
): string {
  const t = getTranslations(language);

  const dimension = getDimensionText(house);

  const area = safeNumber(
    house.area || calculateSeoArea(house)
  );

  const houseType = getHouseTypeLabel(
    house.houseType,
    language
  );

  const style = getDesignStyle(house.designStyle);

  const is3d = imageType === "3d";

  let title = "";

  if (language === "bn") {
    title = is3d
      ? `${style ? style + " " : ""}${dimension} ${houseType} ${t.image3d}`
      : `${dimension} ${houseType} ${t.floorPlan}`;
  } else if (language === "hi") {
    title = is3d
      ? `${style ? style + " " : ""}${houseType} ${t.image3d} ${dimension}`
      : `${houseType} ${t.floorPlan} ${dimension}`;
  } else if (language === "ar") {
    title = is3d
      ? `${t.image3d} ${houseType} ${dimension}`
      : `${t.floorPlan} ${houseType} ${dimension}`;
  } else if (language === "es") {
    title = is3d
      ? `${style ? style + " " : ""}${t.image3d} ${houseType} ${dimension}`
      : `${t.floorPlan} ${houseType} ${dimension}`;
  } else {
    title = is3d
      ? `${style ? style + " " : ""}${houseType} ${t.image3d} ${dimension}`
      : `${houseType} ${t.floorPlan} ${dimension}`;
  }

  if (area > 0) {
    title += ` | ${area} ${t.area}`;
  }

  return limitText(
    title,
    seoTitleSettings.maxLength
  );
}


// --------------------------------------------
// 17. HELPER: GENERATE ALT TEXT
// --------------------------------------------

export function generateSeoAltText(
  house: SeoHouseData,
  imageType: SeoImageType,
  language: SeoLanguage = house.language
): string {
  const t = getTranslations(language);

  const dimension = getDimensionText(house);

  const area = safeNumber(
    house.area || calculateSeoArea(house)
  );

  const houseType = getHouseTypeLabel(
    house.houseType,
    language
  );

  const style = getDesignStyle(house.designStyle);

  const rooms = getRoomInformation(house, language);

  const features = getActiveFeatures(house, language);

  const imageLabel = seoImageLabels[imageType][language];

  const parts = [
    style,
    houseType,
    imageLabel,
    dimension,
    area > 0 ? `${area} ${t.area}` : "",
    ...rooms,
    ...features,
  ];

  return limitText(
    parts.filter(Boolean).join(", "),
    seoAltSettings.maxLength
  );
}


// --------------------------------------------
// 18. HELPER: GENERATE IMAGE CAPTION
// --------------------------------------------

export function generateSeoCaption(
  house: SeoHouseData,
  imageType: SeoImageType,
  language: SeoLanguage = house.language
): string {
  const t = getTranslations(language);

  const dimension = getDimensionText(house);

  const area = safeNumber(
    house.area || calculateSeoArea(house)
  );

  const houseType = getHouseTypeLabel(
    house.houseType,
    language
  );

  const style = getDesignStyle(house.designStyle);

  const imageLabel = seoImageLabels[imageType][language];

  let caption = "";

  if (language === "bn") {
    caption = `${style ? style + " " : ""}${dimension} ${houseType} ${imageLabel}`;
  } else {
    caption = `${style ? style + " " : ""}${houseType} ${imageLabel} - ${dimension}`;
  }

  if (area > 0) {
    caption += ` (${area} ${t.area})`;
  }

  return cleanText(caption);
}


// --------------------------------------------
// 19. HELPER: GENERATE DESCRIPTION
// --------------------------------------------

export function generateSeoDescription(
  house: SeoHouseData,
  imageType: SeoImageType,
  language: SeoLanguage = house.language
): string {
  const t = getTranslations(language);

  const dimension = getDimensionText(house);

  const area = safeNumber(
    house.area || calculateSeoArea(house)
  );

  const houseType = getHouseTypeLabel(
    house.houseType,
    language
  );

  const style = getDesignStyle(house.designStyle);

  const rooms = getRoomInformation(house, language);

  const features = getActiveFeatures(house, language);

  const imageLabel = seoImageLabels[imageType][language];

  const roomText = rooms.join(", ");

  const featureText = features.join(", ");

  let description = "";

  if (language === "bn") {
    description =
      `${style ? style + " " : ""}${dimension} ${houseType} ${imageLabel}। ` +
      `${area > 0 ? `${area} ${t.area} আয়তনের বাড়ি। ` : ""}` +
      `${roomText ? `রুম: ${roomText}। ` : ""}` +
      `${featureText ? `সুবিধা: ${featureText}।` : ""}`;
  } else if (language === "hi") {
    description =
      `${style ? style + " " : ""}${dimension} ${houseType} ${imageLabel}। ` +
      `${area > 0 ? `${area} ${t.area} क्षेत्रफल। ` : ""}` +
      `${roomText ? `कमरे: ${roomText}। ` : ""}` +
      `${featureText ? `सुविधाएं: ${featureText}।` : ""}`;
  } else if (language === "ar") {
    description =
      `${style ? style + " " : ""}${dimension} ${houseType} ${imageLabel}. ` +
      `${area > 0 ? `${area} ${t.area}. ` : ""}` +
      `${roomText ? `${roomText}. ` : ""}` +
      `${featureText ? `${featureText}.` : ""}`;
  } else if (language === "es") {
    description =
      `${style ? style + " " : ""}${houseType} ${imageLabel} de ${dimension}. ` +
      `${area > 0 ? `${area} ${t.area}. ` : ""}` +
      `${roomText ? `Habitaciones: ${roomText}. ` : ""}` +
      `${featureText ? `Características: ${featureText}.` : ""}`;
  } else {
    description =
      `${style ? style + " " : ""}${houseType} ${imageLabel} with ${dimension}. ` +
      `${area > 0 ? `${area} ${t.area} area. ` : ""}` +
      `${roomText ? `Rooms: ${roomText}. ` : ""}` +
      `${featureText ? `Features: ${featureText}.` : ""}`;
  }

  return limitText(
    description,
    seoDescriptionSettings.maxLength
  );
}


// --------------------------------------------
// 20. HELPER: GENERATE FILENAME
// --------------------------------------------

function slugifyFilename(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, seoFilenameSettings.separator)
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}


export function generateSeoFilename(
  house: SeoHouseData,
  imageType: SeoImageType
): string {
  const dimension = getDimensionText(house)
    .replace(/\s+/g, "-")
    .replace(/×/g, "x");

  const houseType = slugifyFilename(house.houseType);

  const style = slugifyFilename(
    house.designStyle || "house"
  );

  const area = safeNumber(
    house.area || calculateSeoArea(house)
  );

  const imageName =
    imageType === "3d"
      ? "3d-house-design"
      : "2d-floor-plan";

  const extension =
    imageType === "3d"
      ? seoFilenameSettings.extension3d
      : seoFilenameSettings.extension2d;

  const filename = slugifyFilename(
    `${style}-${houseType}-${dimension}-${area}-${imageName}`
  );

  return `${filename}.${extension}`;
}


// --------------------------------------------
// 21. GENERATE COMPLETE SEO IMAGE INFORMATION
// --------------------------------------------

export function generateSeoImageInformation(
  house: SeoHouseData,
  imageType: SeoImageType,
  language: SeoLanguage = house.language
): SeoImageInformation {
  const title = generateSeoTitle(
    house,
    imageType,
    language
  );

  const description = generateSeoDescription(
    house,
    imageType,
    language
  );

  const caption = generateSeoCaption(
    house,
    imageType,
    language
  );

  const altText = generateSeoAltText(
    house,
    imageType,
    language
  );

  const keywords = generateSeoKeywords(
    house,
    imageType,
    language
  );

  const fileName = generateSeoFilename(
    house,
    imageType
  );

  return {
    imageType,
    fileName,
    imageTitle: title,
    altText,
    caption,
    description,
    keywords,
  };
}


// --------------------------------------------
// 22. GENERATE 3D IMAGE SEO
// --------------------------------------------

export function generate3dSeo(
  house: SeoHouseData,
  language: SeoLanguage = house.language
): SeoImageInformation {
  return generateSeoImageInformation(
    house,
    "3d",
    language
  );
}


// --------------------------------------------
// 23. GENERATE 2D IMAGE SEO
// --------------------------------------------

export function generate2dSeo(
  house: SeoHouseData,
  language: SeoLanguage = house.language
): SeoImageInformation {
  return generateSeoImageInformation(
    house,
    "2d",
    language
  );
}


// --------------------------------------------
// 24. GENERATE BOTH IMAGE SEO
// --------------------------------------------

export function generateHouseSeo(
  house: SeoHouseData,
  language: SeoLanguage = house.language
): SeoGeneratorResult {
  return {
    image3d: generate3dSeo(house, language),

    image2d: generate2dSeo(house, language),
  };
}


// --------------------------------------------
// 25. GENERATE SEO CONTENT
// --------------------------------------------

export function generateSeoContent(
  house: SeoHouseData,
  imageType: SeoImageType,
  language: SeoLanguage = house.language
): SeoGeneratedContent {
  const seo = generateSeoImageInformation(
    house,
    imageType,
    language
  );

  return {
    title: seo.imageTitle,
    description: seo.description,
    caption: seo.caption,
    keywords: seo.keywords,
  };
}
