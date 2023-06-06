import { Link } from "react-router-dom";

function MonCompte(): JSX.Element {
/////
//  useEffect
/////

/////
//  useState
/////

/////
//  Code
/////

/////
//  Return
/////
  return (
    <div>
      Mon Compte
      <div>
        <Link to={"/MonCompte/MesInfos"}>Mes informations personnelles</Link>
        <Link to={"/MonCompte/MesReservations"}>Mes réservations</Link>
        <Link to={"/MonCompte/MesFactures"}>Mes factures</Link>
        <Link to={"/MonCompte/MesFavoris"}>Mes favoris</Link>
      </div>
    </div>
  );
}

export default MonCompte;