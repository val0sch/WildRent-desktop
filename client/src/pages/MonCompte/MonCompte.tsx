import Login from "../../components/Login";
import useAuth from "../../hooks/useAuth";

import "../../style/moncompte.css";
import { useState } from "react";
import MesInfos from "./MesInfos";
import MesFactures from "./MesFactures";
import MesFavoris from "./MesFavoris";
import MesReservations from "./MesReservations";

function MonCompte(): JSX.Element {
  /////
  //  useEffect
  /////

  /////
  //  useState
  /////

  const [isBillComponent, setIsBillComponent] = useState(false);
  const [isProfileInfosComponent, setIsProfileInfosComponent] = useState(true);
  const [isReservationComponent, setIsReservationComponent] = useState(false);
  const [isFavorisComponent, setIsFavorisComponent] = useState(false);
  /////
  //  Code
  /////
  const { userInfos } = useAuth();

  console.log(userInfos);

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

  /////
  //  Return
  /////
  return (
    <div className="containerUserInfos">
      {Object.keys(userInfos).length > 0 ? (
        <>
          <div className="leftContainerUserInfos">
            <h1>Bienvenue</h1>
            <div className="linksUserInfos">
              <button
                className={`btn-moncompte ${
                  isProfileInfosComponent ? "active" : ""
                }`}
                onClick={() => handleClick("profil")}
              >
                Mes informations personnelles
              </button>
              <button
                className={`btn-moncompte ${
                  isReservationComponent ? "active" : ""
                }`}
                onClick={() => handleClick("reservations")}
              >
                Mes reservations
              </button>
              <button
                className={`btn-moncompte ${isBillComponent ? "active" : ""}`}
                onClick={() => handleClick("factures")}
              >
                Mes factures
              </button>
              <button
                className={`btn-moncompte ${
                  isFavorisComponent ? "active" : ""
                }`}
                onClick={() => handleClick("favoris")}
              >
                Mes favoris
              </button>
            </div>
          </div>
          <div className="rightContainerUserInfos">
            {isProfileInfosComponent && <MesInfos content={userInfos} />}
            {isReservationComponent && <MesReservations />}
            {isBillComponent && <MesFactures />}
            {isFavorisComponent && <MesFavoris />}
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default MonCompte;
