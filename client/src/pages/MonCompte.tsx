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
        <Link to={"/compte/infos"}>Mes informations personnelles</Link>
        <Link to={"/compte/reservations"}>Mes réservations</Link>
        <Link to={"/compte/factures"}>Mes factures</Link>
        <Link to={"/compte/favoris"}>Mes favoris</Link>
      </div>
    </div>
  );
}

export default MonCompte;