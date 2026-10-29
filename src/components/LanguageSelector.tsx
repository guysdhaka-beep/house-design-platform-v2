import translations from "../data/translations";

type LanguageSelectorProps = {
  language: keyof typeof translations;
  setLanguage: React.Dispatch<
    React.SetStateAction<keyof typeof translations>
  >;
};

function LanguageSelector({
  language,
  setLanguage,
}: LanguageSelectorProps) {
  function changeLanguage(lang: keyof typeof translations) {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  }

  const buttonStyle = (lang: keyof typeof translations) => ({
    minWidth: "90px",
    padding: "10px 16px",
    borderRadius: "10px",
    border:
      language === lang
        ? "2px solid #3b82f6"
        : "1px solid #555",
    background:
      language === lang
        ? "linear-gradient(135deg,#3b82f6,#2563eb)"
        : "#2b2b2b",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all .25s ease",
    boxShadow:
      language === lang
        ? "0 6px 15px rgba(37,99,235,.35)"
        : "none",
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "10px",
        marginTop: "15px",
      }}
    >
      <button
        style={buttonStyle("bn")}
        onClick={() => changeLanguage("bn")}
      >
        বাংলা
      </button>

      <button
        style={buttonStyle("en")}
        onClick={() => changeLanguage("en")}
      >
        English
      </button>

      <button
        style={buttonStyle("hi")}
        onClick={() => changeLanguage("hi")}
      >
        हिन्दी
      </button>

      <button
        style={buttonStyle("ar")}
        onClick={() => changeLanguage("ar")}
      >
        العربية
      </button>

      <button
        style={buttonStyle("es")}
        onClick={() => changeLanguage("es")}
      >
        Español
      </button>
    </div>
  );
}

export default LanguageSelector;