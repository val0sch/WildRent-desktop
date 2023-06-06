import { useMutation } from "@apollo/client";
import { DELETE_CATEGORY } from "../graphql/category.mutation";

function DeleteCategoryMutation({ datas }:{ datas: string }): JSX.Element {
/////
//  useEffect
/////

/////
//  useState
/////

/////
//  Code
/////
  const deleteCategoryId:string = datas;

  const [deleteCategoryInDb, { data }] = useMutation(DELETE_CATEGORY, {
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", data);
    },
    onError(error) {
      console.log("%c⧭", "color: #917399", error);
    },
  });
  
  const deleteCategory = () => {
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
      <button onClick={deleteCategory} >
        Supprimer
      </button>
    </div>
  );
}

export default DeleteCategoryMutation;