import { Link } from "react-router-dom";
import ModaleAddCategory from "../../components/backoffice/ModaleAddCategory";
import ListCategories from "../../components/backoffice/ListCategories";
import { MouseEventHandler, useState } from "react";

function Categories(): JSX.Element {
  const [toggleModaleCategory, setToggleModaleCategory] = useState(false);

  const handleModaleCategory: MouseEventHandler<HTMLButtonElement> = () => {
    setToggleModaleCategory(!toggleModaleCategory);
  };

  const closeModaleCategory: () => void = () => {
    setToggleModaleCategory(false);
  };
  return (
    <div>
      Catégories
      <div>
      <button onClick={handleModaleCategory}>Ajouter une catégorie</button>
      {toggleModaleCategory && <ModaleAddCategory
          handleModaleCategory={handleModaleCategory}
          closeModaleCategory={closeModaleCategory}
        />} 
        <ListCategories/>
      </div>
      <div>
        <button>
          <Link to={"/back-office"}>Retour</Link>
        </button>
      </div>
    </div>
  );
}

export default Categories;