import { useLazyQuery } from "@apollo/client";
import { LIST_CATEGORIES } from "../graphql/listCategories.query";
import { useEffect, useState } from "react";

function ListCategoriesQuery({ onDataChange }:{ onDataChange: (newData: string) => void }): JSX.Element {
/////
//  useEffect
/////
  useEffect(() => { getList(); }, []);

/////
//  useState
/////
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

/////
//  Code
/////
  const [getList, { data }] = useLazyQuery(LIST_CATEGORIES, {
    onCompleted(data) {
      console.log(data);
    },
    onError(error) {
      console.error(error);
    },
  });

  const handleDataChange = (newData: string) => {
    sendDataToParent(newData);
    setSelectedCategoryId(newData);
  };

  const sendDataToParent = (data: string) => {
    onDataChange(data);
  };

/////
//  Return
/////
  return (
    <div>
      <select value={selectedCategoryId} onChange={(e) => handleDataChange(e.target.value)}>
        <option value="0">Choisir une catégorie</option>
        {data.categories && data.categories.map((category: any, index: number) => (
          <option key={index} value={category.id}>{category.label}</option>
        ))}
      </select>
    </div>
  );
}

export default ListCategoriesQuery;