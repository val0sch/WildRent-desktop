import { Link } from "react-router-dom";
import ModaleAddCategory from "../../components/backoffice/ModaleAddCategory";
import ListCategories from "../../components/backoffice/ListCategories";
import { MouseEventHandler, useState } from "react";

import Plongeur from "../../assets/back-office.jpeg";
import { LIST_CATEGORIES } from "../../graphql/categories.query";
import { useQuery } from "@apollo/client";

function Categories(): JSX.Element {
  const [toggleModaleCategory, setToggleModaleCategory] = useState(false);

  const handleModaleCategory: MouseEventHandler<HTMLButtonElement> = () => {
    setToggleModaleCategory(!toggleModaleCategory);
  };

  const closeModaleCategory: () => void = () => {
    setToggleModaleCategory(false);
  };

  /// LIST CATEGORIES
  const { data, refetch } = useQuery(LIST_CATEGORIES, {
    onError(error) {
      console.error(error);
    },
  });
  const updatedCategory = () => {
    refetch();
  };

  return (
    <section className="back-office-categorie-section">
      <div className="back-office-img-container">
        <img src={Plongeur} alt="wildrent - plongeur" />
      </div>

      <div className="bo-categorie-container">
        <h3>Catégories</h3>
        <div>
          <button onClick={handleModaleCategory}>Ajouter une catégorie</button>
          {toggleModaleCategory && (
            <ModaleAddCategory
              handleModaleCategory={handleModaleCategory}
              closeModaleCategory={closeModaleCategory}
              updatedCategory={updatedCategory}
            />
          )}
          <ListCategories
            categories={data?.getListCategories}
            updatedCategory={updatedCategory}
          />
        </div>
        <div>
          <button>
            <Link to={"/back-office"}>Retour</Link>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Categories;
