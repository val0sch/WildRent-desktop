import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../graphql/product.query";
import { Product } from "../generated";
import "../style/productSheet.css";

function ProductSheet() {
  const { productId } = useParams();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(`/all-categories/${product.category?.label}`);
  };

  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      productId: productId,
    },
  });

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Erreur de chargement de la fiche produit.</div>;
  }

  const product: Product = data.product || {};

  const handleReservation = () => {
    console.log("hello");
  };
  return (
    <div className="container">
      <div className="left-container">
        <div>
          <button className="secondary" onClick={handleGoBack}>
            Retour
          </button>
        </div>
      </div>
      <div className="right-container">
        <h1>{product.name}</h1>
        <div>
          <h2>Description</h2>
          <p>{product.description}</p>
        </div>
        <div>
          <h2>Prix</h2>
          <p>{product.price} €/jour</p>
        </div>
        <div>
          <h2>Caractéristiques</h2>
          <p>{product.description}</p>
        </div>
        <div>
          <h2>Taille</h2>
          <p>{product.size}</p>
        </div>

        <button className="resa-btn" onClick={handleReservation}>
          Je réserve
        </button>
      </div>
    </div>
  );
}

export default ProductSheet;
