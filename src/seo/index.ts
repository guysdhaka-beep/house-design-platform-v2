
/**
 * ============================================
 * House Design Platform
 * SEO System
 * File: index.ts
 * ============================================
 *
 * Central export file for SEO modules.
 */

// --------------------------------------------
// 1. SEO TYPES
// --------------------------------------------

export type * from "./seoTypes";


// --------------------------------------------
// 2. SEO OPTIONS
// --------------------------------------------

export {
  seoDesignStyles,
  seoImageTypes,
  seoLanguages,
  seoRoomLabels,
  seoFeatureLabels,
  seoImageLabels,
  seoGeneralLabels,
  seoTitleSettings,
  seoDescriptionSettings,
  seoAltSettings,
  seoFilenameSettings,
} from "./seoOptions";


// --------------------------------------------
// 3. SEO GENERATOR
// --------------------------------------------

export {
  calculateSeoArea,
  generateSeoKeywords,
  generateSeoTitle,
  generateSeoAltText,
  generateSeoCaption,
  generateSeoDescription,
  generateSeoFilename,
  generateSeoImageInformation,
  generate3dSeo,
  generate2dSeo,
  generateHouseSeo,
  generateSeoContent,
} from "./seoGenerator";


// --------------------------------------------
// 4. SEO IMAGE UTILITIES
// --------------------------------------------

export {
  allowedImageMimeTypes,
  seoImageSettings,
  validateSeoImage,
  validateImageType,
  isSupportedImageType,
  getImageExtension,
  sanitizeImageFilename,
  createSeoImageFilename,
  createSeoImageFile,
  generateSeoImageFile,
  generate3dImageFile,
  generate2dImageFile,
  getImageSeoData,
  getImageFileSizeMB,
  getImageFileInformation,
  isImageFile,
  getImageTypeLabel,
  getImageValidationMessage,
  createImageUploadData,
} from "./seoImage";

export type {
  SeoImageValidationResult,
} from "./seoImage";


// --------------------------------------------
// 5. SEO VALIDATION
// --------------------------------------------

export {
  validateSeoDimensions,
  validateSeoRooms,
  validateSeoFeatures,
  validateSeoHouseType,
  validateSeoLanguage,
  validateSeoStories,
  validateSeoHouse,
  validateSeoImageInformation,
  validateGeneratedHouseSeo,
  getSeoValidationMessages,
  getSeoFieldErrors,
  isSeoValid,
  validateCompleteSeo,
} from "./seoValidation";
