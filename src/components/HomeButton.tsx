
import { useNavigate } from "react-router-dom";

import "../styles/home-button.css";

function HomeButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="home-button"
      onClick={() => navigate("/")}
      aria-label="Go to Home Page"
    >
      <span aria-hidden="true">🏠</span>
      <span>Home</span>
    </button>
  );
}

export default HomeButton;
