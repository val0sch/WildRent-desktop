import { Link } from "react-router-dom";

function MesInfos(): JSX.Element {
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
      Mes informations personnelles
      <div>
        <button>
          <Link to={"/MonCompte/"}>Retour</Link>
        </button>
      </div>
    </div>
  );
}

export default MesInfos;