import { Link } from "react-router-dom";
import "../style/accueil.css";

function Users(): JSX.Element {
  return (
    <section className="home-container">
      <div className="home-main">
        <h2>
          Louez nos équipements d'exception,<br/> vivez l'aventure sportive à votre
          façon !
        </h2>
        {/* 🔽 requeter le nombre de sports 🔽 */}
        <h3>Plus de 50 sports disponibles !</h3>
        <div className="home-button-container">
          <button><Link to={"/categories"}>Parcourir les catégories</Link></button>
          <button className="navy"><Link to="/compte">Accéder à mon espace</Link></button>
        </div>
      </div>
    </section>
  );
}

export default Users;
