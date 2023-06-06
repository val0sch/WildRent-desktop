import { Link } from "react-router-dom";

function BackOffice(): JSX.Element {
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
      Back Office
      <div>
        <Link to={"/BackOffice/Categories"}>Catégories</Link>
        <Link to={"/BackOffice/Produits"}>Produits</Link>
      </div>
    </div>
  );
}

export default BackOffice;