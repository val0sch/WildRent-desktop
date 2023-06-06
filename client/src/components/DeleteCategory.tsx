import { useMutation } from "@apollo/client";
import { DELETE_CATEGORY } from "../graphql/category.mutation";

function DeleteCategory({ deleteCategoryId }:{ deleteCategoryId: string }): JSX.Element {
/////
//  useEffect
/////

/////
//  useState
/////

/////
//  Code
/////

  const [deleteCategoryInDb, { data }] = useMutation(DELETE_CATEGORY, {
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", "Suppression : " + data);
    },
    onError(error) {
      console.error("%c⧭", "color: #917399", error);
    },
  });
  
  const handleDeleteCategory = () => {
    deleteCategoryInDb({
      variables: {
        deleteCategoryId
      },
    });
  };

/////
//  Return
/////
  return (
    <div>
      <button onClick={handleDeleteCategory} >
        Supprimer
      </button>
    </div>
  );
}

export default DeleteCategory;