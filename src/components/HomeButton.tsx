import { useNavigate } from "react-router-dom";

function HomeButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      style={{
        marginTop: "20px",
        marginBottom: "20px",
        padding: "10px 18px",
        borderRadius: "10px",
        border: "1px solid #3b82f6",
        background: "#1f2937",
        color: "#fff",
        fontSize: "16px",
        cursor: "pointer",
      }}
    >
      🏠 Home
    </button>
  );
}

export default HomeButton;