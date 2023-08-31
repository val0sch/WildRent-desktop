import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { LIST_PRODUCTS_BY_CATEGORY } from "../graphql/listProduct.query";

import { CaretCircleDown } from "@phosphor-icons/react";
import { useState } from "react";

function ProductsList() {
  const { category } = useParams();

  const { loading, data, error } = useQuery(LIST_PRODUCTS_BY_CATEGORY, {
    variables: {
      categoryLabel: category,
    },
  });

  const [toggleFilters, setToggleFilters] = useState(false);

  const handleToggleFilters = () => {
    setToggleFilters(!toggleFilters);
  };

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
    <section>
      <h2 className="productlist-title-category">Catégorie : {category}</h2>
      <div className="productlist-filters-container">
        <div className="title-filters-container" onClick={handleToggleFilters}>
          <p>Filtres</p>
          <CaretCircleDown size={22} weight="bold" className={toggleFilters ? "filters-open" : "filters-close"} />
        </div>
        {toggleFilters && <div className="filters-container"></div>}
      </div>

      <ul className="productlist-products-container">
        {data.productsByCategory.map((product: any) => (
          <li key={product.id}>
            <Link
              to={`/all-categories/${category}/${product.id}`}
              className="productlist-thumbnails-card"
            >
              <img
                className="productlist-thumbnails"
                src={product.images[0].name}
                alt={product.name}
              />
              <div className="productlist-product-description">
                <span>{product.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProductsList;
