import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect, MouseEventHandler } from "react";
import { ADD_PRODUCT } from "../../graphql/product.mutation";
import ListCategories from "./ListCategories";
import { LIST_CATEGORIES } from "../../graphql/Categories.query";
import * as Yup from "yup";

function ModaleAddProduct({
  handleModaleProduct,
  closeModaleProduct,
}: {
  handleModaleProduct: MouseEventHandler<HTMLButtonElement>;
  closeModaleProduct: () => void;
}): JSX.Element {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string | null>(null);
  const [price, setPrice] = useState<Number>(0);
  const [size, setSize] = useState<string>("");
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [stock, setStock] = useState<Number>(0);
  // const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>("");

  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: categories } = useQuery(LIST_CATEGORIES, {
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", "Liste des catégories : ", data);
    },
    onError(error) {
      console.error(error);
    },
  });

  const [addProductInDb, { data }] = useMutation(ADD_PRODUCT, {
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", "add Product", data);
      setMessage("Vous avez ajouté le produit : " + data.addProduct.name);
    },
    onError(error) {
      console.log("%c⧭", "color: #917399", error);
    },
  });

  function handleName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(String(event.target.value));
  }
  function handleDescription(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(String(event.target.value));
  }
  function handlePrice(event: React.ChangeEvent<HTMLInputElement>) {
    setPrice(Number(event.target.value));
  }
  function handleSize(event: React.ChangeEvent<HTMLInputElement>) {
    setSize(String(event.target.value));
  }
  function handleStock(event: React.ChangeEvent<HTMLInputElement>) {
    setStock(Number(event.target.value));
  }
  const handleIsAvailable = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAvailable(e.target.checked);
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    setIsAvailable(stock === 0 ? false : true);
  }, [stock]);

  const productSchema = Yup.object({
    name: Yup.string().required("Le nom de l'equipement est requis"),
    description: Yup.string().required("La description est requise"),
    price: Yup.number().required("Le prix est requis"),
    size: Yup.string().required("La taille est requise"),
    stock: Yup.number().required("La quantité est requise"),
  });

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedCategoryId = category === "" ? null : category;
    try {
      await productSchema.validate(
        { name, description, price, size, stock },
        { abortEarly: false }
      );
      await addProductInDb({
        variables: {
          infos: {
            name,
            description,
            price,
            size,
            stock,
            isAvailable,
            category: selectedCategoryId,
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
    <div>
      <form onSubmit={handleAddProduct}>
        <select onChange={handleSelectChange}>
          <option value="">Choisir une catégorie</option>
          {categories?.categories.map(
            (selectedcategory: any, index: number) => (
              <option key={index} value={selectedcategory.id}>
                {selectedcategory.label}
              </option>
            )
          )}
        </select>
        <input
          name="name"
          type="text"
          placeholder="Nom de l'equipement"
          onChange={handleName}
        />
        {errors.name && <p className="register-error-message">{errors.name}</p>}
        <input
          name="description"
          type="text"
          placeholder="Description"
          onChange={handleDescription}
        />
        {errors.description && (
          <p className="register-error-message">{errors.description}</p>
        )}
        <input
          name="price"
          type="number"
          placeholder="Prix"
          onChange={handlePrice}
        />
        {errors.price && (
          <p className="register-error-message">{errors.price}</p>
        )}
        <input
          name="size"
          type="text"
          placeholder="Taille"
          onChange={handleSize}
        />
        {errors.size && <p className="register-error-message">{errors.size}</p>}
        <input
          name="stock"
          type="number"
          min="0"
          placeholder="Quantité"
          onChange={handleStock}
        />
        {errors.stock && (
          <p className="register-error-message">{errors.stock}</p>
        )}
<label htmlFor="isAvailable">Produit disponible</label>
        <input name="isAvailable" type="checkbox" onChange={handleIsAvailable} />
        <button>Ajouter un produit</button>
        <div>{message}</div>
      </form>
      <button onClick={closeModaleProduct}>Fermer</button>
    </div>
  );
}

export default ModaleAddProduct;
