import { memo } from "react";

import Header from "../components/Header";
import HouseTypeGrid from "../components/HouseTypeGrid";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

import translations from "../data/translations";

type HomeProps = {
  language: keyof typeof translations;
  setLanguage: React.Dispatch<
    React.SetStateAction<keyof typeof translations>
  >;
};

function Home({
  language,
  setLanguage,
}: HomeProps) {
  const t = translations[language];

  return (
    <main
      style={{
        fontFamily: "Arial, sans-serif",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px",
        boxSizing: "border-box",
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header
        language={language}
        setLanguage={setLanguage}
      />

      <hr className="header-line" />

      <SearchBar language={language} />

      <h2
        style={{
          marginTop: "15px",
          marginBottom: "35px",
        }}
      >
        {t.question}
      </h2>

      <HouseTypeGrid language={language} />

      <footer style={{ marginTop: "60px" }}>
        <Footer />
      </footer>
    </main>
  );
}

export default memo(Home);