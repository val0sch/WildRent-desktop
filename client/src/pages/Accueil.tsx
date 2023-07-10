import { Link } from "react-router-dom";
import CardSport from "../components/accueil/CardSport";

import "../style/accueil.css";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { LIST_CATEGORIES } from "../graphql/listCategories.query";

function Users(): JSX.Element {

  const [categoriesList, setCategoriesList] = useState([]);

  const [getList, { data }] = useLazyQuery(LIST_CATEGORIES, {
    onCompleted(data) {
      console.log("list categories", data.categories);
      setCategoriesList(data.categories)
    },
    onError(error) {
      console.error(error);
    },
  });  

  useEffect(() => {
    getList();
  }, []);

  return (
    <section className="home-container">
      <div className="home-main">
        <h2>
          Louez nos équipements d'exception,
          <br /> vivez l'aventure sportive à votre façon !
        </h2>
        <div className="home-button-container">
          <button>
            <Link to={"/categories"}>Parcourir les catégories</Link>
          </button>
          <button className="navy">
            <Link to="/compte">Accéder à mon espace</Link>
          </button>
        </div>
        <h3>Plus de {categoriesList.length} sports disponibles !</h3>
        <div className="home-sport-cards-container">
          {categoriesList.map((categories:any) => {
            return <CardSport key={categories.id} {...categories} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default Users;
