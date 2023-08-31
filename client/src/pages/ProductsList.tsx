import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { LIST_PRODUCTS_BY_CATEGORY } from "../graphql/listProduct.query";
import { Product } from "../generated";

function ProductsList() {
  const { category } = useParams();

  const { loading, data, error } = useQuery(LIST_PRODUCTS_BY_CATEGORY, {
    variables: {
      categoryLabel: category,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return (
      <div>
        Erreur de chargement de la liste des produits de la catégorie
        {category?.toUpperCase()}.
      </div>
    );
  }

  return (
    <div>
      <h2 className="productlist-title-category">Catégorie : {category}</h2>
      <ul className="productlist-products-container">
        {data.productsByCategory.map((product:any) => (
          <li key={product.id}>
            <Link to={`/all-categories/${category}/${product.id}`} className="productlist-thumbnails-card">
              <img className="productlist-thumbnails" src={product.images[0].name} alt={product.name} />
              <div className="productlist-product-description">
                <span>{product.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsList;
