import { Link, Outlet } from 'react-router-dom';
import checkIsAdmin from '../Utils/utils';

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

const token = localStorage.getItem('token') as string;
console.log("token : ",token);
const isAdmin = checkIsAdmin(token);
console.log("isAdmin : ",isAdmin);

/////
//  Return
/////
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
