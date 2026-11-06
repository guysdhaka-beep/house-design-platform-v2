
/**
 * ============================================
 * House Design Platform
 * SEO Validation
 * File: seoValidation.ts
 * ============================================
 *
 * Features:
 * 1. House information validation
 * 2. Dimension validation
 * 3. Room information validation
 * 4. House feature validation
 * 5. Language validation
 * 6. Image SEO validation
 * 7. Complete SEO validation
 */

import type {
  SeoHouseData,
  SeoLanguage,
  SeoImageInformation,
  SeoValidationError,
  SeoValidationResult,
  SeoGeneratorResult,
} from "./seoTypes";


// --------------------------------------------
// 1. SUPPORTED LANGUAGES
// --------------------------------------------

const supportedLanguages: SeoLanguage[] = [
  "bn",
  "en",
  "hi",
  "ar",
  "es",
];


// --------------------------------------------
// 2. SUPPORTED HOUSE TYPES
// --------------------------------------------

const supportedHouseTypes = [
  "1-story",
  "2-story",
  "3-story",
  "4-story",
  "Luxury",
  "Tin Shade",
];


// --------------------------------------------
// 3. ROOM FIELD NAMES
// --------------------------------------------

const roomFields = [
  "bedroom",
  "bathroom",
  "balcony",
  "kitchen",
  "livingRoom",
  "diningRoom",
  "stair",
] as const;


// --------------------------------------------
// 4. FEATURE FIELD NAMES
// --------------------------------------------

const featureFields = [
  "garage",
  "terrace",
  "frontGarden",
  "backGarden",
  "swimmingPool",
  "lift",
  "servantRoom",
] as const;


// --------------------------------------------
// 5. HELPER: CREATE VALIDATION RESULT
// --------------------------------------------

function createValidationResult(
  errors: SeoValidationError[]
): SeoValidationResult {
  return {
    isValid: errors.length === 0,
    errors,
  };
}


// --------------------------------------------
// 6. HELPER: ADD VALIDATION ERROR
// --------------------------------------------

function addError(
  errors: SeoValidationError[],
  field: string,
  message: string
): void {
  errors.push({
    field,
    message,
  });
}


// --------------------------------------------
// 7. HELPER: CHECK VALID NUMBER
// --------------------------------------------

function isValidNumber(value: unknown): boolean {
  return (
    typeof value === "number" &&
    Number.isFinite(value)
  );
}


// --------------------------------------------
// 8. VALIDATE DIMENSIONS
// --------------------------------------------

export function validateSeoDimensions(
  house: SeoHouseData
): SeoValidationResult {
  const errors: SeoValidationError[] = [];

  if (
    !isValidNumber(house.length) ||
    house.length <= 0
  ) {
    addError(
      errors,
      "length",
      "House length must be greater than zero."
    );
  }

  if (
    !isValidNumber(house.width) ||
    house.width <= 0
  ) {
    addError(
      errors,
      "width",
      "House width must be greater than zero."
    );
  }

  if (
    house.lengthInch !== undefined &&
    (
      !isValidNumber(house.lengthInch) ||
      house.lengthInch < 0 ||
      house.lengthInch >= 12
    )
  ) {
    addError(
      errors,
      "lengthInch",
      "Length inches must be between 0 and 11."
    );
  }

  if (
    house.widthInch !== undefined &&
    (
      !isValidNumber(house.widthInch) ||
      house.widthInch < 0 ||
      house.widthInch >= 12
    )
  ) {
    addError(
      errors,
      "widthInch",
      "Width inches must be between 0 and 11."
    );
  }

  return createValidationResult(errors);
}


// --------------------------------------------
// 9. VALIDATE ROOM INFORMATION
// --------------------------------------------

export function validateSeoRooms(
  house: SeoHouseData
): SeoValidationResult {
  const errors: SeoValidationError[] = [];

  roomFields.forEach((field) => {
    const value = house[field];

    if (
      !isValidNumber(value) ||
      value < 0 ||
      !Number.isInteger(value)
    ) {
      addError(
        errors,
        field,
        `${field} must be a non-negative whole number.`
      );
    }
  });

  return createValidationResult(errors);
}


// --------------------------------------------
// 10. VALIDATE HOUSE FEATURES
// --------------------------------------------

export function validateSeoFeatures(
  house: SeoHouseData
): SeoValidationResult {
  const errors: SeoValidationError[] = [];

  featureFields.forEach((field) => {
    const value = house[field];

    if (typeof value !== "boolean") {
      addError(
        errors,
        field,
        `${field} must be true or false.`
      );
    }
  });

  return createValidationResult(errors);
}


// --------------------------------------------
// 11. VALIDATE HOUSE TYPE
// --------------------------------------------

export function validateSeoHouseType(
  houseType: string
): SeoValidationResult {
  const errors: SeoValidationError[] = [];

  if (!supportedHouseTypes.includes(houseType)) {
    addError(
      errors,
      "houseType",
      "Invalid house type."
    );
  }

  return createValidationResult(errors);
}


// --------------------------------------------
// 12. VALIDATE LANGUAGE
// --------------------------------------------

export function validateSeoLanguage(
  language: string
): SeoValidationResult {
  const errors: SeoValidationError[] = [];

  if (
    !supportedLanguages.includes(
      language as SeoLanguage
    )
  ) {
    addError(
      errors,
      "language",
      "Unsupported language. Use bn, en, hi, ar or es."
    );
  }

  return createValidationResult(errors);
}


// --------------------------------------------
// 13. VALIDATE FOUNDATION AND COMPLETE
// --------------------------------------------

export function validateSeoStories(
  house: SeoHouseData
): SeoValidationResult {
  const errors: SeoValidationError[] = [];

  if (
    house.foundation !== undefined &&
    (
      !isValidNumber(house.foundation) ||
      house.foundation < 1 ||
      !Number.isInteger(house.foundation)
    )
  ) {
    addError(
      errors,
      "foundation",
      "Foundation must be a positive whole number."
    );
  }

  if (
    house.complete !== undefined &&
    (
      !isValidNumber(house.complete) ||
      house.complete < 1 ||
      !Number.isInteger(house.complete)
    )
  ) {
    addError(
      errors,
      "complete",
      "Completed stories must be a positive whole number."
    );
  }

  return createValidationResult(errors);
}


// --------------------------------------------
// 14. VALIDATE HOUSE INFORMATION
// --------------------------------------------

export function validateSeoHouse(
  house: SeoHouseData
): SeoValidationResult {
  const errors: SeoValidationError[] = [];

  const dimensions = validateSeoDimensions(house);
  const rooms = validateSeoRooms(house);
  const features = validateSeoFeatures(house);
  const houseType = validateSeoHouseType(house.houseType);
  const language = validateSeoLanguage(house.language);
  const stories = validateSeoStories(house);

  errors.push(
    ...dimensions.errors,
    ...rooms.errors,
    ...features.errors,
    ...houseType.errors,
    ...language.errors,
    ...stories.errors
  );

  if (
    house.designStyle !== undefined &&
    (
      typeof house.designStyle !== "string" ||
      !house.designStyle.trim()
    )
  ) {
    addError(
      errors,
      "designStyle",
      "Design style cannot be empty."
    );
  }

  if (
    house.area !== undefined &&
    (
      !isValidNumber(house.area) ||
      house.area <= 0
    )
  ) {
    addError(
      errors,
      "area",
      "Area must be greater than zero."
    );
  }

  return createValidationResult(errors);
}


// --------------------------------------------
// 15. VALIDATE IMAGE SEO INFORMATION
// --------------------------------------------

export function validateSeoImageInformation(
  seo: SeoImageInformation
): SeoValidationResult {
  const errors: SeoValidationError[] = [];

  if (!seo.imageTitle.trim()) {
    addError(
      errors,
      "imageTitle",
      "Image title is required."
    );
  }

  if (!seo.altText.trim()) {
    addError(
      errors,
      "altText",
      "Image alt text is required."
    );
  }

  if (!seo.caption.trim()) {
    addError(
      errors,
      "caption",
      "Image caption is required."
    );
  }

  if (!seo.description.trim()) {
    addError(
      errors,
      "description",
      "Image description is required."
    );
  }

  if (!seo.fileName.trim()) {
    addError(
      errors,
      "fileName",
      "Image filename is required."
    );
  }

  if (!Array.isArray(seo.keywords)) {
    addError(
      errors,
      "keywords",
      "Image keywords must be an array."
    );
  } else if (
    seo.keywords.some(
      (keyword) =>
        typeof keyword !== "string" ||
        !keyword.trim()
    )
  ) {
    addError(
      errors,
      "keywords",
      "Keywords cannot contain empty values."
    );
  }

  return createValidationResult(errors);
}


// --------------------------------------------
// 16. VALIDATE GENERATED HOUSE SEO
// --------------------------------------------

export function validateGeneratedHouseSeo(
  seo: SeoGeneratorResult
): SeoValidationResult {
  const errors: SeoValidationError[] = [];

  const image3d = validateSeoImageInformation(
    seo.image3d
  );

  const image2d = validateSeoImageInformation(
    seo.image2d
  );

  errors.push(
    ...image3d.errors.map((error) => ({
      ...error,
      field: `image3d.${error.field}`,
    })),
    ...image2d.errors.map((error) => ({
      ...error,
      field: `image2d.${error.field}`,
    }))
  );

  if (seo.image3d.imageType !== "3d") {
    addError(
      errors,
      "image3d.imageType",
      "The 3D image must have imageType 3d."
    );
  }

  if (seo.image2d.imageType !== "2d") {
    addError(
      errors,
      "image2d.imageType",
      "The 2D image must have imageType 2d."
    );
  }

  return createValidationResult(errors);
}


// --------------------------------------------
// 17. GET VALIDATION ERROR MESSAGES
// --------------------------------------------

export function getSeoValidationMessages(
  result: SeoValidationResult
): string[] {
  return result.errors.map(
    (error) => error.message
  );
}


// --------------------------------------------
// 18. GET VALIDATION ERRORS BY FIELD
// --------------------------------------------

export function getSeoFieldErrors(
  result: SeoValidationResult,
  field: string
): string[] {
  return result.errors
    .filter((error) => error.field === field)
    .map((error) => error.message);
}


// --------------------------------------------
// 19. CHECK IF SEO DATA IS VALID
// --------------------------------------------

export function isSeoValid(
  result: SeoValidationResult
): boolean {
  return result.isValid;
}


// --------------------------------------------
// 20. VALIDATE COMPLETE SEO PROCESS
// --------------------------------------------

export function validateCompleteSeo(
  house: SeoHouseData,
  generatedSeo: SeoGeneratorResult
): SeoValidationResult {
  const houseResult = validateSeoHouse(house);

  const imageResult = validateGeneratedHouseSeo(
    generatedSeo
  );

  return createValidationResult([
    ...houseResult.errors,
    ...imageResult.errors,
  ]);
}
