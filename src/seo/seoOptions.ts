
/**
 * House Design Platform
 * SEO Options
 *
 * এই ফাইলের কাজ:
 * - SEO Design Style options
 * - Image type options
 * - Room and feature labels
 * - SEO language options
 *
 * IMPORTANT:
 * এখানে existing houseType পরিবর্তন করা হবে না।
 * 1-story, 2-story, 3-story, 4-story,
 * Luxury এবং Tin Shade আগের মতোই থাকবে।
 */

// -----------------------------------------
// 1. SEO DESIGN STYLE OPTIONS
// -----------------------------------------

export const seoDesignStyles = [
  "Modern",
  "Contemporary",
  "Traditional",
  "Minimalist",
  "Classic",
  "Elegant",
  "Luxury",
  "Simple",
  "European",
  "Mediterranean",
  "Tropical",
  "Rustic",
  "Industrial",
  "Farmhouse",
  "Colonial",
  "Bungalow",
  "Duplex",
  "Architectural",
] as const;

export type SeoDesignStyle =
  (typeof seoDesignStyles)[number];


// -----------------------------------------
// 2. IMAGE TYPE OPTIONS
// -----------------------------------------

export const seoImageTypes = [
  "3d",
  "2d",
] as const;

export type SeoImageType =
  (typeof seoImageTypes)[number];


// -----------------------------------------
// 3. SEO LANGUAGE OPTIONS
// -----------------------------------------

export const seoLanguages = [
  "bn",
  "en",
  "hi",
  "ar",
  "es",
] as const;

export type SeoLanguage =
  (typeof seoLanguages)[number];


// -----------------------------------------
// 4. ROOM FIELD LABELS
// -----------------------------------------

export const seoRoomLabels = {
  bedroom: {
    bn: "বেডরুম",
    en: "Bedroom",
    hi: "बेडरूम",
    ar: "غرفة نوم",
    es: "Dormitorio",
  },

  bathroom: {
    bn: "বাথরুম",
    en: "Bathroom",
    hi: "बाथरूम",
    ar: "حمام",
    es: "Baño",
  },

  balcony: {
    bn: "বারান্দা",
    en: "Balcony",
    hi: "बालकनी",
    ar: "شرفة",
    es: "Balcón",
  },

  kitchen: {
    bn: "রান্নাঘর",
    en: "Kitchen",
    hi: "रसोई",
    ar: "مطبخ",
    es: "Cocina",
  },

  livingRoom: {
    bn: "লিভিং রুম",
    en: "Living Room",
    hi: "लिविंग रूम",
    ar: "غرفة المعيشة",
    es: "Sala de estar",
  },

  diningRoom: {
    bn: "ডাইনিং রুম",
    en: "Dining Room",
    hi: "डाइनिंग रूम",
    ar: "غرفة الطعام",
    es: "Comedor",
  },

  stair: {
    bn: "সিঁড়ি",
    en: "Staircase",
    hi: "सीढ़ी",
    ar: "درج",
    es: "Escalera",
  },
} as const;


// -----------------------------------------
// 5. FEATURE FIELD LABELS
// -----------------------------------------

export const seoFeatureLabels = {
  garage: {
    bn: "গ্যারেজ",
    en: "Garage",
    hi: "गैरेज",
    ar: "مرآب",
    es: "Garaje",
  },

  terrace: {
    bn: "ছাদ",
    en: "Terrace",
    hi: "छत",
    ar: "شرفة السطح",
    es: "Terraza",
  },

  frontGarden: {
    bn: "সামনের বাগান",
    en: "Front Garden",
    hi: "सामने का बगीचा",
    ar: "حديقة أمامية",
    es: "Jardín delantero",
  },

  backGarden: {
    bn: "পেছনের বাগান",
    en: "Back Garden",
    hi: "पीछे का बगीचा",
    ar: "حديقة خلفية",
    es: "Jardín trasero",
  },

  swimmingPool: {
    bn: "সুইমিং পুল",
    en: "Swimming Pool",
    hi: "स्विमिंग पूल",
    ar: "مسبح",
    es: "Piscina",
  },

  lift: {
    bn: "লিফট",
    en: "Lift",
    hi: "लिफ्ट",
    ar: "مصعد",
    es: "Ascensor",
  },

  servantRoom: {
    bn: "সার্ভেন্ট রুম",
    en: "Servant Room",
    hi: "सर्वेंट रूम",
    ar: "غرفة الخادمة",
    es: "Habitación de servicio",
  },
} as const;


// -----------------------------------------
// 6. SEO IMAGE LABELS
// -----------------------------------------

export const seoImageLabels = {
  "3d": {
    bn: "বাড়ির 3D ডিজাইন",
    en: "House 3D Design",
    hi: "घर का 3D डिज़ाइन",
    ar: "تصميم المنزل ثلاثي الأبعاد",
    es: "Diseño 3D de casa",
  },

  "2d": {
    bn: "বাড়ির 2D ফ্লোর প্ল্যান",
    en: "House 2D Floor Plan",
    hi: "घर का 2D फ्लोर प्लान",
    ar: "مخطط المنزل ثنائي الأبعاد",
    es: "Plano 2D de casa",
  },
} as const;


// -----------------------------------------
// 7. SEO GENERAL LABELS
// -----------------------------------------

export const seoGeneralLabels = {
  house: {
    bn: "বাড়ি",
    en: "House",
    hi: "घर",
    ar: "منزل",
    es: "Casa",
  },

  floorPlan: {
    bn: "ফ্লোর প্ল্যান",
    en: "Floor Plan",
    hi: "फ्लोर प्लान",
    ar: "مخطط الطابق",
    es: "Plano de planta",
  },

  feet: {
    bn: "ফুট",
    en: "Feet",
    hi: "फीट",
    ar: "قدم",
    es: "Pies",
  },

  area: {
    bn: "বর্গফুট",
    en: "Square Feet",
    hi: "वर्ग फुट",
    ar: "قدم مربع",
    es: "Pies cuadrados",
  },

  foundation: {
    bn: "ফাউন্ডেশন",
    en: "Foundation",
    hi: "नींव",
    ar: "الأساس",
    es: "Cimentación",
  },

  complete: {
    bn: "সম্পূর্ণ তলা",
    en: "Completed Stories",
    hi: "पूर्ण मंजिलें",
    ar: "الطوابق المكتملة",
    es: "Plantas completas",
  },
} as const;


// -----------------------------------------
// 8. SEO TITLE SETTINGS
// -----------------------------------------

export const seoTitleSettings = {
  maxLength: 70,
  minLength: 20,
} as const;


// -----------------------------------------
// 9. SEO DESCRIPTION SETTINGS
// -----------------------------------------

export const seoDescriptionSettings = {
  maxLength: 160,
  minLength: 50,
} as const;


// -----------------------------------------
// 10. SEO ALT TEXT SETTINGS
// -----------------------------------------

export const seoAltSettings = {
  maxLength: 200,
  minLength: 20,
} as const;


// -----------------------------------------
// 11. SEO FILENAME SETTINGS
// -----------------------------------------

export const seoFilenameSettings = {
  separator: "-",
  extension3d: "jpg",
  extension2d: "jpg",
} as const;
