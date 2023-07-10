import { useLazyQuery, useMutation } from "@apollo/client";
import { LIST_CATEGORIES } from "../graphql/listCategories.query";
import { DELETE_CATEGORY } from "../graphql/category.mutation";
import { useEffect, useState } from "react";

function ListCategories(
  {deletable, idCategories}:
  {deletable?: boolean; idCategories?: (newData: string) => void;
  }): JSX.Element {

  useEffect(() => {
    getList();
  }, []);

  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  /// LIST CATEGORIES
  const [getList, { data }] = useLazyQuery(LIST_CATEGORIES, {
    onCompleted(data) {
      console.log("list categories", data);
    },
    onError(error) {
      console.error(error);
    },
  });

  const handleSelectChange = (newData: string) => {
    setSelectedCategoryId(newData);
    sendDataToParent(newData);
  };
  const sendDataToParent = (data: string) => {
    if (idCategories) {
      idCategories(data);
    }
  };

  /// DELETE CATEGORY
  const [deleteCategoryInDb] = useMutation(DELETE_CATEGORY, {
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", "Suppression : " , data);
    },
    onError(error) {
      console.error("%c⧭", "color: #917399", error);
    },
  });
  
  const handleDeleteCategory = (deleteCategoryId:String ) => {
    deleteCategoryInDb({
      variables: {
        deleteCategoryId
      },
    });
  };
  return (
    <div>
      <select
        value={selectedCategoryId}
        onChange={(e) => handleSelectChange(e.target.value)}
      >
        <option value="0">Choisir une catégorie</option>
        {data?.categories &&
          data.categories.map((category: any, index: number) => (
            <option key={index} value={category.id}>
              {category.label}
            </option>
          ))}
      </select>
      {deletable && (<button onClick={()=>handleDeleteCategory(selectedCategoryId)}>Supprimer</button>)}
    </div>
  );
}

export default ListCategories;
