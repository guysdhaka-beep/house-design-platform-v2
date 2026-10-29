import { useNavigate, useParams } from "react-router-dom";
import translations from "../data/translations";
import { houses } from "../data/houses";
import { calculateEstimate } from "../data/calculateEstimate";
import { currency } from "../data/currency";
import HomeButton from "../components/HomeButton";
import "../styles/house-details.css";

type Language = keyof typeof translations;

const estimateTranslations: Record<
  Language,
  {
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
  }
> = {
  bn: {
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
  },

  en: {
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
    otherCost: "Other Cost",
    doorWindow: "Doors + Windows",
    electrical: "Electrical + Plumbing",
    paint: "Paint + Tiles",
    hidden: "Miscellaneous Cost",
    otherTotal: "Total Other Cost",
    grandTotal: "Grand Total",
    comment:
      "What kind of house do you want to build? What is your budget? Leave your requirements in the comments...",
    cost: "Cost",
    ton: "Ton",
    kg: "KG",
    pieces: "pieces",
    bags: "bags",
    cft: "CFT",
    houseNotFound: "House Not Found",
  },

  hi: {
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
  },

  ar: {
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
  },

  es: {
    houseCost: "Vea el costo de esta casa 👇",
    luxuryHouseCost: "Vea el costo de esta casa de lujo 👇",
    tinshadeHouseCost: "Vea el costo de esta casa con techo metálico 👇",
    feet: "pies",
    totalFloorArea: "Área total de los pisos",
    foundationInfo: (foundation, floor) =>
      `(Cimentación para ${foundation} plantas para calcular el costo de ${floor} plantas)`,
    materials: "Materiales",
    rodNeeded: "Acero necesario",
    brickNeeded: "Ladrillos necesarios",
    cementNeeded: "Cemento necesario",
    sandNeeded: "Arena necesaria",
    labour: "Mano de obra",
    woodTin: "Madera + metal",
    materialTotal: "Total de materiales + mano de obra",
    otherCost: "Otros costos",
    doorWindow: "Puertas + ventanas",
    electrical: "Electricidad + fontanería",
    paint: "Pintura + azulejos",
    hidden: "Costos diversos",
    otherTotal: "Total de otros costos",
    grandTotal: "Costo total",
    comment:
      "¿Qué tipo de casa quiere construir? ¿Cuál es su presupuesto? Escriba sus requisitos en los comentarios...",
    cost: "Costo",
    ton: "toneladas",
    kg: "kg",
    pieces: "piezas",
    bags: "sacos",
    cft: "CFT",
    houseNotFound: "Casa no encontrada",
  },
};

const localeByLanguage: Record<Language, string> = {
  bn: "bn-BD",
  en: "en-US",
  hi: "hi-IN",
  ar: "ar-SA",
  es: "es-ES",
};

type EstimatePageProps = {
  language: keyof typeof translations;
};

function EstimatePage({
  language,
}: EstimatePageProps) {

  const navigate = useNavigate();
  const { folder, id } = useParams();

 console.log("Language =", language);

  const t = estimateTranslations[language];
  const currentCurrency = currency[language];

  const house = houses.find(
    (h) => h.id === Number(id) && h.folder === folder
  );

  if (!house) {
    return <h2>{t.houseNotFound}</h2>;
  }

  const estimate = calculateEstimate(
    house.length,
    house.width,
    house.foundation,
    house.floor,
    house.type
  );

  const area = estimate.area;
  const totalArea = area * house.floor;

  const formatNumber = (
    value: number,
    maximumFractionDigits = 0
  ): string =>
    new Intl.NumberFormat(localeByLanguage[language], {
      maximumFractionDigits,
    }).format(value);

  const formatCurrency = (bdtAmount: number): string => {
    const convertedAmount = bdtAmount / currentCurrency.rate;

    const formattedAmount = new Intl.NumberFormat(
      localeByLanguage[language],
      {
        maximumFractionDigits: 0,
      }
    ).format(convertedAmount);

    if (language === "bn") {
      return `${formattedAmount} ${currentCurrency.name}`;
    }

    return `${currentCurrency.symbol}${formattedAmount}`;
  };

  const getHouseCostText = (): string => {
    if (house.type === "luxury") {
      return t.luxuryHouseCost;
    }

    if (house.type === "tinshade") {
      return t.tinshadeHouseCost;
    }

    return t.houseCost;
  };

  const floorLabel =
    language === "bn"
      ? "তলা"
      : language === "hi"
      ? "मंज़िल"
      : language === "ar"
      ? "طابق"
      : language === "es"
      ? "planta"
      : "floor";

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
<div style={{ textAlign: "left", marginBottom: "20px" }}>
  <HomeButton />
</div>

      <h1 style={{ textAlign: "center" }}>
        💰 {translations[language].estimate}
      </h1>

      <div
  style={{
  marginTop: "35px",
  background: "linear-gradient(180deg,#263244,#1f2937)",
  border: "2px solid #d4af37",
  borderRadius: "18px",
  padding: "30px",

  boxShadow:
    "0 18px 45px rgba(0,0,0,.60), 0 0 12px rgba(212,175,55,.35)",

  transform: "perspective(1200px) rotateX(2deg)",

  transition: "all .35s ease",

  fontSize: "20px",
  lineHeight: "2",
  color: "#e5e7eb",
}}
>
        <p>🏠 {getHouseCostText()}</p>

        <p>
          <b>
            {house.length} × {house.width} {t.feet} = {formatNumber(area)} SFT
          </b>
        </p>

        <p>
          <b>
            {house.floor} {floorLabel} = {formatNumber(totalArea)} SFT{" "}
            {t.totalFloorArea}
          </b>
        </p>

        {house.type !== "tinshade" && (
          <p>
            <b>{t.foundationInfo(house.foundation, house.floor)}</b>
          </p>
        )}

        <h2
  style={{
    display: "inline-block",
    background: "#2563eb",
    color: "#fff",
    padding: "10px 24px",
    borderRadius: "30px",
    margin: "20px 0",
    fontSize: "26px",
    fontWeight: "700",
  }}
>
  🧱 {t.materials}
</h2>

        <p>
          <b>
            {t.rodNeeded} = {estimate.rod.toFixed(2)} {t.ton} (
            {formatNumber(Math.round(estimate.rod * 1000))} {t.kg}), {t.cost} ={" "}
            {formatCurrency(estimate.rodCost)}
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
            {t.cementNeeded} = {estimate.cement.toFixed(2)} {t.bags},{" "}
            {t.cost} = {formatCurrency(estimate.cementCost)}
          </b>
        </p>

        <p>
          <b>
            {t.sandNeeded} = {formatNumber(Math.round(estimate.sand))} {t.cft},{" "}
            {t.cost} = {formatCurrency(estimate.sandCost)}
          </b>
        </p>

        {house.type === "tinshade" && estimate.woodTin !== undefined && (
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

        <h3>
          {t.materialTotal} = {formatCurrency(estimate.materialTotal)}
        </h3>

        <hr />

        <h2
  style={{
    display: "inline-block",
    background: "#16a34a",
    color: "#fff",
    padding: "10px 24px",
    borderRadius: "30px",
    margin: "20px 0",
    fontSize: "26px",
    fontWeight: "700",
  }}
>
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

        <h3>
          {t.otherTotal} = {formatCurrency(estimate.otherTotal)}
        </h3>

        <hr />

<div
  style={{
    marginTop: "25px",
    padding: "24px",
    borderRadius: "18px",
    background: "linear-gradient(135deg,#16a34a,#22c55e)",
    color: "#fff",
    border: "2px solid rgba(255,255,255,.18)",
    boxShadow:
      "0 18px 45px rgba(0,0,0,.45), inset 0 2px 2px rgba(255,255,255,.18)",
    overflow: "hidden",
    position: "relative",
  }}
>

  {/* Animated Shine */}
  <div className="shine-effect" />

  <div
    style={{
      position: "relative",
      zIndex: 2,
      fontSize: "22px",
      fontWeight: "700",
      marginBottom: "12px",
      textShadow: "0 2px 8px rgba(0,0,0,.35)",
    }}
  >
    💰 {t.grandTotal}
  </div>

  <div
    style={{
      position: "relative",
      zIndex: 2,
      fontSize: "42px",
      fontWeight: "900",
      lineHeight: "1.2",
      textShadow: "0 3px 10px rgba(0,0,0,.45)",
    }}
  >
    {formatCurrency(estimate.grandTotal)}
  </div>

</div>

<p
  style={{
    marginTop: "25px",
    fontSize: "18px",
    color: "#d1d5db",
  }}
>
  📌 {t.comment}
</p>
      </div>

      <div
        className="button-group"
        style={{
          marginTop: "40px",
          textAlign: "center",
        }}
      >
        <button
  onClick={() => navigate(`/house/${id}`)}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "#1d4ed8";
    e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
    e.currentTarget.style.boxShadow = "0 10px 25px rgba(37,99,235,.45)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "#2563eb";
    e.currentTarget.style.transform = "translateY(0) scale(1)";
    e.currentTarget.style.boxShadow = "none";
  }}
  style={{
    padding: "14px 30px",
    borderRadius: "12px",
    border: "1px solid #3b82f6",
    background: "#2563eb",
    color: "#fff",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all .25s ease",
  }}
>
  🏠 {translations[language].view3d}
</button>

        <button
  onClick={() => navigate(`/floorplan/${folder}/${id}`)}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "#1d4ed8";
    e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
    e.currentTarget.style.boxShadow = "0 10px 25px rgba(37,99,235,.45)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "#2563eb";
    e.currentTarget.style.transform = "translateY(0) scale(1)";
    e.currentTarget.style.boxShadow = "none";
  }}
  style={{
    padding: "14px 30px",
    borderRadius: "12px",
    border: "1px solid #3b82f6",
    background: "#2563eb",
    color: "#fff",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all .25s ease",
  }}
>
  📐 {translations[language].view2d}
</button>
      </div>
    </div>
  );
}

export default EstimatePage;