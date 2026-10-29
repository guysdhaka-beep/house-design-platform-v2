import Header from "../components/Header";
import HouseTypeGrid from "../components/HouseTypeGrid";
import Footer from "../components/Footer";
import translations from "../data/translations";
import SearchBar from "../components/SearchBar";

type HomeProps = {
  language: keyof typeof translations;
  setLanguage: React.Dispatch<
    React.SetStateAction<keyof typeof translations>
  >;
};

function Home({ language, setLanguage }: HomeProps) {
  const t = translations[language];

  return (
    <div
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

      <SearchBar />

<h2
  style={{
    marginTop: "15px",
    marginBottom: "35px",
  }}
>
  {t.question}
</h2>


      <HouseTypeGrid language={language} />

      {/* Footer */}
      <div style={{ marginTop: "60px" }}>
        <Footer />
      </div>
    </div>
  );
}

export default Home;