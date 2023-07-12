import { useMutation } from "@apollo/client";
import { useState, MouseEventHandler } from "react";
import { ADD_CATEGORY } from "../../graphql/category.mutation";

function ModaleAddCategory({
  handleModaleCategory,
  closeModaleCategory,
}: {
  handleModaleCategory?: MouseEventHandler<HTMLButtonElement>;
  closeModaleCategory?: () => void;
}) {
  const [label, setLabel] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [addCategoryInDb, { data: category }] = useMutation(ADD_CATEGORY, {
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", "add Category", data);
      setMessage("Vous avez ajouté la catégorie : ");
    },
    onError(error) {
      console.error("%c⧭", "color: #917399", error);
    },
  });

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
          imageUrl,
        },
      },
    });
  };
  return (
    <div className="modale-add-categorie">
      <div className="modale-add-categorie-form">
        <input
          data-testid="input-category"
          placeholder="Nom de la catégorie"
          onChange={handleChangeField("label", setLabel)}
        />
        <input
          data-testid="input-category"
          placeholder="Url de l'image"
          onChange={handleChangeField("imageUrl", setImageUrl)}
        />
        <button onClick={handleAddCategory}>Enregistrer</button>
        {category && (
          <p data-testid="paragraphe">{message + category.addCategory.label}</p>
        )}
      </div>
    </div>
  );
}

export default ModaleAddCategory;
