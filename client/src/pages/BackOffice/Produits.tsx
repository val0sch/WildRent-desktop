import { Link } from "react-router-dom";
import ListProducts from "../../components/backoffice/ListProducts";
import { MouseEventHandler, useEffect, useState } from "react";
import ModaleAddProduct from "../../components/backoffice/ModaleAddProduct";

import Plongeur from "../../assets/back-office.jpeg";
import { Product } from "../../generated";
import { useQuery } from "@apollo/client";
import { LIST_PRODUCT } from "../../graphql/listProduct.query";

function Produits(): JSX.Element {
  const [toggleModaleProduct, setToggleModaleProduct] = useState(false);

  const updatedProduct = () => {
    // refetch();
  };
  const handleModaleProduct: MouseEventHandler<HTMLButtonElement> = () => {
    setToggleModaleProduct(!toggleModaleProduct);
  };

  const closeModaleProduct: () => void = () => {
    setToggleModaleProduct(false);
  };

  // LIST PRODUCTS
  const [products, setProducts] = useState<Product[]>([]);
  const { data, refetch } = useQuery(LIST_PRODUCT, {
    onCompleted(data) {
      console.log("list product", data);
      setProducts(data.products);
    },
    onError(error) {
      console.error(error);
    },
  });

  return (
    <section className="back-office-product-section">
      <div className="back-office-img-container">
        <img src={Plongeur} alt="wildrent - plongeur" />
      </div>
      <div className="bo-products-container">
        <h3>Produits</h3>

        <div>
          <button onClick={handleModaleProduct}>Ajouter un produit</button>
          {toggleModaleProduct && (
            <ModaleAddProduct
              handleModaleProduct={handleModaleProduct}
              closeModaleProduct={closeModaleProduct}
              updatedProduct={updatedProduct}
            />
          )}

          <ListProducts products={products} updatedProduct={updatedProduct} />
        </div>
        <div>
          <button>
            <Link to={"/back-office/"}>Retour</Link>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Produits;
