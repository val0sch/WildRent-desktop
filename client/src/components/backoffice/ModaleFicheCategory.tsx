import { useMutation } from "@apollo/client";
import { DELETE_CATEGORY } from "../../graphql/category.mutation";
import { UPDATE_CATEGORY } from "../../graphql/category.mutation";
import { ChangeEvent, FormEvent, MouseEventHandler, useState } from "react";
import * as Yup from "yup";

function ModaleFicheCategory({
  handleModaleFicheCategory,
  closeModaleFicheCategory,
  category,
  index,
}: {
  handleModaleFicheCategory: MouseEventHandler<HTMLButtonElement>;
  closeModaleFicheCategory: (index: any) => void;
  category: any;
  index: any;
}): JSX.Element {
  const [label, setLabel] = useState<string>(category.label);
  const [imageUrl, setImageUrl] = useState<string>(category.imageUrl);
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };
  const handleImageUrl = (e: ChangeEvent<HTMLInputElement>) => {
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

  const categorySchema = Yup.object({
    label: Yup.string().required("Le nom de la catégorie est requis"),
    imageUrl: Yup.string()
      .url()
      .matches(
        /\.(jpg|jpeg|png)$/gi,
        "le lien doit terminer par .jpg, .jpeg, .png"
      )
      .required("L'url de l'image est requise"),
  });

  const handleUpdateCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await categorySchema.validate({ label, imageUrl }, { abortEarly: false });
      label == category.label && imageUrl == category.imageUrl
        ? setMessage("Aucune modification n'a été apporté")
        : await updateCategoryInDb({
            variables: {
              updateCategoryId: category.id,
              infos: {
                label: label,
                imageUrl: imageUrl,
              },
            },
          });
    } catch (err: any) {
      if (Yup.ValidationError.isError(err)) {
        const yupErrors: Record<string, string> = {};
        err.inner.forEach((validationError: any) => {
          yupErrors[validationError.path] = validationError.message;
        });
        setErrors(yupErrors);
      } else setErrors({ label: "Une erreur est survenue" });
    }
  };

  return (
    <div className="modale-fiche-category-container">
      <form onSubmit={handleUpdateCategory} className="modale-fiche-category">
        <div>Fiche catégorie</div>
        <div>{category.label}</div>
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
          {errors.label && (
            <p className="register-error-message">{errors.label}</p>
          )}
        </div>
        <div className="bo-container-input-img">
          <img src={category.imageUrl} alt={category.label} width={150} />
          <label htmlFor="updateImageUrlCategory">
            {" "}
            Changer l'url de l'image :{" "}
          </label>
          <input
            value={imageUrl}
            id="updateImageUrlCategory"
            type="text"
            onChange={handleImageUrl}
          />
          {errors.imageUrl && (
            <p className="register-error-message">{errors.imageUrl}</p>
          )}
        </div>
        <button>modifier</button>
        <div>{message}</div>
        <button
          className="secondary"
          onClick={() => handleDeleteCategory(category.id)}
        >
          Supprimer
        </button>
      </form>
      <button onClick={() => closeModaleFicheCategory(index)}>Fermer</button>
    </div>
  );
}
export default ModaleFicheCategory;
