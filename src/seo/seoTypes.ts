
// ============================================
// House Design Platform
// SEO System - Type Definitions
// File: seoTypes.ts
// ============================================


// --------------------------------------------
// 1. SUPPORTED LANGUAGES
// --------------------------------------------

export type SeoLanguage = "bn" | "en" | "hi" | "ar" | "es";


// --------------------------------------------
// 2. SEO IMAGE TYPES
// --------------------------------------------

export type SeoImageType = "3d" | "2d";


// --------------------------------------------
// 3. SEO DESIGN STYLE
// --------------------------------------------

export type SeoDesignStyle =
  | "Modern"
  | "Contemporary"
  | "Traditional"
  | "Minimalist"
  | "Classic"
  | "Elegant"
  | "Luxury"
  | "Simple"
  | "European"
  | "Mediterranean"
  | "Tropical"
  | "Rustic"
  | "Industrial"
  | "Farmhouse"
  | "Colonial"
  | "Bungalow"
  | "Duplex"
  | "Architectural";


// --------------------------------------------
// 4. EXISTING HOUSE CATEGORY
// --------------------------------------------

// এটি তোমার বর্তমান House Type-এর সঙ্গে মিল রেখে রাখা হয়েছে।
// Existing houseType logic পরিবর্তন করবে না।

export type ExistingHouseType =
  | "1-story"
  | "2-story"
  | "3-story"
  | "4-story"
  | "Luxury"
  | "Tin Shade";


// --------------------------------------------
// 5. HOUSE DIMENSIONS
// --------------------------------------------

export interface SeoDimensions {
  length: number;
  width: number;

  lengthInch?: number;
  widthInch?: number;

  area?: number;
}


// --------------------------------------------
// 6. HOUSE ROOM INFORMATION
// --------------------------------------------

export interface SeoRoomInformation {
  bedroom: number;
  bathroom: number;
  balcony: number;
  kitchen: number;
  livingRoom: number;
  diningRoom: number;
  stair: number;
}


// --------------------------------------------
// 7. HOUSE FEATURES
// --------------------------------------------

export interface SeoHouseFeatures {
  garage: boolean;
  terrace: boolean;
  frontGarden: boolean;
  backGarden: boolean;
  swimmingPool: boolean;
  lift: boolean;
  servantRoom: boolean;
}


// --------------------------------------------
// 8. HOUSE INFORMATION FOR SEO
// --------------------------------------------

export interface SeoHouseData {
  title?: string;

  // Existing house category
  houseType: ExistingHouseType;

  // SEO design style is separate
  designStyle?: SeoDesignStyle;

  // Dimensions
  length: number;
  width: number;

  lengthInch?: number;
  widthInch?: number;

  area?: number;

  // Foundation and completed stories
  foundation?: number;
  complete?: number;

  // Room information
  bedroom: number;
  bathroom: number;
  balcony: number;
  kitchen: number;
  livingRoom: number;
  diningRoom: number;
  stair: number;

  // Additional features
  garage: boolean;
  terrace: boolean;
  frontGarden: boolean;
  backGarden: boolean;
  swimmingPool: boolean;
  lift: boolean;
  servantRoom: boolean;

  // SEO language
  language: SeoLanguage;
}


// --------------------------------------------
// 9. GENERATED SEO CONTENT
// --------------------------------------------

export interface SeoGeneratedContent {
  title: string;
  description: string;
  caption: string;
  keywords: string[];
}


// --------------------------------------------
// 10. IMAGE SEO INFORMATION
// --------------------------------------------

export interface SeoImageInformation {
  imageType: SeoImageType;

  fileName: string;

  imageTitle: string;

  altText: string;

  caption: string;

  description: string;

  keywords: string[];
}


// --------------------------------------------
// 11. COMPLETE HOUSE SEO INFORMATION
// --------------------------------------------

export interface SeoHouseImages {
  image3d: SeoImageInformation;
  image2d: SeoImageInformation;
}


// --------------------------------------------
// 12. SEO GENERATOR INPUT
// --------------------------------------------

export interface SeoGeneratorInput {
  house: SeoHouseData;

  imageType: SeoImageType;

  language?: SeoLanguage;
}


// --------------------------------------------
// 13. SEO VALIDATION RESULT
// --------------------------------------------

export interface SeoValidationError {
  field: string;

  message: string;
}


export interface SeoValidationResult {
  isValid: boolean;

  errors: SeoValidationError[];
}


// --------------------------------------------
// 14. SEO SETTINGS
// --------------------------------------------

export interface SeoSettings {
  titleMaxLength: number;

  descriptionMaxLength: number;

  altTextMaxLength: number;

  captionMaxLength: number;

  filenameSeparator: string;
}


// --------------------------------------------
// 15. SEO IMAGE FILE INFORMATION
// --------------------------------------------

export interface SeoImageFile {
  file: File | null;

  imageType: SeoImageType;

  seo: SeoImageInformation;
}


// --------------------------------------------
// 16. SEO LANGUAGE LABEL
// --------------------------------------------

export type SeoLanguageLabels = Record<
  SeoLanguage,
  string
>;


// --------------------------------------------
// 17. SEO ROOM LABEL
// --------------------------------------------

export type SeoRoomField =
  | "bedroom"
  | "bathroom"
  | "balcony"
  | "kitchen"
  | "livingRoom"
  | "diningRoom"
  | "stair";


// --------------------------------------------
// 18. SEO FEATURE FIELD
// --------------------------------------------

export type SeoFeatureField =
  | "garage"
  | "terrace"
  | "frontGarden"
  | "backGarden"
  | "swimmingPool"
  | "lift"
  | "servantRoom";


// --------------------------------------------
// 19. SEO TRANSLATION LABELS
// --------------------------------------------

export interface SeoTranslatedLabel {
  bn: string;
  en: string;
  hi: string;
  ar: string;
  es: string;
}


// --------------------------------------------
// 20. SEO OPTIONS
// --------------------------------------------

export interface SeoOption<T = string> {
  value: T;

  label: string;
}


// --------------------------------------------
// 21. SEO GENERATOR RESULT
// --------------------------------------------

export interface SeoGeneratorResult {
  image3d: SeoImageInformation;

  image2d: SeoImageInformation;
}


// --------------------------------------------
// 22. SEO API PAYLOAD
// --------------------------------------------

export interface SeoApiPayload {
  image3dTitle: string;

  image2dTitle: string;

  image3dAlt: string;

  image2dAlt: string;

  image3dCaption: string;

  image2dCaption: string;

  image3dDescription: string;

  image2dDescription: string;

  image3dKeywords: string[];

  image2dKeywords: string[];
}
