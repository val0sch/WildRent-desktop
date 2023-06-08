import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="footerLinks">
        <Link to={"/mentions-legales"}>Mentions Légales</Link>
        <Link to={"/contact"}>Contact</Link>
        <Link to={"/conditions-generales"}>Conditions Générales</Link>
      </div>
      <div className="credentials">@ Wild Code School</div>
    </footer>
  );
}
