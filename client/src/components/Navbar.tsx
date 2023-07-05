import { Link, Outlet } from "react-router-dom";
import checkIsAdmin from "../Utils/utils";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Accueil(): JSX.Element {
  // A retravailler :
  const user = useContext(AuthContext);
  const token = localStorage.getItem("token") as string;
  const [isAdmin, setIsAdmin] = useState(checkIsAdmin(token));
  useEffect(() => {}, [isAdmin]);

  // ////////////
  // commentaire de David : créer un hook useCheckToken pour récupérer isAdmin depuis le back est la manière la plus sécurisée:
  // ex:  const role = useCheckToken();
  return (
    <div>
      <nav>
        <Link to={"/"}>Accueil</Link>
        {isAdmin && <Link to={"/back-office/"}>BackOffice</Link>}
        <Link to={"/compte/"}>Mon Compte</Link>
        <Link to={"/panier"}>Panier</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Accueil;
