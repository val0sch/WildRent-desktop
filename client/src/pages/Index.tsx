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
        <Link to={"/Inscription"}>S'inscrire</Link>
        <Link to={"/MonCompte/"}>Mon Compte</Link>
        <Link to={"/BackOffice/"}>BackOffice</Link>
        <Link to={"/Panier"}>Panier</Link>
      </nav>
      <Outlet />
      <footer>
        <div className='footerLinks'>
          <Link to={"/MentionsLegales"}>Mentions Légales</Link>
          <Link to={"/Contact"}>Contact</Link>
          <Link to={"/ConditionsGenerales"}>Conditions Générales</Link>
        </div>
        <div className='credentials'>@ Wild Code School</div>
      </footer>
    </div>
  );
}

export default Accueil;
