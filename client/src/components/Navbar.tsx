import { Link, Outlet } from "react-router-dom";
import { CHECK_ISADMIN } from "../graphql/auth.query";
import { useQuery } from "@apollo/client";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

export default function Accueil(): JSX.Element {
  const { data, refetch } = useQuery(CHECK_ISADMIN);
  const { userInfos, logout } = useAuth();

  useEffect(() => {
    refetch();
  }, [userInfos, refetch]);

  return (
    <div>
      <nav>
        <Link to={"/"}>Accueil</Link>
        {data?.checkAdmin && <Link to={"/back-office/"}>BackOffice</Link>}
        <Link to={"/compte/"}>Mon Compte</Link>
        <Link to={"/panier"}>Panier</Link>
        {userInfos?.email && <button onClick={logout}>Se deconnecter</button>}
      </nav>
      <Outlet />
    </div>
  );
}
