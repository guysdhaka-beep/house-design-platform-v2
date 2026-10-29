import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [language, setLanguage] =
    useState<"bn" | "en" | "hi" | "ar" | "es">("bn");

  return (
    <AppRoutes
      language={language}
      setLanguage={setLanguage}
    />
  );
}

export default App;