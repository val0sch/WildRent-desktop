import { Link } from "react-router-dom";

function NotFound(): JSX.Element {
  return (
    <section className="page-404-container">
      <div className="page-404-div">
        <p>404</p>
        <span>Oops !</span>
        <span>Cette page n'existe pas.</span>
        <Link to="/">Retour vers l'accueil</Link>
      </div>
    </section>
  );
}

export default NotFound;