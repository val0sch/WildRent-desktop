import { Link } from "react-router-dom";
import CardSport from "../components/accueil/CardSport";

import "../style/accueil.css";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { LIST_CATEGORIES } from "../graphql/listCategories.query";
import io from "socket.io-client";

function Users(): JSX.Element {
  const [categoriesList, setCategoriesList] = useState([]);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [getList, { data }] = useLazyQuery(LIST_CATEGORIES, {
    onCompleted(data) {
      console.log("list categories", data.categories);
      setCategoriesList(data.categories);
    },
    onError(error) {
      console.error(error);
    },
  });

  useEffect(() => {
    getList();
  }, []);

  const socket = io("http://localhost:3001");
  console.log(socket);

  const sendMessage = () => {
    socket.emit("send_message", { message });
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

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
          {categoriesList.map((categories: any) => {
            return <CardSport key={categories.id} {...categories} />;
          })}
        </div>
        <div>
          <input
            type="text"
            placeholder="Message..."
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          <button onClick={sendMessage}>Envoyer</button>
          <h1>Message : {messageReceived}</h1>
        </div>
      </div>
    </section>
  );
}

export default Users;
