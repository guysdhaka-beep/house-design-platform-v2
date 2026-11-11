import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import translations from "../data/translations";
import SearchBar from "./SearchBar";

import "./TopBar.css";

type Props = {
  language: "bn" | "en" | "hi" | "ar" | "es";
  onLanguageClick: () => void;
};

export default function TopBar({
  language,
  onLanguageClick,
}: Props) {
  const t = translations[language];

  const houseTypeText = {
    title:
      language === "bn"
        ? "বাড়ির ধরন"
        : language === "hi"
        ? "घर के प्रकार"
        : language === "ar"
        ? "أنواع المنازل"
        : language === "es"
        ? "Tipos de Casas"
        : "Browse House Types",

    type:
      language === "bn"
        ? "ধরন"
        : language === "hi"
        ? "प्रकार"
        : language === "ar"
        ? "النوع"
        : language === "es"
        ? "Tipo"
        : "Type",

    one:
      language === "bn"
        ? "১ তলা"
        : language === "hi"
        ? "1 मंज़िल"
        : language === "ar"
        ? "طابق واحد"
        : language === "es"
        ? "1 Piso"
        : "1 Story",

    two:
      language === "bn"
        ? "২ তলা"
        : language === "hi"
        ? "2 मंज़िल"
        : language === "ar"
        ? "طابقان"
        : language === "es"
        ? "2 Pisos"
        : "2 Story",

    three:
      language === "bn"
        ? "৩ তলা"
        : language === "hi"
        ? "3 मंज़िल"
        : language === "ar"
        ? "3 طوابق"
        : language === "es"
        ? "3 Pisos"
        : "3 Story",

    four:
      language === "bn"
        ? "৪ তলা"
        : language === "hi"
        ? "4 मंज़िल"
        : language === "ar"
        ? "4 طوابق"
        : language === "es"
        ? "4 Pisos"
        : "4 Story",

    duplex:
      language === "bn"
        ? "ডুপ্লেক্স"
        : language === "hi"
        ? "डुप्लेक्स"
        : language === "ar"
        ? "دوبلكس"
        : language === "es"
        ? "Dúplex"
        : "Duplex",

    luxury:
      language === "bn"
        ? "বিলাসবহুল"
        : language === "hi"
        ? "लक्ज़री"
        : language === "ar"
        ? "فاخر"
        : language === "es"
        ? "Lujo"
        : "Luxury",

    tin:
      language === "bn"
        ? "টিন শেড"
        : language === "hi"
        ? "टिन शेड"
        : language === "ar"
        ? "منزل صفيح"
        : language === "es"
        ? "Casa de Chapa"
        : "Tin Shade",
  };

  const [visible, setVisible] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showTypeMenu, setShowTypeMenu] = useState(false);

  useEffect(() => {
    let lastScroll = window.scrollY;

    function handleScroll() {
      const current = window.scrollY;

      if (current < 20) {
        setVisible(true);
      } else if (current > lastScroll) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScroll = current;
    }

    function closeMenus() {
      setShowTypeMenu(false);
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", closeMenus);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", closeMenus);
    };
  }, []);

  return (
    <header
      className={`topbar ${
        visible ? "topbar-show" : "topbar-hide"
      }`}
    >
      {!searchOpen ? (
        <>
          <Link to="/" className="topbar-home">
            ← {t.home || "Home"}
          </Link>

          <div
            className="topbar-type-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="topbar-type"
              onClick={() =>
                setShowTypeMenu(!showTypeMenu)
              }
            >
              <span className="topbar-type-icon">
                🏠
              </span>

              <span className="topbar-type-text">
                {houseTypeText.type}
              </span>

              <span className="topbar-type-arrow">
                ▼
              </span>
            </button>

            {showTypeMenu && (
              <div className="topbar-type-menu">
                <div className="topbar-type-title">
                  {houseTypeText.title}
                </div>

                <Link
                  to="/houses/1-story"
                  onClick={() =>
                    setShowTypeMenu(false)
                  }
                >
                  🏡 {houseTypeText.one}
                </Link>

                <Link
                  to="/houses/2-story"
                  onClick={() =>
                    setShowTypeMenu(false)
                  }
                >
                  🏢 {houseTypeText.two}
                </Link>

                <Link
                  to="/houses/3-story"
                  onClick={() =>
                    setShowTypeMenu(false)
                  }
                >
                  🏘 {houseTypeText.three}
                </Link>

                <Link
                  to="/houses/4-story"
                  onClick={() =>
                    setShowTypeMenu(false)
                  }
                >
                  🏛 {houseTypeText.four}
                </Link>

                <Link
                  to="/houses/duplex"
                  onClick={() =>
                    setShowTypeMenu(false)
                  }
                >
                  🏡 {houseTypeText.duplex}
                </Link>

                <Link
                  to="/houses/luxury"
                  onClick={() =>
                    setShowTypeMenu(false)
                  }
                >
                  🏰 {houseTypeText.luxury}
                </Link>

                <Link
                  to="/houses/tin-shade"
                  onClick={() =>
                    setShowTypeMenu(false)
                  }
                >
                  🛖 {houseTypeText.tin}
                </Link>
              </div>
            )}
          </div>

          <div className="topbar-search-desktop">
            <div className="topbar-search">
              <SearchBar
                language={language}
                compact
              />
            </div>
          </div>
                    <button
            className="topbar-search-mobile"
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            🔍
          </button>

          <button
            className="topbar-language"
            type="button"
            onClick={onLanguageClick}
            aria-label="Language"
            title="Language"
          >
            <span className="language-icon">
              🌐
            </span>

            <span className="language-text">
              English
            </span>

            <span className="language-arrow">
              ▼
            </span>
          </button>
        </>
      ) : (
        <>
          <div className="topbar-search-open">
            <div className="topbar-search">
              <SearchBar
                language={language}
                compact
              />
            </div>
          </div>

          <button
            className="topbar-close"
            type="button"
            onClick={() =>
              setSearchOpen(false)
            }
          >
            ✕
          </button>
        </>
      )}
    </header>
  );
}