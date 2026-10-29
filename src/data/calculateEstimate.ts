// =======================================================
// calculateEstimate.ts
// PART - 1
// (Replace everything from the top of the file up to the
// line before "// TOTAL")
// =======================================================

// ===============================
// PRICE
// ===============================

const PRICE = {
  // RCC
  rod: 92,
  brick: 11.232,
  cement: 510,
  sand: 40.8,

  // Tin Shade
  tinBrick: 11,
  tinCement: 500,
  tinSand: 40,

  // Luxury
  luxuryRod: 112.8,
  luxuryBrick: 13.464,
  luxuryCement: 612,
  luxurySand: 48.96,
};

// ===============================
// RCC FOUNDATION
// ===============================

const FOUNDATION = {
  1: {
    rod: 4.125,
    brick: 26250,
    cement: 412.5,
    sand: 1238,
  },

  2: {
    rod: 4.875,
    brick: 31300,
    cement: 495,
    sand: 1590,
  },

  3: {
    rod: 5.5,
    brick: 35000,
    cement: 550,
    sand: 1650,
  },

  4: {
    rod: 6.05,
    brick: 38500,
    cement: 605,
    sand: 1815,
  },
};

// ===============================
// RCC EXTRA FLOOR
// ===============================

const EXTRA = {
  rod: 3.2,
  brick: 18000,
  cement: 280,
  sand: 950,
};

// ===============================
// RCC OTHER COST
// ===============================

const RCC = {
  door: 173400,
  electrical: 102000,

  groundPaint: 112200,
  upperPaint: 102000,

  labourPerSft: 339.9,

  hidden: 255000,
};

// ===============================
// TIN SHADE BASE
// 480 SFT
// ===============================

const TIN = {
  baseArea: 480,

  rodKg: 320,
  brick: 12000,
  cement: 192,
  sand: 560,

  woodTin: 104000,

  labour: 144000,

  door: 72000,
  electrical: 40000,
  paint: 48000,
  hidden: 96000,
};

// ===============================
// LUXURY BASE
// 1000 SFT × 2 FLOOR
// ===============================

const LUXURY = {
  baseArea: 2000,

  rod: 8.7,
  brick: 52000,
  cement: 850,
  sand: 2600,

  labour: 741600,

  door: 416160,
  electrical: 244800,
  paint: 257040,
  hidden: 612000,
};

// ===============================
// HELPER
// ===============================

function round(value: number) {
  return Math.round(value);
}

function kg(ton: number) {
  return Math.round(ton * 1000);
}

// ===============================
// MAIN
// ===============================

export function calculateEstimate(
  length: number,
  width: number,
  foundation: number,
  floor: number,
  type: string = "rcc"
) {

  const area = Math.ceil(length * width);

  // ====================================
  // TIN SHADE
  // ====================================

  if (type === "tinshade") {

    const ratio = area / TIN.baseArea;

    const rodKg = TIN.rodKg * ratio;

    const brick = TIN.brick * ratio;
    const cement = TIN.cement * ratio;
    const sand = TIN.sand * ratio;

    const woodTin = TIN.woodTin * ratio;

    const labour = TIN.labour * ratio;

    const door = TIN.door * ratio;
    const electrical = TIN.electrical * ratio;
    const paint = TIN.paint * ratio;
    const hidden = TIN.hidden * ratio;

    const rodCost = rodKg * PRICE.rod;
    const brickCost = brick * PRICE.tinBrick;
    const cementCost = cement * PRICE.tinCement;
    const sandCost = sand * PRICE.tinSand;

    const materialTotal =
      rodCost +
      brickCost +
      cementCost +
      sandCost +
      woodTin +
      labour;

    const otherTotal =
      door +
      electrical +
      paint +
      hidden;

    const grandTotal =
      materialTotal +
      otherTotal;

    return {
      area,

      rod: rodKg / 1000,
      rodKg,

      brick,
      cement,
      sand,

      woodTin,

      rodCost,
      brickCost,
      cementCost,
      sandCost,

      labour,

      materialTotal,

      door,
      electrical,
      paint,
      hidden,

      otherTotal,

      grandTotal,
    };
  }

  // ====================================
  // LUXURY
  // ====================================

  if (type === "luxury") {

    const totalArea = area * floor;

    const ratio = totalArea / LUXURY.baseArea;

    const rod = LUXURY.rod * ratio;
    const rodKg = kg(rod);

    const brick = LUXURY.brick * ratio;
    const cement = LUXURY.cement * ratio;
    const sand = LUXURY.sand * ratio;

    const labour = LUXURY.labour * ratio;

    const door = LUXURY.door * ratio;
    const electrical = LUXURY.electrical * ratio;
    const paint = LUXURY.paint * ratio;
    const hidden = LUXURY.hidden * ratio;

    const rodCost = rodKg * PRICE.luxuryRod;

    const brickCost = brick * PRICE.luxuryBrick;

    const cementCost = cement * PRICE.luxuryCement;

    const sandCost = sand * PRICE.luxurySand;

    const materialTotal =
      rodCost +
      brickCost +
      cementCost +
      sandCost +
      labour;

    const otherTotal =
      door +
      electrical +
      paint +
      hidden;

    const grandTotal =
      materialTotal +
      otherTotal;

    return {      area,

      rod,
      rodKg,

      brick,
      cement,
      sand,

      rodCost,
      brickCost,
      cementCost,
      sandCost,

      labour,

      materialTotal,

      door,
      electrical,
      paint,
      hidden,

      otherTotal,

      grandTotal,
    };
  }

  // ====================================
  // RCC
  // ====================================

  const ratio = area / 1000;

  const base =
    FOUNDATION[
      foundation as keyof typeof FOUNDATION
    ] ?? FOUNDATION[3];

  let rod = base.rod;
  let brick = base.brick;
  let cement = base.cement;
  let sand = base.sand;

  if (floor > 1) {
    rod += EXTRA.rod * (floor - 1);
    brick += EXTRA.brick * (floor - 1);
    cement += EXTRA.cement * (floor - 1);
    sand += EXTRA.sand * (floor - 1);
  }

  rod *= ratio;
  brick *= ratio;
  cement *= ratio;
  sand *= ratio;

  const rodKg = kg(rod);

  const rodCost = round(rodKg * PRICE.rod);

  const brickCost = round(brick * PRICE.brick);

  const cementCost = round(cement * PRICE.cement);

  const sandCost = round(sand * PRICE.sand);

  const labour = round(
    area *
      floor *
      RCC.labourPerSft
  );

  const door = round(
    RCC.door *
      floor *
      ratio
  );

  const electrical = round(
    RCC.electrical *
      floor *
      ratio
  );

  const paint = round(
    (
      RCC.groundPaint +
      Math.max(0, floor - 1) *
        RCC.upperPaint
    ) * ratio
  );

  const hidden = round(
    RCC.hidden *
      (1 + (floor - 1) * 0.7) *
      ratio
  );

  const materialTotal =
    rodCost +
    brickCost +
    cementCost +
    sandCost +
    labour;

  const otherTotal =
    door +
    electrical +
    paint +
    hidden;

  const grandTotal =
    materialTotal +
    otherTotal;  // ====================================
  // RETURN
  // ====================================

  return {
    area,

    // Material Quantity
    rod,
    rodKg,

    brick,
    cement,
    sand,

    // Material Cost
    rodCost,
    brickCost,
    cementCost,
    sandCost,

    // Labour
    labour,

    // Material Total
    materialTotal,

    // Other Cost
    door,
    electrical,
    paint,
    hidden,

    // Tin Shade এ থাকবে, RCC/Luxury এ undefined হবে
    woodTin: undefined,

    // Other Total
    otherTotal,

    // Grand Total
    grandTotal,
  };
}