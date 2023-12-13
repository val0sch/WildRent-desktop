import { useMutation, useQuery } from "@apollo/client";
import {
  useState,
  useEffect,
  MouseEventHandler,
  ChangeEvent,
  FormEvent,
} from "react";
import { ADD_PRODUCT_WITH_IMAGES } from "../../graphql/product.mutation";
import { LIST_CATEGORIES } from "../../graphql/categories.query";
import * as Yup from "yup";

import "../../style/backoffice.css";
import Swal from "sweetalert2";

type ImageInput = {
  name: string;
  isMain: boolean;
};

function ModaleAddProduct({
  closeModaleProduct,
  updatedProduct,
}: {
  handleModaleProduct: MouseEventHandler<HTMLButtonElement>;
  closeModaleProduct: () => void;
  updatedProduct: () => void;
}): JSX.Element {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string | null>(null);
  const [price, setPrice] = useState<Number>(0);
  const [size, setSize] = useState<string>("");
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [stock, setStock] = useState<Number>(0);

  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // LIST CATEGORIES
  const { data: categories } = useQuery(LIST_CATEGORIES, {
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", "Liste des catégories : ", data);
    },
    onError(error) {
      console.error(error);
    },
  });

  const [addProductInDb] = useMutation(ADD_PRODUCT_WITH_IMAGES, {
    onCompleted(data) {
      setMessage(
        "Vous avez ajouté le produit : " + data.addProductWithImages.name
      );
      updatedProduct();
      closeModaleProduct();
    },
    onError(error) {
      console.log("%c⧭", "color: #917399", error);
    },
  });

  function handleName(event: ChangeEvent<HTMLInputElement>) {
    setName(String(event.target.value));
  }
  function handleDescription(event: ChangeEvent<HTMLInputElement>) {
    setDescription(String(event.target.value));
  }
  function handlePrice(event: ChangeEvent<HTMLInputElement>) {
    setPrice(Number(event.target.value));
  }
  function handleSize(event: ChangeEvent<HTMLInputElement>) {
    setSize(String(event.target.value));
  }
  function handleStock(event: ChangeEvent<HTMLInputElement>) {
    setStock(Number(event.target.value));
  }
  const handleIsAvailable = (e: ChangeEvent<HTMLInputElement>) => {
    setIsAvailable(e.target.checked);
  };
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    setIsAvailable(stock === 0 ? false : true);
  }, [stock]);

  const [images, setImages] = useState<ImageInput[]>([
    { name: "", isMain: false },
  ]);

  const handleImageChange = (
    index: number,
    field: keyof ImageInput,
    value: string | boolean
  ) => {
    if (field === "isMain" && value === true) {
      // Désélectionner toutes les autres images comme principales
      const updatedImages = images.map((image, i) =>
        i === index ? { ...image, [field]: value } : { ...image, isMain: false }
      );
      setImages(updatedImages);
    } else {
      setImages((prevImages) =>
        prevImages.map((image, i) =>
          i === index ? { ...image, [field]: value } : image
        )
      );
    }
  };

  const addImageField = () => {
    setImages([...images, { name: "", isMain: false }]);
  };
  const productSchema = Yup.object({
    name: Yup.string().required("Le nom de l'equipement est requis"),
    description: Yup.string().required("La description est requise"),
    price: Yup.number().required("Le prix est requis"),
    size: Yup.string().required("La taille est requise"),
    stock: Yup.number().required("La quantité est requise"),
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const handleAddProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedCategoryId = category === "" ? null : category;

    const imagesInput = images.map((image) => ({
      name: image.name,
      isMain: image.isMain,
    }));

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
            images: imagesInput,
          },
        },
      });
      await Toast.fire({
        icon: "success",
        title: "Produit ajouté avec succès",
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
    <div className="modale-add-product">
      <form onSubmit={handleAddProduct} className="modale-add-product-form">
        <select onChange={handleSelectChange}>
          <option value="">Choisir une catégorie</option>
          {categories?.getListCategories.map(
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
          min="0"
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
        <label htmlFor="isAvailable" className="label-product-isavailable">
          Produit disponible{" "}
          <input
            name="isAvailable"
            type="checkbox"
            onChange={handleIsAvailable}
          />
        </label>

        <h3>Images</h3>
        {images.map((image, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Nom de l'image"
              value={image.name}
              onChange={(e) => handleImageChange(index, "name", e.target.value)}
            />
            <label className="label-image-ismain">
              Image principale{" "}
              <input
                type="checkbox"
                checked={image.isMain}
                onChange={(e) =>
                  handleImageChange(index, "isMain", e.target.checked)
                }
              />
            </label>
          </div>
        ))}

        <button type="button" onClick={addImageField}>
          Ajouter une image
        </button>

        <button>Ajouter un produit</button>
        <div>{message}</div>
      </form>
      <button className="secondary" onClick={closeModaleProduct}>
        Fermer
      </button>
    </div>
  );
}

export default ModaleAddProduct;
