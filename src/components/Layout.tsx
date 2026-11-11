import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

import TopBar from "./TopBar";

type Language =
  | "bn"
  | "en"
  | "hi"
  | "ar"
  | "es";

type LayoutProps = {
  language: Language;
  setLanguage: React.Dispatch<
    React.SetStateAction<Language>
  >;
};

function Layout({
  language,
  setLanguage,
}: LayoutProps) {
  const location = useLocation();

  const [
    showLanguageSelector,
    setShowLanguageSelector,
  ] = useState(false);

  // Home page ছাড়া সব page-এ TopBar
  const showTopBar =
    location.pathname !== "/";

  function changeLanguage(
    lang: Language
  ) {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    setShowLanguageSelector(false);
  }

  return (
    <>
      {showTopBar && (
        <TopBar
          language={language}
          onLanguageClick={() =>
            setShowLanguageSelector(
              (prev) => !prev
            )
          }
        />
      )}

      {showLanguageSelector && (
        <>
          <div
            className="language-overlay"
            onClick={() =>
              setShowLanguageSelector(false)
            }
          />

          <div
            className="language-popup"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              onClick={() =>
                changeLanguage("bn")
              }
            >
              বাংলা
              {language === "bn"
                ? " ✓"
                : ""}
            </button>

            <button
              onClick={() =>
                changeLanguage("en")
              }
            >
              English
              {language === "en"
                ? " ✓"
                : ""}
            </button>

            <button
              onClick={() =>
                changeLanguage("hi")
              }
            >
              हिन्दी
              {language === "hi"
                ? " ✓"
                : ""}
            </button>

            <button
              onClick={() =>
                changeLanguage("ar")
              }
            >
              العربية
              {language === "ar"
                ? " ✓"
                : ""}
            </button>

            <button
              onClick={() =>
                changeLanguage("es")
              }
            >
              Español
              {language === "es"
                ? " ✓"
                : ""}
            </button>
          </div>
        </>
      )}

      <Outlet />
    </>
  );
}

export default Layout;