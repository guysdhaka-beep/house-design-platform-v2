
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaWhatsapp } from "react-icons/fa";

import engineeringTranslations from "../data/engineeringTranslations";
import { getHouse } from "../data/houseCache";

import "../styles/engineering-services.css";

type Language = keyof typeof engineeringTranslations;

function EngineeringServicesPage() {
  const navigate = useNavigate();

  const { story, slug, id } = useParams();

  const [language, setLanguage] = useState<Language>(
  (localStorage.getItem("language") as Language) || "bn"
);

useEffect(() => {
  const handleStorage = () => {
    setLanguage(
      (localStorage.getItem("language") as Language) || "bn"
    );
  };

  window.addEventListener("storage", handleStorage);

  const interval = setInterval(() => {
    const current =
      (localStorage.getItem("language") as Language) || "bn";

    setLanguage((prev) =>
      prev !== current ? current : prev
    );
  }, 100);

  return () => {
    window.removeEventListener("storage", handleStorage);
    clearInterval(interval);
  };
}, []);

  const t =
    engineeringTranslations[language] ??
    engineeringTranslations.bn;

  const [house, setHouse] = useState<any>(null);

  useEffect(() => {
    let ignore = false;

    async function loadHouse() {
      if (!id) return;

      try {
        const data = await getHouse(Number(id));

        if (!ignore) {
          setHouse(data);
        }
      } catch (err) {
        console.error(err);
      }
    }

    loadHouse();

    return () => {
      ignore = true;
    };
  }, [id]);

  const whatsappNumber = "8801817408475";

  function openWhatsapp(
    type: "free" | "paid"
  ) {
    const pageUrl =
      window.location.origin +
      `/house/${story}/${slug}/${id}`;

    const message =
      type === "paid"
        ? `PAID CLIENT

Hello,

I need PAID Engineering Consultation.

House:
${pageUrl}

Service Required:

Project Details:
`
        : `FREE CLIENT

Hello,

I need FREE Engineering Support.

House:
${pageUrl}

Service Required:

My Question:
`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Engineering Services | House Design
          Platform
        </title>

        <meta
          name="description"
          content="Professional Architectural Design, Structural Design, Electrical Design, Plumbing Design, BOQ, Construction Cost Estimation and Engineering Consultancy."
        />

        <link
          rel="canonical"
          href={`https://housedgn.com/engineering-services/${story}/${slug}/${id}`}
        />
      </Helmet>

      <main className="engineering-page">
        <section className="engineering-hero">

          <h1 className="engineering-title">
            {t.engineeringServices}
          </h1>

          <p className="engineering-subtitle">
            {t.engineeringSubtitle}
          </p>
        </section>

        <section className="engineering-services">
          <div className="engineering-card">
            <span>🏠</span>
            <h3>{t.architecturalDesign}</h3>
          </div>

          <div className="engineering-card">
            <span>🏗</span>
            <h3>{t.structuralDesign}</h3>
          </div>

          <div className="engineering-card">
            <span>⚡</span>
            <h3>{t.electricalDesign}</h3>
          </div>

          <div className="engineering-card">
            <span>🚿</span>
            <h3>{t.plumbingDesign}</h3>
          </div>

          <div className="engineering-card">
            <span>💰</span>
            <h3>{t.costEstimation}</h3>
          </div>

          <div className="engineering-card">
            <span>📋</span>
            <h3>{t.boq}</h3>
          </div>

          <div className="engineering-card">
            <span>👷</span>
            <h3>{t.consultancy}</h3>
          </div>
        </section>

        <section className="engineering-support">
          <div className="support-box">
            <h2>{t.freeSupport}</h2>

            <p>
              {t.freeSupportDescription}
            </p>

            <button
  className="free-support-button"
  onClick={() =>
    openWhatsapp("free")
  }
>
  <FaWhatsapp />
  {t.freeWhatsappSupport}
</button>
          </div>

          <div className="support-box premium">
            <h2>{t.paidSupport}</h2>

            <p>
              {t.paidSupportDescription}
            </p>

            <button
  className="paid-support-button"
  onClick={() =>
    openWhatsapp("paid")
  }
>
  <FaWhatsapp />
  {t.paidWhatsappConsultation}
</button>
          </div>
        </section>

        <section className="engineering-navigation">
          <button
            className="engineering-nav-button"
            onClick={() =>
              navigate(
                `/house/${story}/${slug}/${id}`
              )
            }
          >
            🏠 {t.houseDetails}
          </button>

          {house && (
            <>
              <button
                className="engineering-nav-button"
                onClick={() =>
                  navigate(
                    `/floorplan/${house.folder}/${house.complete}/${house.id}`
                  )
                }
              >
                📐 {t.floorPlan}
              </button>

              <button
                className="engineering-nav-button"
                onClick={() =>
                  navigate(
                    `/estimate/${house.folder}/${house.complete}/${house.id}`
                  )
                }
              >
                💰 {t.estimate}
              </button>
            </>
          )}

          <button
            className="engineering-nav-button"
            onClick={() =>
              navigate(
                `/video/${story}/${slug}/${id}`
              )
            }
          >
            🎥 {t.houseVideo}
          </button>
        </section>

        <section className="engineering-faq">
          <h2>
            {t.faqTitle}
          </h2>

          <div className="faq-item">
            <h3>
              {t.faq1Question}
            </h3>

            <p>
              {t.faq1Answer}
            </p>
          </div>

          <div className="faq-item">
            <h3>
              {t.faq2Question}
            </h3>

            <p>
              {t.faq2Answer}
            </p>
          </div>

          <div className="faq-item">
            <h3>
              {t.faq3Question}
            </h3>

            <p>
              {t.faq3Answer}
            </p>
          </div>

          <div className="faq-item">
            <h3>
              {t.faq4Question}
            </h3>

            <p>
              {t.faq4Answer}
            </p>
          </div>

          <div className="faq-item">
            <h3>
              {t.faq5Question}
            </h3>

            <p>
              {t.faq5Answer}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default EngineeringServicesPage;
