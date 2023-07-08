import { Link } from "react-router-dom";
import CardSport from "../components/accueil/CardSport";

import "../style/accueil.css";

function Users(): JSX.Element {
  const sportList = [
    {
      id: 1,
      name: "Tennis",
      imageUrl:
        "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
    },
    {
      id: 2,
      name: "Golf",
      imageUrl:
        "https://images.pexels.com/photos/274133/pexels-photo-274133.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 3,
      name: "Randonnée",
      imageUrl:
        "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 4,
      name: "Canoë",
      imageUrl:
        "https://images.pexels.com/photos/1497587/pexels-photo-1497587.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 5,
      name: "Ski",
      imageUrl:
        "https://images.pexels.com/photos/848618/pexels-photo-848618.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 6,
      name: "Surf",
      imageUrl:
        "https://images.pexels.com/photos/1654498/pexels-photo-1654498.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];
  return (
    <section className="home-container">
      <div className="home-main">
        <h2>
          Louez nos équipements d'exception,
          <br /> vivez l'aventure sportive à votre façon !
        </h2>
        {/* 🔽 requeter le nombre de sports 🔽 */}
        <div className="home-button-container">
          <button>
            <Link to={"/categories"}>Parcourir les catégories</Link>
          </button>
          <button className="navy">
            <Link to="/compte">Accéder à mon espace</Link>
          </button>
        </div>
        <h3>Plus de 50 sports disponibles !</h3>
        <div className="home-sport-cards-container">
          {sportList.map((sportList) => {
            return <CardSport key={sportList.id} {...sportList} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default Users;
