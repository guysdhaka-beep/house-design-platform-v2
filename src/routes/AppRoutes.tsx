import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import FoundationPage from "../pages/FoundationPage";
import AreaPage from "../pages/AreaPage";
import EstimatePage from "../pages/EstimatePage";
import translations from "../data/translations";
import HouseListPage from "../pages/HouseListPage";
import HouseDetailsPage from "../pages/HouseDetailsPage";
import FloorPlanPage from "../pages/FloorPlanPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import TermsPage from "../pages/TermsPage";
import ContactPage from "../pages/ContactPage";


type AppRoutesProps = {
  language: keyof typeof translations;
 setLanguage: React.Dispatch<
  React.SetStateAction<"bn" | "en" | "hi" | "ar" | "es">
>;
};

function AppRoutes({
  language,
  setLanguage,
}: AppRoutesProps) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            language={language}
            setLanguage={setLanguage}
          />
        }
      />

      <Route
  path="/houses/:type"
  element={
    <HouseListPage
      language={language}
    />
  }
/>

<Route
  path="/house/:id"
  element={<HouseDetailsPage />}
/>

<Route path="/terms" element={<TermsPage />} />

<Route
    path="/privacy-policy"
    element={<PrivacyPolicyPage />}
/>

<Route path="/contact" element={<ContactPage />} />

<Route
  path="/floorplan/:folder/:id"
  element={<FloorPlanPage />}
/>
<Route
  path="/estimate/:folder/:id"
  element={
    <EstimatePage
      language={language}
    />
  }
/>
      <Route path="/foundation" element={<FoundationPage />} />
      <Route path="/area" element={<AreaPage />} />

      <Route
  path="/estimate"
  element={
    <EstimatePage
      language={language}
    />
  }
/>
    </Routes>
  );
}

export default AppRoutes;