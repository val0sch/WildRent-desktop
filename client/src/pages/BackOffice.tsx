import { Link } from "react-router-dom";
import "../style/backoffice.css";
import Plongeur from "../assets/back-office.jpeg";
import { DribbbleLogo, Football } from "@phosphor-icons/react";

function BackOffice(): JSX.Element {
  
  return (
    <section className="back-office-main-container">
      <div className="back-office-img-container">
        <img src={Plongeur} alt="wildrent - plongeur" />
      </div>

      <div className="back-office-actions-container">
        <h3>Back Office</h3>
        <div className="back-office-actions">
          <Link
            className="back-office-button-action"
            to={"/back-office/categories"}
          >
            <Football size={32} />
            Catégories
          </Link>
          <Link
            className="back-office-button-action"
            to={"/back-office/produits"}
          >
            <DribbbleLogo size={32} />
            Produits
          </Link>
          <Link
            className="back-office-button-action"
            to={"/back-office/messagerie"}
          >
            Messagerie
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BackOffice;
