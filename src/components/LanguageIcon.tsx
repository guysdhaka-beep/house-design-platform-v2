export default function LanguageIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 64 64"
      fill="none"
    >
      {/* Back Box */}
      <rect
        x="28"
        y="28"
        width="26"
        height="26"
        rx="3"
        fill="#ffffff"
        stroke="#3b82f6"
        strokeWidth="3"
      />

      {/* Front Box */}
      <rect
        x="10"
        y="10"
        width="28"
        height="28"
        rx="3"
        fill="#2563eb"
      />

      {/* A */}
      <text
        x="24"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fontFamily="Arial"
        fill="#ffffff"
      >
        A
      </text>

      {/* 文 */}
      <text
        x="41"
        y="48"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fontFamily="Arial"
        fill="#2563eb"
      >
        文
      </text>
    </svg>
  );
}