import { useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { LIST_CATEGORIES } from "../graphql/listCategories.query";
import NotFound from "./errors/NotFound";

import "../style/categorie_list.css";
import { Link } from "react-router-dom";

function CategorieList(): JSX.Element {
  const isMobile = window.innerWidth <= 768;

  const [categoriesList, setCategoriesList] = useState([]);

  const [getList] = useLazyQuery(LIST_CATEGORIES, {
    onCompleted(data) {
      setCategoriesList(data.categories);
    },
    onError(error) {
      console.error(error);
    },
  });

  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <section className={`all-categories-container ${isMobile ? "mobile" : ""}`}>
      {categoriesList ? (
        categoriesList.map((categorie: any, index: number) => {
          const isLastItem = index === categoriesList.length - 1 && isMobile;
          const divStyle = isLastItem ? { width: "100%" } : {};

          return (
            <div
              className="all-categories-div"
              style={{
                backgroundImage: `url(${categorie.imageUrl})`,
                ...divStyle,
              }}
              key={index}
            >
              <Link to={`/all-categories/${categorie.label}`}>
                {categorie.label}
              </Link>
            </div>
          );
        })
      ) : (
        <NotFound />
      )}
    </section>
  );
}

export default CategorieList;
