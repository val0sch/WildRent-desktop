import { Link } from "react-router-dom";
import AddCategoryMutation from "../../components/AddCategoryMutation";
import ListCategoriesQuery from "../../components/ListCategoriesQuery";
import DeleteCategoryMutation from "../../components/deleteCategoryMutation";
import { useState } from "react";

function Categories(): JSX.Element {
/////
//  useEffect
/////

/////
//  useState
/////
  const [deleteCategoryId, setData] = useState<string>('');

/////
//  Code
/////
  const handleDataChange = (selectedCategoryId: string) => {// On récupère l'id de la catégorie sélectionnée dans ListCategoriesQuery
    setData(selectedCategoryId);
  };

/////
//  Return
/////
  return (
    <div>
      Catégories
      <div>
        <ListCategoriesQuery onDataChange={handleDataChange}/>
        <AddCategoryMutation />
        <DeleteCategoryMutation datas={deleteCategoryId}/>
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