import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import translations from "../data/translations";
import { calculateEstimate } from "../data/calculateEstimate";
import { currency } from "../data/currency";
import HomeButton from "../components/HomeButton";
import { getHouse, saveHouse } from "../data/houseCache";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

import "../styles/house-details.css";
import "../styles/estimate.css";

type Language = keyof typeof translations;

type House = {
  id: number;
  title: string;
  houseType: string;
  folder: string;
  length: number;
  width: number;
  foundation: number;
  complete: number;
  isFeatured: boolean;
  images: {
    id: number;
    type: string;
    image: string;
  }[];
};

type EstimatePageProps = {
  language: Language;
};

type EstimateTranslation = {
  estimate: string;
  houseCost: string;
  luxuryHouseCost: string;
  tinshadeHouseCost: string;
  feet: string;
  totalFloorArea: string;
  foundationInfo: (foundation: number, floor: number) => string;
  materials: string;
  rodNeeded: string;
  brickNeeded: string;
  cementNeeded: string;
  sandNeeded: string;
  labour: string;
  woodTin: string;
  materialTotal: string;
  otherCost: string;
  doorWindow: string;
  electrical: string;
  paint: string;
  hidden: string;
  otherTotal: string;
  grandTotal: string;
  comment: string;
  cost: string;
  ton: string;
  kg: string;
  pieces: string;
  bags: string;
  cft: string;
  houseNotFound: string;
  loading: string;
  floor: string;
};

const estimateTranslations: Record<Language, EstimateTranslation> = {
  bn: {
    estimate: "খরচ দেখুন",
    houseCost: "এই বাড়িটির খরচ দেখুন 👇",
    luxuryHouseCost: "এই Luxury বাড়ির খরচ দেখুন 👇",
    tinshadeHouseCost: "এই Tin Shade বাড়ির খরচ দেখুন 👇",
    feet: "ফুট",
    totalFloorArea: "মোট ফ্লোর এরিয়া",
    foundationInfo: (foundation, floor) =>
      `(${foundation} তলা ফাউন্ডেশন দিয়ে ${floor} তলা খরচের হিসাব)`,
    materials: "মালামাল",
    rodNeeded: "রড লাগবে",
    brickNeeded: "ইট লাগবে",
    cementNeeded: "সিমেন্ট লাগবে",
    sandNeeded: "বালি লাগবে",
    labour: "মিস্ত্রি খরচ",
    woodTin: "কাঠ + টিন",
    materialTotal: "মোট মালামাল + মিস্ত্রি খরচ",
    otherCost: "অন্যান্য খরচ",
    doorWindow: "দরজা + জানালা",
    electrical: "ইলেকট্রিক্যাল + প্লাম্বিং",
    paint: "পেইন্ট + টাইলস",
    hidden: "গায়েবি খরচ",
    otherTotal: "মোট অন্যান্য খরচ",
    grandTotal: "সর্বমোট খরচ",
    comment:
      "আপনি কেমন বাড়ি করতে চান? কত টাকার মধ্যে বাড়ি করতে চান? আপনার চাহিদা কমেন্ট করুন...",
    cost: "খরচ",
    ton: "টন",
    kg: "কেজি",
    pieces: "পিস",
    bags: "ব্যাগ",
    cft: "CFT",
    houseNotFound: "বাড়ি পাওয়া যায়নি",
    loading: "লোড হচ্ছে...",
    floor: "তলা",
  },

  en: {
    estimate: "Cost Estimate",
    houseCost: "See the cost of this house 👇",
    luxuryHouseCost: "See the cost of this Luxury house 👇",
    tinshadeHouseCost: "See the cost of this Tin Shade house 👇",
    feet: "Feet",
    totalFloorArea: "Total Floor Area",
    foundationInfo: (foundation, floor) =>
      `(${foundation}-floor foundation for a ${floor}-floor cost estimate)`,
    materials: "Materials",
    rodNeeded: "Steel required",
    brickNeeded: "Brick required",
    cementNeeded: "Cement required",
    sandNeeded: "Sand required",
    labour: "Labour",
    woodTin: "Wood + Tin",
    materialTotal: "Total Materials + Labour",
    otherCost: "Other Costs",
    doorWindow: "Doors + Windows",
    electrical: "Electrical + Plumbing",
    paint: "Paint + Tiles",
    hidden: "Miscellaneous Cost",
    otherTotal: "Total Other Costs",
    grandTotal: "Grand Total",
    comment:
      "What kind of house do you want to build? What is your budget? Leave your requirements in the comments...",
    cost: "Cost",
    ton: "Ton",
    kg: "KG",
    pieces: "Pieces",
    bags: "Bags",
    cft: "CFT",
    houseNotFound: "House Not Found",
    loading: "Loading...",
    floor: "Floor",
  },

  hi: {
    estimate: "लागत देखें",
    houseCost: "इस घर की लागत देखें 👇",
    luxuryHouseCost: "इस Luxury घर की लागत देखें 👇",
    tinshadeHouseCost: "इस Tin Shade घर की लागत देखें 👇",
    feet: "फीट",
    totalFloorArea: "कुल फ़्लोर एरिया",
    foundationInfo: (foundation, floor) =>
      `(${foundation} मंज़िला नींव के साथ ${floor} मंज़िला लागत का अनुमान)`,
    materials: "सामग्री",
    rodNeeded: "स्टील लगेगा",
    brickNeeded: "ईंट लगेगी",
    cementNeeded: "सीमेंट लगेगा",
    sandNeeded: "रेत लगेगी",
    labour: "मज़दूरी",
    woodTin: "लकड़ी + टिन",
    materialTotal: "कुल सामग्री + मज़दूरी",
    otherCost: "अन्य खर्च",
    doorWindow: "दरवाज़े + खिड़कियाँ",
    electrical: "इलेक्ट्रिकल + प्लंबिंग",
    paint: "पेंट + टाइल्स",
    hidden: "अन्य अप्रत्याशित खर्च",
    otherTotal: "कुल अन्य खर्च",
    grandTotal: "कुल लागत",
    comment:
      "आप कैसा घर बनाना चाहते हैं? आपका बजट कितना है? अपनी ज़रूरतें कमेंट में लिखें...",
    cost: "लागत",
    ton: "टन",
    kg: "किग्रा",
    pieces: "पीस",
    bags: "बैग",
    cft: "CFT",
    houseNotFound: "घर नहीं मिला",
    loading: "लोड हो रहा है...",
    floor: "मंज़िल",
  },

  ar: {
    estimate: "عرض التكلفة",
    houseCost: "شاهد تكلفة هذا المنزل 👇",
    luxuryHouseCost: "شاهد تكلفة هذا المنزل الفاخر 👇",
    tinshadeHouseCost: "شاهد تكلفة هذا المنزل ذي السقف المعدني 👇",
    feet: "قدم",
    totalFloorArea: "إجمالي مساحة الطوابق",
    foundationInfo: (foundation, floor) =>
      `(${foundation} طوابق أساس لحساب تكلفة منزل من ${floor} طوابق)`,
    materials: "المواد",
    rodNeeded: "كمية الحديد المطلوبة",
    brickNeeded: "كمية الطوب المطلوبة",
    cementNeeded: "كمية الأسمنت المطلوبة",
    sandNeeded: "كمية الرمل المطلوبة",
    labour: "تكلفة العمالة",
    woodTin: "الخشب + المعدن",
    materialTotal: "إجمالي المواد + العمالة",
    otherCost: "تكاليف أخرى",
    doorWindow: "الأبواب + النوافذ",
    electrical: "الكهرباء + السباكة",
    paint: "الطلاء + البلاط",
    hidden: "تكاليف متنوعة",
    otherTotal: "إجمالي التكاليف الأخرى",
    grandTotal: "إجمالي التكلفة",
    comment:
      "ما نوع المنزل الذي تريد بناءه؟ ما ميزانيتك؟ اكتب متطلباتك في التعليقات...",
    cost: "التكلفة",
    ton: "طن",
    kg: "كجم",
    pieces: "قطعة",
    bags: "أكياس",
    cft: "قدم مكعب",
    houseNotFound: "لم يتم العثور على المنزل",
    loading: "جارٍ التحميل...",
    floor: "طابق",
  },

  es: {
    estimate: "Ver presupuesto",
    houseCost: "Ver el costo de esta casa 👇",
    luxuryHouseCost: "Ver el costo de esta casa de lujo 👇",
    tinshadeHouseCost: "Ver el costo de esta casa con techo de chapa 👇",
    feet: "pies",
    totalFloorArea: "Área total",
    foundationInfo: (foundation, floor) =>
      `(Cimentación para ${foundation} plantas, costo para ${floor} plantas)`,
    materials: "Materiales",
    rodNeeded: "Acero",
    brickNeeded: "Ladrillos",
    cementNeeded: "Cemento",
    sandNeeded: "Arena",
    labour: "Mano de obra",
    woodTin: "Madera + Chapa",
    materialTotal: "Materiales + Mano de obra",
    otherCost: "Otros costos",
    doorWindow: "Puertas + Ventanas",
    electrical: "Electricidad + Plomería",
    paint: "Pintura + Baldosas",
    hidden: "Gastos adicionales",
    otherTotal: "Total otros costos",
    grandTotal: "Costo total",
    comment:
      "¿Qué tipo de casa deseas construir? ¿Cuál es tu presupuesto? Escribe tus requisitos en los comentarios...",
    cost: "Costo",
    ton: "Ton",
    kg: "Kg",
    pieces: "Piezas",
    bags: "Bolsas",
    cft: "CFT",
    houseNotFound: "Casa no encontrada",
    loading: "Cargando...",
    floor: "planta",
  },
};

const localeByLanguage: Record<Language, string> = {
  bn: "bn-BD",
  en: "en-US",
  hi: "hi-IN",
  ar: "ar-SA",
  es: "es-ES",
};

function EstimatePage({ language }: EstimatePageProps) {
  const navigate = useNavigate();

const location = useLocation();

  const { id } = useParams<{ folder: string; id: string }>();

  const [house, setHouse] = useState<House | null>(null);
  const [loading, setLoading] = useState(true);

  const t = estimateTranslations[language];
  const currentCurrency = currency[language];
  const numericId = Number(id);

  useEffect(() => {
    let ignore = false;

    setLoading(true);
    setHouse(null);

    async function loadHouse() {
      if (!id || !Number.isFinite(numericId) || numericId <= 0) {
        if (!ignore) {
          setHouse(null);
          setLoading(false);
        }
        return;
      }

      try {
        const houseData = await getHouse(numericId);

        if (ignore) {
          return;
        }

        if (houseData) {
          saveHouse(houseData);
          setHouse(houseData as House);
        } else {
          setHouse(null);
        }
      } catch (error) {
        if (!ignore) {
          console.error("Failed to load house:", error);
          setHouse(null);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void loadHouse();

    return () => {
      ignore = true;
    };
  }, [id, numericId]);

const image3dInfo: any =
  house?.images?.find((img: any) => img.type === "3d");

const image3d =
  image3dInfo?.image || "";

const pageTitle =
  image3dInfo?.imageTitle ||
  house?.title ||
  "House Estimate";

const imageAlt =
  image3dInfo?.altText ||
  house?.title ||
  "";

const metaDescription =
  image3dInfo?.description ||
  imageAlt ||
  pageTitle;

const imageKeywords =
  image3dInfo?.keywords || [];

const keywords =
  imageKeywords.length > 0
    ? imageKeywords.join(", ")
    : "house estimate, construction cost, building estimate";

const canonicalUrl =
  `https://housedgn.com${location.pathname}`;


  const estimate = useMemo(() => {
    if (!house) {
      return null;
    }

    return calculateEstimate(
      house.length,
      house.width,
      house.foundation,
      house.complete,
      house.houseType
    );
  }, [house]);

  const formatNumber = (
    value: number,
    maximumFractionDigits = 0
  ): string => {
    return new Intl.NumberFormat(localeByLanguage[language], {
      maximumFractionDigits,
    }).format(Number.isFinite(value) ? value : 0);
  };

  const formatCurrency = (bdtAmount: number): string => {
    const convertedAmount = bdtAmount / currentCurrency.rate;

    const formattedAmount = new Intl.NumberFormat(
      localeByLanguage[language],
      {
        maximumFractionDigits: 0,
      }
    ).format(Number.isFinite(convertedAmount) ? convertedAmount : 0);

    return language === "bn"
      ? `${formattedAmount} ${currentCurrency.name}`
      : `${currentCurrency.symbol}${formattedAmount}`;
  };

  if (loading) {
    return (
      <main
        className="estimate-container"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="estimate-home-button">
          <HomeButton />
        </div>
        <h2 className="estimate-title">{t.loading}</h2>
      </main>
    );
  }

  if (!house || !estimate) {
    return (
      <main
        className="estimate-container"
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="estimate-home-button">
          <HomeButton />
        </div>
        <h2 className="estimate-title">{t.houseNotFound}</h2>
      </main>
    );
  }

  const area = estimate.area;
  const totalArea = area * house.complete;

  const houseCostText =
    house.houseType === "luxury"
      ? t.luxuryHouseCost
      : house.houseType === "tinshade"
        ? t.tinshadeHouseCost
        : t.houseCost;

  return (
  <>
    <Helmet>
      <title>{pageTitle}</title>

      <meta
        name="description"
        content={metaDescription}
      />

      <meta
        name="keywords"
        content={keywords}
      />

      <link
        rel="canonical"
        href={canonicalUrl}
      />

      <meta
        property="og:title"
        content={pageTitle}
      />

      <meta
        property="og:description"
        content={metaDescription}
      />

      <meta
        property="og:image"
        content={image3d}
      />

      <meta
        property="og:url"
        content={canonicalUrl}
      />

      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="twitter:card"
        content="summary_large_image"
      />

      <meta
        property="twitter:title"
        content={pageTitle}
      />

      <meta
        property="twitter:description"
        content={metaDescription}
      />

      <meta
        property="twitter:image"
        content={image3d}
      />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: pageTitle,
          description: metaDescription,
          image: image3d,
          url: canonicalUrl,
          keywords,
        })}
      </script>
    </Helmet>

    <main


      className="estimate-container"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="estimate-home-button">
        <HomeButton />
      </div>

      <h1 className="estimate-title">💰 {t.estimate}</h1>

      <section className="estimate-card">
        <p>🏠 {houseCostText}</p>

        <p>
          <b>
            {formatNumber(house.length)} × {formatNumber(house.width)}{" "}
            {t.feet} = {formatNumber(area)} SFT
          </b>
        </p>

        <p>
          <b>
            {formatNumber(house.complete)} {t.floor} ={" "}
            {formatNumber(totalArea)} SFT {t.totalFloorArea}
          </b>
        </p>

        {house.houseType !== "tinshade" && (
          <p>
            <b>
              {t.foundationInfo(house.foundation, house.complete)}
            </b>
          </p>
        )}

        <h2 className="estimate-section-title blue">
          🧱 {t.materials}
        </h2>

        <p>
          <b>
            {t.rodNeeded} = {formatNumber(estimate.rod, 2)} {t.ton} (
            {formatNumber(Math.round(estimate.rodKg ?? estimate.rod * 1000))}{" "}
            {t.kg}), {t.cost} = {formatCurrency(estimate.rodCost)}
          </b>
        </p>

        <p>
          <b>
            {t.brickNeeded} = {formatNumber(Math.round(estimate.brick))}{" "}
            {t.pieces}, {t.cost} = {formatCurrency(estimate.brickCost)}
          </b>
        </p>

        <p>
          <b>
            {t.cementNeeded} = {formatNumber(estimate.cement, 2)} {t.bags},{" "}
            {t.cost} = {formatCurrency(estimate.cementCost)}
          </b>
        </p>

        <p>
          <b>
            {t.sandNeeded} = {formatNumber(Math.round(estimate.sand))}{" "}
            {t.cft}, {t.cost} = {formatCurrency(estimate.sandCost)}
          </b>
        </p>

        {house.houseType === "tinshade" &&
          estimate.woodTin !== undefined && (
            <p>
              <b>
                {t.woodTin} = {formatCurrency(estimate.woodTin)}
              </b>
            </p>
          )}

        <p>
          <b>
            {t.labour} = {formatCurrency(estimate.labour)}
          </b>
        </p>

        <h3 className="estimate-subtotal">
          {t.materialTotal} = {formatCurrency(estimate.materialTotal)}
        </h3>

        <hr />

        <h2 className="estimate-section-title green">
          💼 {t.otherCost}
        </h2>

        <p>
          <b>
            {t.doorWindow} = {formatCurrency(estimate.door)}
          </b>
        </p>

        <p>
          <b>
            {t.electrical} = {formatCurrency(estimate.electrical)}
          </b>
        </p>

        <p>
          <b>
            {t.paint} = {formatCurrency(estimate.paint)}
          </b>
        </p>

        <p>
          <b>
            {t.hidden} = {formatCurrency(estimate.hidden)}
          </b>
        </p>

        <h3 className="estimate-subtotal">
          {t.otherTotal} = {formatCurrency(estimate.otherTotal)}
        </h3>

        <hr />

        <div className="grand-total-card">
          <div className="shine-effect" aria-hidden="true" />

          <div className="grand-total-title">
            💰 {t.grandTotal}
          </div>

          <div className="grand-total-price">
            {formatCurrency(estimate.grandTotal)}
          </div>
        </div>

        <p className="estimate-comment">📌 {t.comment}</p>
      </section>

      <div className="estimate-button-group">
        <button
          type="button"
          className="estimate-action-button"
          onClick={() => navigate(`/house/${house.id}`)}
        >
          <span className="estimate-action-icon" aria-hidden="true">
            🏠
          </span>
          <span className="estimate-action-label">
            {translations[language].view3d}
          </span>
        </button>

        <button
          type="button"
          className="estimate-action-button"
          onClick={() =>
            navigate(
              `/floorplan/${house.folder}/${house.complete}/${house.id}`
            )
          }
        >
          <span className="estimate-action-icon" aria-hidden="true">
            📐
          </span>
          <span className="estimate-action-label">
            {translations[language].view2d}
          </span>
        </button>
      </div>
    </main>
  </>
);
}

export default EstimatePage;