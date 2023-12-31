import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { LIST_PRODUCTS_BY_CATEGORY } from "../graphql/product.query";

import { CaretCircleDown } from "@phosphor-icons/react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Product } from "../generated";

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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [prixMaxiTrouve, setPrixMaxiTrouve] = useState<number>(0);

  const getMaxPrice = (data: any): number => {
    const priceList = data?.getListProductsByCategory?.map(
      (product: any) => product.price
    );
    const maxPrice =
      priceList && priceList.length > 0 ? Math.max(...priceList) : 0;
    return maxPrice;
  };

  useEffect(() => {
    if (data) {
      const prixMaxiTrouve = getMaxPrice(data);
      setPrixMaxiTrouve(prixMaxiTrouve);
      setPriceRange([0, prixMaxiTrouve]);
    }
  }, [data]);

  const handleSliderChange = (value: any) => {
    setPriceRange(value);
  };

  const filteredProducts = data?.getListProductsByCategory.filter(
    (product: any) => {
      // Filtrage en fonction de la barre de recherche
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Filtrage en fonction des checkbox
      const matchesIsAvailable = !isAvailableFilter || product.isAvailable;
      const matchesSize =
        sizeFilters.size === 0 || sizeFilters.has(product.size);

      // Filtrage en fonction de la fourchette de prix
      const priceInRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesIsAvailable && matchesSize && priceInRange;
    }
  );

  const uniqueSizes = Array.from(
    new Set(
      data?.getListProductsByCategory?.map((product: Product) => product.size)
    )
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

            <div className="filter-section">
              <label>
                Fourchette de prix : 0 - {prixMaxiTrouve} €
                <Slider
                  range
                  defaultValue={[0, prixMaxiTrouve]}
                  min={0}
                  max={prixMaxiTrouve}
                  // value={priceRange}
                  onChange={handleSliderChange}
                  onAfterChange={handleSliderChange}
                />
              </label>
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
              {product.images.length > 0 && (
                <img
                  className="productlist-thumbnails"
                  src={product.images[0].name}
                  alt={product.name}
                />
              )}

              <div className="productlist-product-description">
                <span>
                  {product.name} - {product.price} €
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProductsList;
