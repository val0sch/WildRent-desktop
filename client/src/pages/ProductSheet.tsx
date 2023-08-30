import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../graphql/product.query";
import { Product } from "../generated";

function ProductSheet() {
  const { productId } = useParams();

  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      productId: productId,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Erreur de chargement de la fiche produit.</div>;
  }

  const product: Product = data.product || {};

  return (
    <div className="container">
      <div className="left-container"></div>
      <div className="right-container">Product {product.name}</div>;
    </div>
  );
}

export default ProductSheet;
