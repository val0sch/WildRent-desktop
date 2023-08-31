import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { LIST_PRODUCTS_BY_CATEGORY } from "../graphql/listProduct.query";
import { Product } from "../generated";
import { GET_PRODUCT_IMAGES } from "../graphql/image.query";

function ProductsList() {
  const { category } = useParams();

  const { loading, data, error } = useQuery(LIST_PRODUCTS_BY_CATEGORY, {
    variables: {
      categoryLabel: category,
    },
  });


  const products: Product[] = data?.productsByCategory || [];
  console.log(products)


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
      <div>Je suis dans la categorie: {category}</div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/all-categories/${category}/${product.id}`}>
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsList;
