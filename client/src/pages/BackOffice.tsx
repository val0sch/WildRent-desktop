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
        <Link to={"/back-office/categories"}>Catégories</Link>
        <Link to={"/back-office/produits"}>Produits</Link>
        <Link to={"/back-office/messagerie"}>Messagerie</Link>
      </div>
    </div>
  );
}

export default BackOffice;
