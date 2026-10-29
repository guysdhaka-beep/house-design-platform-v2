import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 House Design & Cost. All Rights Reserved.</p>

      <div className="footer-links">
        <Link to="/privacy-policy">Privacy Policy</Link>
        <span>•</span>

        <Link to="/terms">Terms of Service</Link>
        <span>•</span>

        <Link to="/contact">Contact</Link>
      </div>

      <p className="footer-version">
        Version 1.0.0
      </p>
    </footer>
  );
}

export default Footer;