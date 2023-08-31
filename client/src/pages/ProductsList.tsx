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

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchQuery = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const [isAvailableFilter, setIsAvailableFilter] = useState(false);
  const handleIsAvailableFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsAvailableFilter(event.target.checked);
  };

  const [sizeFilters, setSizeFilters] = useState(new Set<string>());
  const handleSizeFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const size = event.target.value;
    if (sizeFilters.has(size)) {
      sizeFilters.delete(size);
    } else {
      sizeFilters.add(size);
    }
    setSizeFilters(new Set(sizeFilters));
  };

  const filteredProducts = data?.productsByCategory.filter((product: any) => {
    // Filtrage en fonction de la barre de recherche
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Filtrage en fonction des checkbox
    const matchesIsAvailable = !isAvailableFilter || product.isAvailable;
    const matchesSize = sizeFilters.size === 0 || sizeFilters.has(product.size);

    return matchesSearch && matchesIsAvailable && matchesSize;
  });

  const uniqueSizes = Array.from(
    new Set(data?.productsByCategory.map((product: any) => product.size))
  );

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
          <CaretCircleDown
            size={22}
            weight="bold"
            className={toggleFilters ? "filters-open" : "filters-close"}
          />
        </div>
        {toggleFilters && (
          <div className="filters-container">
            <input
              className="productlist-searchbar"
              type="text"
              placeholder="Rechercher un produit"
              value={searchQuery}
              onChange={handleSearchQuery}
            />

            <div className="filter-section">
              <label>
                Disponible
                <input
                  type="checkbox"
                  checked={isAvailableFilter}
                  onChange={handleIsAvailableFilterChange}
                />
              </label>
            </div>

            <div className="filter-section">
              {uniqueSizes.map((size: any) => (
                <label key={size}>
                  {size}
                  <input
                    type="checkbox"
                    value={size}
                    checked={sizeFilters.has(size)}
                    onChange={handleSizeFilterChange}
                  />
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <ul className="productlist-products-container">
        {filteredProducts.map((product: any) => (
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
