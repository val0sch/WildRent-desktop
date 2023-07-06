import { Link } from "react-router-dom";

import "../style/footer.css"

export default function Footer() {
  return (
    <footer>
      <p className="footer-wildrent">WILDRENT</p>
      <div className="footer-links">
        <Link to={"/mentions-legales"}>Mentions Légales</Link>
        <Link to={"/contact"}>Contact</Link>
        <Link to={"/conditions-generales"}>Conditions Générales</Link>
      </div>
      <p className="credentials">@ Wild Code School</p>
    </footer>
  );
}
