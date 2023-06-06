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
        <Link to={"/inscription"}>S'inscrire</Link>
        <Link to={"/compte/"}>Mon Compte</Link>
        <Link to={"/back-office/"}>BackOffice</Link>
        <Link to={"/panier"}>Panier</Link>
      </nav>
      <Outlet />
      <footer>
        <div className='footerLinks'>
          <Link to={"/mentions-legales"}>Mentions Légales</Link>
          <Link to={"/contact"}>Contact</Link>
          <Link to={"/conditions-generales"}>Conditions Générales</Link>
        </div>
        <div className='credentials'>@ Wild Code School</div>
      </footer>
    </div>
  );
}

export default Accueil;
