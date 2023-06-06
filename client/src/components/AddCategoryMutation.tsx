import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_CATEGORY } from "../graphql/category.mutation";

function AddCategoryMutation() {
/////
//  useEffects
/////

/////
//  useStates
/////
  const [label, setLabel] = useState<string>("");

/////
//  Code
/////
  const [addCategoryInDb, { data }] = useMutation(ADD_CATEGORY, {
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", data);
    },
    onError(error) {
      console.error("%c⧭", "color: #917399", error);
    },
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<any>>) => {
    setState(e.target.value);
  };

  const handleChangeField = (field: string, setState: React.Dispatch<React.SetStateAction<any>>) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e, setState);
    };
  };

  const addCategory = () => {
    addCategoryInDb({
      variables: {
        infos: {
          label
        }
      },
    });
  };

/////
//  Return
/////
  return (
    <div>
      <input placeholder="Nom de la catégorie" onChange={handleChangeField('label', setLabel)}/>
      <button onClick={addCategory}>Enregistrer</button>
    </div>
  );
}

export default AddCategoryMutation;