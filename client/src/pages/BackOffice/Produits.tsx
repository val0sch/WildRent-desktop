import { Link } from "react-router-dom";
import AddProduct from "../../components/AddProduct";
import ListProducts from "../../components/ListProducts";

function Produits(): JSX.Element {

  return (
    <div>
      Produits
      <div>
        <AddProduct />
        <ListProducts />
      </div>
      <div>
        <button>
          <Link to={"/back-office/"}>Retour</Link>
        </button>
      </div>
    </div>
  );
}

export default Produits;