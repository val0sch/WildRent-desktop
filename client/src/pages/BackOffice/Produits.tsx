import { Link } from "react-router-dom";
import ListProducts from "../../components/backoffice/ListProducts";
import { MouseEventHandler, useState } from "react";
import ModaleAddProduct from "../../components/backoffice/ModaleAddProduct";

function Produits(): JSX.Element {
  const [toggleModaleProduct, setToggleModaleProduct] = useState(false);

  const handleModaleProduct: MouseEventHandler<HTMLButtonElement> = () => {
    setToggleModaleProduct(!toggleModaleProduct);
  };

  const closeModaleProduct: () => void = () => {
    setToggleModaleProduct(false);
  };

  return (
    <div>
      Produits
      <div>
        <button onClick={handleModaleProduct}>Ajouter un produit</button>
        {toggleModaleProduct && <ModaleAddProduct
          handleModaleProduct={handleModaleProduct}
          closeModaleProduct={closeModaleProduct}
        />} 

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
