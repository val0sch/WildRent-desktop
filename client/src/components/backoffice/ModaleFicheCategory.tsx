import { useMutation, useQuery } from "@apollo/client";
import { DELETE_CATEGORY } from "../../graphql/category.mutation";
import { UPDATE_CATEGORY } from "../../graphql/category.mutation";
import { MouseEventHandler, useState } from "react";

function ModaleFicheCategory({
  handleModaleFicheCategory,
  closeModaleFicheCategory,
  category,
}: {
  handleModaleFicheCategory?: MouseEventHandler<HTMLButtonElement>;
  closeModaleFicheCategory?: (index: number) => void;
  category: any;
}): JSX.Element {
  console.log("%c⧭", "color: #0088cc", "categoryId", category);

  const [label, setLabel] = useState<string>(category.label);
  const [imageUrl, setImageUrl] = useState<string>(category.imageUrl);
  const [message, setMessage] = useState<string>("");

  const handleLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };
  const handleImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
  };

  // SUPPRESSION CATEGORIE
  const [deleteCategoryInDb] = useMutation(DELETE_CATEGORY, {
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", "Suppression : ", data);
      setMessage("Vous avez supprimé la catégorie");
    },
    onError(error) {
      console.error("%c⧭", "color: #917399", error);
    },
  });

  const handleDeleteCategory = (categoryId: string) => {
    deleteCategoryInDb({
      variables: {
        deleteCategoryId: category.id,
      },
    });
  };

  // UPDATE CATEGORIE
  const [updateCategoryInDb] = useMutation(UPDATE_CATEGORY, {
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", "update Category", data);
      setMessage("Vous avez modifié la catégorie");
    },
    onError(error) {
      console.error("%c⧭", "color: #917399", error);
    },
  });
  const handleUpdateCategory = () => {
    const updatedLabel = label === "" ? category.label : label;
    const updatedImageUrl = imageUrl === "" ? category.imageUrl : imageUrl;
    updatedLabel == category.label && updatedImageUrl == category.imageUrl
      ? setMessage("Aucune modification n'a été apporté")
      : updateCategoryInDb({
          variables: {
            updateCategoryId: category.id,
            infos: {
              label: updatedLabel,
              imageUrl: updatedImageUrl,
            },
          },
        });
  };

  return (
    <div className="modale-detail-category-container">
      <div className="modale-detail-category">
        <div>Fiche catégorie</div>
        <h3>{category.label}</h3>
        <div>
          <label htmlFor="updateLabelCategory">
            Changer le nom de la catégorie :
          </label>
          <input
            value={label}
            id="updateLabelCategory"
            type="text"
            onChange={handleLabel}
          />
        </div>
        <div className="bo-container-input-img">
          <img src={category.imageUrl} alt={category.label} width={150} />
          <label htmlFor="updateImageUrlCategory">
            Changer l'image de la catégorie :
          </label>
          <input
            value={imageUrl}
            id="updateImageUrlCategory"
            type="text"
            onChange={handleImageUrl}
          />
        </div>
        <button onClick={handleUpdateCategory}>modifier</button>
        <button
          className="secondary"
          onClick={() => handleDeleteCategory(category.id)}
        >
          Supprimer
        </button>
        <div>{message}</div>
      </div>
    </div>
  );
}
export default ModaleFicheCategory;
