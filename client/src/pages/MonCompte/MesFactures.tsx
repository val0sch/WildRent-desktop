import { Link } from "react-router-dom";

function MesFactures(): JSX.Element {
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
      Mes Factures
      <div>
        <button>
          <Link to={"/MonCompte/"}>Retour</Link>
        </button>
      </div>
    </div>
  );
}

export default MesFactures;