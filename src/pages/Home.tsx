
import { memo } from "react";

import "./Home.css";

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

function Home({ language, setLanguage }: HomeProps) {
  const t = translations[language];

  return (
    <main className="home-container">
      <Header
  language={language}
  setLanguage={setLanguage}
/>

<hr className="header-line-reverse" />


<SearchBar language={language} />

      <h2 className="home-question">
        {t.question}
      </h2>

      <HouseTypeGrid language={language} />

      <footer className="home-footer">
        <Footer />
      </footer>
    </main>
  );
}

export default memo(Home);
