import { useMutation } from "@apollo/client";
import { useState, MouseEventHandler } from "react";
import { ADD_CATEGORY } from "../../graphql/category.mutation";
import * as Yup from "yup";

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
  const [errors, setErrors] = useState<Record<string, string>>({});

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

 const categorySchema = Yup.object({
    label: Yup.string().required("Le nom de la catégorie est requis"),
    imageUrl: Yup.string().url().matches(/\.(jpg|jpeg|png)$/ig, "le lien doit terminer par .jpg, .jpeg, .png").required("L'url de l'image est requise"),
  });

  const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await categorySchema.validate({ label, imageUrl }, { abortEarly: false });
      await addCategoryInDb({
        variables: {
          infos: {
            label,
            imageUrl,
          },
        },
      });
    } catch (err: any) {
      if (Yup.ValidationError.isError(err)) {
        const yupErrors: Record<string, string> = {};
        err.inner.forEach((validationError:any) => {
          yupErrors[validationError.path] = validationError.message;
        });
        setErrors(yupErrors);
      } else    
        setErrors({ label: "Une erreur est survenue" });  
    };
  }; 

  return (
    <div className="modale-add-categorie">
      <form onSubmit={handleAddCategory} className="modale-add-categorie-form">
        <input
          name="label"
          data-testid="input-category"
          placeholder="Nom de la catégorie"
          onChange={handleChangeField("label", setLabel)}
        />
        {errors.label && <p className="register-error-message">{errors.label}</p>}

        <input
          name="imageUrl"
          data-testid="input-category"
          placeholder="Url de l'image"
          onChange={handleChangeField("imageUrl", setImageUrl)}
        />
        {errors.imageUrl && (
          <span className="register-error-message">{errors.imageUrl}</span>
        )}

        <button type="submit">Enregistrer</button>
        {category && (
          <p data-testid="paragraphe">{message + category.addCategory.label}</p>
        )}
      </form>
      <button className="secondary" onClick={closeModaleCategory}>
        Fermer
      </button>
    </div>
  );
}

export default ModaleAddCategory;
