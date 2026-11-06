import LanguageSelector from "./LanguageSelector";
import translations from "../data/translations";
import AnimatedLogo from "./AnimatedLogo";


type HeaderProps = {
  language: keyof typeof translations;
 setLanguage: React.Dispatch<
  React.SetStateAction<keyof typeof translations>
>;
};

function Header({ language, setLanguage }: HeaderProps) {
  

  return (
    <>
      <div
  style={{
    display: "flex",
    flexDirection: "column", // Logo উপরে, Title নিচে
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  }}
>
  <AnimatedLogo />

  <h1 className="header-title">
  House Design & Cost
</h1>



<hr className="header-line-reverse" />

<h2>Select Language</h2>
</div>

    

      <LanguageSelector
        language={language}
        setLanguage={setLanguage}
      />
    </>
  );
}

export default Header;