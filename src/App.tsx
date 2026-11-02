import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";

type Language = "bn" | "en" | "hi" | "ar" | "es";

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    return (
      (localStorage.getItem("language") as Language) ||
      "bn"
    );
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <AppRoutes
      language={language}
      setLanguage={setLanguage}
    />
  );
}

export default App;