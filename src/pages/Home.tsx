import HomeLatestHouses from "../components/HomeLatestHouses";
import { memo } from "react";

import "./Home.css";

import Header from "../components/Header";
import HouseTypeGrid from "../components/HouseTypeGrid";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import { Helmet } from "react-helmet-async";

import translations from "../data/translations";

type HomeProps = {
  language: keyof typeof translations;
  setLanguage: React.Dispatch<
    React.SetStateAction<keyof typeof translations>
  >;
};

function Home({ language, setLanguage }: HomeProps) {
  const t = translations[language];

  const pageTitle =
  "House Design Platform | 3D House Designs, Floor Plans & Construction Cost";

const metaDescription =
  "Browse thousands of modern 3D house designs, 2D floor plans and accurate house construction cost estimates.";

const canonicalUrl =
  "https://housedgn.com";

const keywords =
  "house design, 3d house design, floor plan, house estimate, modern house, bangladesh house design";

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
      property="og:url"
      content={canonicalUrl}
    />

    <meta
      property="og:type"
      content="website"
    />

    <meta
      property="og:site_name"
      content="House Design Platform"
    />

    <meta
      name="twitter:card"
      content="summary_large_image"
    />

    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",

        "@type": "WebSite",

        name: "House Design Platform",

        url: canonicalUrl,

        description: metaDescription,

        potentialAction: {
          "@type": "SearchAction",
          target:
            "https://housedgn.com/search?q={search_term_string}",

          "query-input":
            "required name=search_term_string",
        },
      })}
    </script>

  </Helmet>

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

      <HomeLatestHouses language={language} />

      <footer className="home-footer">
        <Footer />
      </footer>
    </main>
</>
);
}

export default memo(Home);
