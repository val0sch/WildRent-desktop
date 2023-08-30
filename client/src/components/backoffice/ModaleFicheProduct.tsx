import { useMutation, useQuery } from "@apollo/client";
import { DELETE_PRODUCT } from "../../graphql/product.mutation";
import { UPDATE_PRODUCT } from "../../graphql/product.mutation";
import { ChangeEvent, FormEvent, MouseEventHandler, useState } from "react";
import { LIST_CATEGORIES } from "../../graphql/listCategories.query";
import * as Yup from "yup";
import { GET_PRODUCT_IMAGES } from "../../graphql/image.query";
import { DELETE_IMAGE, UPDATE_IMAGE } from "../../graphql/image.mutation";

function ModaleFicheProduct({
  handleModaleFicheProduct,
  closeModaleFicheProduct,
  product,
  updatedProduct,
}: {
  handleModaleFicheProduct: MouseEventHandler<HTMLButtonElement>;
  closeModaleFicheProduct: (index: any) => void;
  updatedProduct: () => void;
  product: any;
}): JSX.Element {
  // LIST CATEGORIES
  const { data: categories } = useQuery(LIST_CATEGORIES, {
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", "Liste des catégories : ", data);
    },
    onError(error) {
      console.error(error);
    },
  });

  const [name, setName] = useState<string>(product.name);
  const [description, setDescription] = useState<string>(product.description);
  const [price, setPrice] = useState<number>(product.price);
  const [size, setSize] = useState<string>(product.size);
  const [isAvailable, setIsAvailable] = useState<boolean>(product.isAvailable);
  const [stock, setStock] = useState<number>(product.stock);
  const [category, setCategoryId] = useState<any>(product?.category?.id);
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };
  const handleSize = (e: ChangeEvent<HTMLInputElement>) => {
    setSize(e.target.value);
  };
  const handleIsAvailable = (e: ChangeEvent<HTMLInputElement>) => {
    setIsAvailable(e.target.checked);
  };
  const handleStock = (e: ChangeEvent<HTMLInputElement>) => {
    setStock(Number(e.target.value));
  };
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(e.target.value);
  };

  // SUPPRESSION PRODUCT
  const [deleteProductInDb] = useMutation(DELETE_PRODUCT, {
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", "Suppression : ", data);
      setMessage("Vous avez supprimé le produit");
    },
    onError(error) {
      console.error("%c⧭", "color: #917399", error);
    },
  });

  const handleDeleteProduct = (productId: string) => {
    deleteProductInDb({
      variables: {
        deleteProductId: productId,
      },
    });
  };

  // UPDATE PRODUCT
  const productSchema = Yup.object({
    name: Yup.string().required("Le nom de l'equipement est requis"),
    description: Yup.string().required("La description est requise"),
    price: Yup.number().required("Le prix est requis"),
    size: Yup.string().required("La taille est requise"),
    stock: Yup.number().required("La quantité est requise"),
  });

  const [updateProductInDb] = useMutation(UPDATE_PRODUCT, {
    onCompleted(data) {
      updatedProduct();
      console.log("%c⧭", "color: #0088cc", "update Product", data);
      setMessage("Vous avez modifié le produit");
    },
    onError(error) {
      console.error("%c⧭", "color: #917399", error);
    },
  });

  const handleUpdateProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await productSchema.validate(
        { name, description, price, size, stock },
        { abortEarly: false }
      );
      const selectedCategoryId = category === "" ? null : category;
      name == product.name &&
      description == product.description &&
      price == product.price &&
      size == product.size &&
      isAvailable == product.isAvailable &&
      stock == product.stock &&
      selectedCategoryId == product?.category?.id
        ? setMessage("Aucune modification n'a été apporté")
        : await updateProductInDb({
            variables: {
              updateProductId: product.id,
              infos: {
                name: name,
                description: description,
                price: price,
                size: size,
                stock: stock,
                isAvailable: isAvailable,
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

  const { data: imagesData, refetch: refetchImages } = useQuery(GET_PRODUCT_IMAGES, {
    variables: {
      productId: product.id,
    },
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", "imagesData", data);
    },
    onError(error) {
      console.error("%c⧭", "color: #917399", error);
    },
  });

  const [deleteImage] = useMutation(DELETE_IMAGE, {
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", "deleteImage", data);
      refetchImages();
    },
    onError(error) {
      console.error("%c⧭", "color: #917399", error);
    },
  });

  const handleDeleteImage = (deleteImageId:any) => {
    deleteImage({
      variables: {
        deleteImageId: deleteImageId,
      },
    });
  };

  const [updateImage] = useMutation(UPDATE_IMAGE, {
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", "updateImage", data);
    },
    onError(error) {
      console.error("%c⧭", "color: #917399", error);
    },
  });

  const imagesSection = () => {
    if (!imagesData || !imagesData.imagesByProduct) return null;

    return (
      <div>
        <h3>Images du produit</h3>
        {imagesData.imagesByProduct.length === 0 && (
          <div>Aucune image pour ce produit</div>
        )}
        {imagesData.imagesByProduct.map((image: any) => (
          <div key={image.id}>
            <img src={image.name} alt={image.name} />
            <button onClick={() => handleDeleteImage(image.id)}>Supprimer</button>
            <button onClick={() => updateImage(image.id)}>Modifier</button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="modale-fiche-product-container">
      <form onSubmit={handleUpdateProduct} className="modale-fiche-product">
        <div>Fiche catégorie</div>
        <div>{product.name}</div>

        <label htmlFor="updateNameProduct">
          Changer le nom :
          <input
            value={name}
            id="updateNameProduct"
            type="text"
            onChange={handleName}
          />
        </label>
        {errors.name && <p className="register-error-message">{errors.name}</p>}

        <label htmlFor="updateDescriptionProduct">
          Changer la description :
          <input
            value={description}
            id="updateDescriptionProduct"
            type="text"
            onChange={handleDescription}
          />
        </label>
        {errors.description && (
          <p className="register-error-message">{errors.description}</p>
        )}

        <label htmlFor="updatePriceProduct">
          Changer le prix :
          <input
            value={price}
            id="updatePriceProduct"
            type="number"
            min={0}
            onChange={handlePrice}
          />
        </label>
        {errors.price && (
          <p className="register-error-message">{errors.price}</p>
        )}

        <label htmlFor="updateSizeProduct">
          Changer la taille :
          <input
            value={size}
            id="updateSizeProduct"
            type="text"
            onChange={handleSize}
          />
        </label>
        {errors.size && <p className="register-error-message">{errors.size}</p>}

        <label htmlFor="updateStockProduct">
          Changer la quantité :
          <input
            value={stock}
            id="updateStockProduct"
            type="number"
            min={0}
            onChange={handleStock}
          />
        </label>
        {errors.stock && (
          <p className="register-error-message">{errors.stock}</p>
        )}

        <label htmlFor="updateIsAvailableProduct">
          Le produit est visible :
          <input
            id="updateIsAvailableProduct"
            type="checkbox"
            checked={isAvailable}
            onChange={handleIsAvailable}
          />
        </label>

        <label htmlFor="updateCategoryIdProduct">
          Changer de catégorie :
          <select
            onChange={handleSelectChange}
            value={category ? category : ""}
          >
            <option value="">Pas de catégorie</option>
            {categories?.categories.map(
              (selectedcategory: any, index: number) => (
                <option key={index} value={selectedcategory.id} selected>
                  {selectedcategory.label}
                </option>
              )
            )}
          </select>
        </label>

        <button>modifier</button>
        <div>{message}</div>
        <button
          className="secondary"
          onClick={() => handleDeleteProduct(product.id)}
        >
          Supprimer
        </button>

        {imagesSection()}
      </form>
      <button onClick={() => closeModaleFicheProduct(product.id)}>
        Fermer
      </button>
    </div>
  );
}
export default ModaleFicheProduct;
