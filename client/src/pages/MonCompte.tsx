import { Link } from "react-router-dom";
import Login from "../components/Login";
import useAuth from "../hooks/useAuth";

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
  const { userInfos } = useAuth();
  // console.log("userinfos : ", userInfos);
  // console.log("userinfos.email : ", userInfos.email);
  

  /////
  //  Return
  /////
  return (
    <div>
      {Object.keys(userInfos).length > 0 ? (
        <>
          <span>Mon Compte</span>
          <div>
            <Link to={"/compte/infos"}>Mes informations personnelles</Link>
            <Link to={"/compte/reservations"}>Mes réservations</Link>
            <Link to={"/compte/factures"}>Mes factures</Link>
            <Link to={"/compte/favoris"}>Mes favoris</Link>
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default MonCompte;
