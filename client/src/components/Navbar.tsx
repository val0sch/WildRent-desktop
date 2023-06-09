import { Link, Outlet } from "react-router-dom";
import checkIsAdmin from "../Utils/utils";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Accueil(): JSX.Element {
  const user = useContext(AuthContext);

  const token = localStorage.getItem("token") as string;

  const isAdmin = checkIsAdmin(token);

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
