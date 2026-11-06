
/**
 * ============================================
 * House Design Platform
 * SEO Image Utilities
 * File: seoImage.ts
 * ============================================
 *
 * Features:
 * 1. Image file validation
 * 2. Image MIME type checking
 * 3. Image extension detection
 * 4. SEO filename generation
 * 5. Image and SEO data combination
 * 6. 3D and 2D image handling
 * 7. Image upload FormData generation
 */

// --------------------------------------------
// 1. IMPORTS
// --------------------------------------------

import type {
  SeoImageType,
  SeoImageInformation,
  SeoImageFile,
  SeoHouseData,
  SeoLanguage,
} from "./seoTypes";

import {
  generateSeoImageInformation,
} from "./seoGenerator";


// --------------------------------------------
// 2. ALLOWED IMAGE TYPES
// --------------------------------------------

export const allowedImageMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
] as const;


// --------------------------------------------
// 3. IMAGE VALIDATION SETTINGS
// --------------------------------------------

export const seoImageSettings = {
  maxFileSizeMB: 10,
  allowedMimeTypes: allowedImageMimeTypes,
} as const;


// --------------------------------------------
// 4. IMAGE VALIDATION RESULT
// --------------------------------------------

export interface SeoImageValidationResult {
  isValid: boolean;
  errors: string[];
}


// --------------------------------------------
// 5. CHECK IMAGE MIME TYPE
// --------------------------------------------

export function isSupportedImageType(
  file: File
): boolean {
  return (
    seoImageSettings.allowedMimeTypes as readonly string[]
  ).includes(file.type);
}


// --------------------------------------------
// 6. GET IMAGE EXTENSION
// --------------------------------------------

export function getImageExtension(
  file: File
): string {
  const mimeExtensions: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/avif": "avif",
  };

  return mimeExtensions[file.type] || "jpg";
}


// --------------------------------------------
// 7. VALIDATE IMAGE FILE
// --------------------------------------------

export function validateSeoImage(
  file: File | null
): SeoImageValidationResult {
  const errors: string[] = [];

  if (!file) {
    return {
      isValid: false,
      errors: ["Image file is required."],
    };
  }

  if (file.size <= 0) {
    errors.push("Image file is empty.");
  }

  if (!isSupportedImageType(file)) {
    errors.push(
      "Unsupported image format. Use JPG, PNG, WEBP or AVIF."
    );
  }

  const maxSize =
    seoImageSettings.maxFileSizeMB * 1024 * 1024;

  if (file.size > maxSize) {
    errors.push(
      `Image size must not exceed ${seoImageSettings.maxFileSizeMB} MB.`
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}


// --------------------------------------------
// 8. SANITIZE FILE NAME
// --------------------------------------------

export function sanitizeImageFilename(
  filename: string
): string {
  const extensionIndex = filename.lastIndexOf(".");

  const name =
    extensionIndex > 0
      ? filename.slice(0, extensionIndex)
      : filename;

  const extension =
    extensionIndex > 0
      ? filename.slice(extensionIndex + 1).toLowerCase()
      : "";

  const safeName = name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");

  return extension
    ? `${safeName || "house-image"}.${extension}`
    : safeName || "house-image";
}


// --------------------------------------------
// 9. CREATE SEO IMAGE FILENAME
// --------------------------------------------

export function createSeoImageFilename(
  seo: SeoImageInformation,
  file: File
): string {
  const extension = getImageExtension(file);

  const baseName = seo.fileName.replace(
    /\.[^.]+$/,
    ""
  );

  return `${baseName}.${extension}`;
}


// --------------------------------------------
// 10. VALIDATE IMAGE TYPE
// --------------------------------------------

export function validateImageType(
  file: File | null,
  expectedType: SeoImageType
): SeoImageValidationResult {
  const result = validateSeoImage(file);

  if (!result.isValid) {
    return result;
  }

  if (expectedType !== "3d" && expectedType !== "2d") {
    return {
      isValid: false,
      errors: ["Invalid image type. Use 3D or 2D."],
    };
  }

  return {
    isValid: true,
    errors: [],
  };
}


// --------------------------------------------
// 11. CREATE SEO IMAGE FILE OBJECT
// --------------------------------------------

export function createSeoImageFile(
  file: File | null,
  imageType: SeoImageType,
  seo: SeoImageInformation
): SeoImageFile {
  const updatedSeo = file
    ? {
        ...seo,
        fileName: createSeoImageFilename(seo, file),
      }
    : seo;

  return {
    file,
    imageType,
    seo: updatedSeo,
  };
}


// --------------------------------------------
// 12. GENERATE SEO IMAGE FILE
// --------------------------------------------

export function generateSeoImageFile(
  file: File | null,
  house: SeoHouseData,
  imageType: SeoImageType,
  language: SeoLanguage = house.language
): SeoImageFile {
  const seo = generateSeoImageInformation(
    house,
    imageType,
    language
  );

  return createSeoImageFile(
    file,
    imageType,
    seo
  );
}


// --------------------------------------------
// 13. GENERATE 3D IMAGE FILE
// --------------------------------------------

export function generate3dImageFile(
  file: File | null,
  house: SeoHouseData,
  language: SeoLanguage = house.language
): SeoImageFile {
  return generateSeoImageFile(
    file,
    house,
    "3d",
    language
  );
}


// --------------------------------------------
// 14. GENERATE 2D IMAGE FILE
// --------------------------------------------

export function generate2dImageFile(
  file: File | null,
  house: SeoHouseData,
  language: SeoLanguage = house.language
): SeoImageFile {
  return generateSeoImageFile(
    file,
    house,
    "2d",
    language
  );
}


// --------------------------------------------
// 15. GET IMAGE SEO DATA
// --------------------------------------------

export function getImageSeoData(
  image: SeoImageFile
): SeoImageInformation {
  return image.seo;
}


// --------------------------------------------
// 16. GET IMAGE FILE SIZE IN MB
// --------------------------------------------

export function getImageFileSizeMB(
  file: File
): number {
  return Number(
    (file.size / (1024 * 1024)).toFixed(2)
  );
}


// --------------------------------------------
// 17. GET IMAGE FILE INFORMATION
// --------------------------------------------

export function getImageFileInformation(
  file: File
) {
  return {
    name: file.name,
    type: file.type,
    extension: getImageExtension(file),
    size: file.size,
    sizeMB: getImageFileSizeMB(file),
    lastModified: file.lastModified,
  };
}


// --------------------------------------------
// 18. CHECK IF FILE IS AN IMAGE
// --------------------------------------------

export function isImageFile(
  file: File
): boolean {
  return file.type.startsWith("image/");
}


// --------------------------------------------
// 19. GET IMAGE TYPE LABEL
// --------------------------------------------

export function getImageTypeLabel(
  imageType: SeoImageType
): string {
  return imageType === "3d"
    ? "3D House Image"
    : "2D House Floor Plan";
}


// --------------------------------------------
// 20. GET IMAGE VALIDATION MESSAGE
// --------------------------------------------

export function getImageValidationMessage(
  result: SeoImageValidationResult
): string {
  if (result.isValid) {
    return "Image is valid.";
  }

  return result.errors.join(" ");
}


// --------------------------------------------
// 21. CREATE IMAGE UPLOAD DATA
// --------------------------------------------

export function createImageUploadData(
  image: SeoImageFile
): FormData {
  const formData = new FormData();

  if (image.file) {
    formData.append("image", image.file);
  }

  formData.append(
    "imageType",
    image.imageType
  );

  formData.append(
    "imageTitle",
    image.seo.imageTitle
  );

  formData.append(
    "altText",
    image.seo.altText
  );

  formData.append(
    "caption",
    image.seo.caption
  );

  formData.append(
    "description",
    image.seo.description
  );

  formData.append(
    "fileName",
    image.seo.fileName
  );

  formData.append(
    "keywords",
    JSON.stringify(image.seo.keywords)
  );

  return formData;
}
