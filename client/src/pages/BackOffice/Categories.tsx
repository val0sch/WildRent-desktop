import { Link } from "react-router-dom";
import AddCategory from "../../components/AddCategory";
import ListCategories from "../../components/ListCategories";
import DeleteCategory from "../../components/DeleteCategory";
import { useState } from "react";

function Categories(): JSX.Element {
/////
//  useEffect
/////

/////
//  useState
/////
  const [deleteCategoryId, setDeleteCategoryId] = useState<string>('');

/////
//  Code
/////
  const dataCategories = (selectedCategoryId: string) => {// On récupère l'id de la catégorie sélectionnée dans ListCategoriesQuery
    setDeleteCategoryId(selectedCategoryId);
  };

/////
//  Return
/////
  return (
    <div>
      Catégories
      <div>
        <ListCategories dataCategories={dataCategories}/>
        <AddCategory />
        <DeleteCategory deleteCategoryId={deleteCategoryId}/>
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