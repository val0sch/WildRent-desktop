import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_CATEGORY } from "../graphql/category.mutation";

function AddCategory() {
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
      console.log("%c⧭", "color: #0088cc", "add Category", data);
    },
    onError(error) {
      console.error("%c⧭", "color: #917399", error);
    },
  });
  console.log(addCategoryInDb);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<any>>
  ) => {
    setState(e.target.value);
  };

  const handleChangeField = (
    field: string,
    setState: React.Dispatch<React.SetStateAction<any>>
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e, setState);
    };
  };

  const handleAddCategory = () => {
    addCategoryInDb({
      variables: {
        infos: {
          label,
        },
      },
    });
  };

  /////
  //  Return
  /////
  return (
    <div>
      <input
        placeholder="Nom de la catégorie"
        onChange={handleChangeField("label", setLabel)}
      />
      <button onClick={handleAddCategory}>Enregistrer</button>
      {data && <p>Vous avez ajouté la catégorie : {data.addCategory.label}</p>}
    </div>
  );
}

export default AddCategory;
