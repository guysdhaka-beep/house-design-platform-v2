import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import translations from "../data/translations";

// Lazy Pages
const Home = lazy(() => import("../pages/Home"));
const FoundationPage = lazy(() => import("../pages/FoundationPage"));
const AreaPage = lazy(() => import("../pages/AreaPage"));
const EstimatePage = lazy(() => import("../pages/EstimatePage"));
const HouseListPage = lazy(() => import("../pages/HouseListPage"));
const HouseDetailsPage = lazy(() => import("../pages/HouseDetailsPage"));
const FloorPlanPage = lazy(() => import("../pages/FloorPlanPage"));
const PrivacyPolicyPage = lazy(() => import("../pages/PrivacyPolicyPage"));
const TermsPage = lazy(() => import("../pages/TermsPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));

// Admin
const AdminLogin = lazy(() => import("../pages/AdminLogin"));
const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));
const AddHouse = lazy(() => import("../pages/AddHouse"));
const AdminHouseList = lazy(() => import("../pages/AdminHouseList"));
const EditHouse = lazy(() => import("../pages/EditHouse"));

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
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontSize: "22px",
            background: "#111",
          }}
        >
          Loading...
        </div>
      }
    >
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
          element={<HouseListPage language={language} />}
        />

        <Route
  path="/house/:story/:slug/:id"
  element={<HouseDetailsPage />}
/>

        <Route
          path="/floorplan/:folder/:complete/:id"
          element={<FloorPlanPage />}
        />

        <Route
          path="/estimate/:folder/:complete/:id"
          element={<EstimatePage language={language} />}
        />

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

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/add-house"
          element={<AddHouse />}
        />

        <Route
          path="/admin/houses"
          element={<AdminHouseList />}
        />

        <Route
          path="/admin/edit-house/:id"
          element={<EditHouse />}
        />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;