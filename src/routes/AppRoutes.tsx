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

import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import AddHouse from "../pages/AddHouse";
import AdminHouseList from "../pages/AdminHouseList";
import EditHouse from "../pages/EditHouse";


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
      {/* Home */}
      <Route
        path="/"
        element={
          <Home
            language={language}
            setLanguage={setLanguage}
          />
        }
      />

      {/* House List */}
      <Route
        path="/houses/:type"
        element={<HouseListPage language={language} />}
      />

      {/* House Details */}
      <Route
        path="/house/:id"
        element={<HouseDetailsPage />}
      />

            {/* Floor Plan */}
      <Route
        path="/floorplan/:folder/:complete/:id"
        element={<FloorPlanPage />}
      />

      {/* Estimate */}
      <Route
        path="/estimate/:folder/:complete/:id"
        element={<EstimatePage language={language} />}
      />

      {/* Other Pages */}
      <Route
        path="/foundation"
        element={<FoundationPage />}
      />

      <Route
        path="/area"
        element={<AreaPage />}
      />

      <Route
        path="/privacy-policy"
        element={<PrivacyPolicyPage />}
      />

      <Route
        path="/terms"
        element={<TermsPage />}
      />

      <Route
        path="/contact"
        element={<ContactPage />}
      />

      {/* Admin */}
      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      <Route
        path="/admin/add-house"
        element={<AddHouse />}
      />

      {/* Admin House Management */}
<Route
  path="/admin/houses"
  element={<AdminHouseList />}
/>

<Route
  path="/admin/edit-house/:id"
  element={<EditHouse />}
/>


      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />
    </Routes>
  );
}

export default AppRoutes;