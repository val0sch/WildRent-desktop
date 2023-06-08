import { Link, Outlet } from 'react-router-dom';

function Accueil(): JSX.Element {
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
      <nav>
        <Link to={"/"}>Accueil</Link>
        <Link to={"/back-office/"}>BackOffice</Link>
        <Link to={"/compte/"}>Mon Compte</Link>
        <Link to={"/panier"}>Panier</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Accueil;
