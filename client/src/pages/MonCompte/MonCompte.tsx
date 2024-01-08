import { useState } from "react";
import useAuth from "../../hooks/useAuth";

import Login from "../../components/Login";
import MesInfos from "./MesInfos";
import MesFactures from "./MesFactures";
import MesFavoris from "./MesFavoris";
import MesReservations from "./MesReservations";

import "../../style/moncompte.css";
function MonCompte(): JSX.Element {
  const [isBillComponent, setIsBillComponent] = useState(false);
  const [isProfileInfosComponent, setIsProfileInfosComponent] = useState(true);
  const [isReservationComponent, setIsReservationComponent] = useState(false);
  const [isFavorisComponent, setIsFavorisComponent] = useState(false);

  const { userInfos } = useAuth();

  const handleClick = (component: string) => {
    switch (component) {
      case "profil":
        setIsBillComponent(false);
        setIsProfileInfosComponent(true);
        setIsReservationComponent(false);
        setIsFavorisComponent(false);
        break;
      case "factures":
        setIsBillComponent(true);
        setIsProfileInfosComponent(false);
        setIsReservationComponent(false);
        setIsFavorisComponent(false);
        break;
      case "reservations":
        setIsBillComponent(false);
        setIsProfileInfosComponent(false);
        setIsReservationComponent(true);
        setIsFavorisComponent(false);
        break;
      case "favoris":
        setIsBillComponent(false);
        setIsProfileInfosComponent(false);
        setIsReservationComponent(false);
        setIsFavorisComponent(true);
        break;
      default:
        setIsBillComponent(false);
        setIsProfileInfosComponent(true);
        setIsReservationComponent(false);
        setIsFavorisComponent(false);
        break;
    }
  };

  return (
    <>
      {Object.keys(userInfos).length > 0 ? (
        <div className="containerUserInfos">
          <div className="leftContainerUserInfos">
            <h1>Bienvenue</h1>
            <div className="linksUserInfos">
              <button
                className={`btn-moncompte ${
                  isProfileInfosComponent ? "active" : ""
                }`}
                onClick={() => handleClick("profil")}
              >
                Informations personnelles
              </button>
              <button
                className={`btn-moncompte ${
                  isReservationComponent ? "active" : ""
                }`}
                onClick={() => handleClick("reservations")}
              >
                Réservations
              </button>
              <button
                className={`btn-moncompte ${isBillComponent ? "active" : ""}`}
                onClick={() => handleClick("factures")}
              >
                Factures
              </button>
              <button
                className={`btn-moncompte ${
                  isFavorisComponent ? "active" : ""
                }`}
                onClick={() => handleClick("favoris")}
              >
                Favoris
              </button>
            </div>
          </div>
          <div className="rightContainerUserInfos">
            {isProfileInfosComponent && <MesInfos />}
            {isReservationComponent && <MesReservations />}
            {isBillComponent && <MesFactures />}
            {isFavorisComponent && <MesFavoris />}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default MonCompte;
