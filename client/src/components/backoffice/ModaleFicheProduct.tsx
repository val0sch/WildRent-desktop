import { useMutation, useQuery } from "@apollo/client";
import { DELETE_PRODUCT } from "../../graphql/product.mutation";
import { UPDATE_PRODUCT } from "../../graphql/product.mutation";
import {
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { LIST_CATEGORIES } from "../../graphql/listCategories.query";
import * as Yup from "yup";
import { GET_PRODUCT_IMAGES } from "../../graphql/image.query";
import {
  DELETE_IMAGE,
  ADD_IMAGE,
  UPDATE_IMAGE_MAIN_STATUS,
} from "../../graphql/image.mutation";
import Swal from 'sweetalert2'

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
  const [errorMessage, setErrorMessage] = useState("");

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  useEffect(() => {
    if (errorMessage) {
      Toast.fire({
        icon: 'error',
        title: 'Erreur',
        text: errorMessage,
      });
    }
  }, [errorMessage]);

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

  const { data: imagesData, refetch: refetchImages } = useQuery(
    GET_PRODUCT_IMAGES,
    {
      variables: {
        productId: product.id,
      },
      onCompleted(data) {
        console.log("%c⧭", "color: #0088cc", "imagesData", data);
      },
      onError(error) {
        console.error("%c⧭", "color: #917399", error);
      },
    }
  );

  const [deleteImage] = useMutation(DELETE_IMAGE, {
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", "deleteImage", data);
      refetchImages();
    },
    onError(error) {
      console.error("%c⧭", "color: #917399", error);
    },
  });

  const handleDeleteImage = (deleteImageId: any) => {
    Swal.fire({
      title: 'Voulez-vous supprimer cette image ?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteImage({
          variables: {
            deleteImageId: deleteImageId,
          },
        }).then(() => {
          Swal.fire(
            'Supprimé !',
            'Votre image a été supprimée.',
            'success'
          );
          refetchImages();
        }).catch((error) => {
          Swal.fire(
            'Erreur',
            'Une erreur est survenue lors de la suppression de l\'image.',
            'error'
          );
          console.error(error);
        });
      }
    });
  };

  const [newImageName, setNewImageName] = useState("");
  const [isNewImageMain, setIsNewImageMain] = useState(false);

  const handleNewImageNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewImageName(e.target.value);
  };

  const handleNewImageMainChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsNewImageMain(e.target.checked);
  };

  const [addImage] = useMutation(ADD_IMAGE, {
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", "addImage", data);
      refetchImages();
    },
    onError(error) {
      console.error("%c⧭", "color: #917399", error);
    },
  });

  const handleAddImage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addImage({
      variables: {
        infos: {
          isMain: isNewImageMain,
          name: newImageName,
          product: product.id,
        },
      },
    });
  };

  const [updateImageMainStatus] = useMutation(UPDATE_IMAGE_MAIN_STATUS, {
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", "updateImageMainStatus", data);
      refetchImages();
    },
    onError(error) {
      console.error("%c⧭", "color: #917399", "updateImageMainStatus", error);
      setErrorMessage(error.message + Date.now());
    },
  });

  const handleImageMainStatus = (
    productId: string,
    imageId: any,
    isMain: boolean
  ) => {
    updateImageMainStatus({
      variables: {
        productId: productId,
        updateImageMainStatusId: imageId,
        isMain: isMain,
      },
    });
  };

  const imagesSection = () => {
    if (!imagesData || !imagesData.imagesByProduct) return null;

    return (
      <div className="form-images-product">
        <h3>Images du produit</h3>
        {imagesData.imagesByProduct.length === 0 && (
          <div>Aucune image pour ce produit.</div>
        )}
        <div>
          <h4>Ajouter une nouvelle image</h4>
          <form onSubmit={handleAddImage} className="form-add-product-image">
            <label htmlFor="imageName">Url de l'image:</label>
            <input
              type="text"
              id="imageName"
              value={newImageName}
              onChange={handleNewImageNameChange}
            />
            <label htmlFor="isMainImage">Image principale:</label>
            <input
              type="checkbox"
              id="isMainImage"
              checked={isNewImageMain}
              onChange={handleNewImageMainChange}
            />
            <button className="add-image-product" type="submit">Ajouter l'image</button>
          </form>
        </div>

        <div className="listImagesProductContainer">
          <h4>Images enregistrées :</h4>
          <div className="images-product-container">
            {imagesData.imagesByProduct.map((image: any) => (
              <div key={image.id} className="ImageProductContainer">
                <img
                  src={image.name}
                  alt={image.name}
                />
                <label>Image principale :
                <input
                  type="checkbox"
                  checked={image.isMain}
                  onChange={(e) =>
                    handleImageMainStatus(
                      product.id,
                      image.id,
                      e.target.checked
                    )
                  }
                />
                </label>
                <button onClick={() => handleDeleteImage(image.id)}>
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="modale-fiche-product-container">
      <div className="modale-fiche-product">
        <form onSubmit={handleUpdateProduct} className="form-fiche-product">
          <h3>Fiche catégorie</h3>
          <h4>{product.name}</h4>

          <label htmlFor="updateNameProduct">
            Changer le nom :
            <input
              value={name}
              id="updateNameProduct"
              type="text"
              onChange={handleName}
            />
          </label>
          {errors.name && (
            <p className="register-error-message">{errors.name}</p>
          )}

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
          {errors.size && (
            <p className="register-error-message">{errors.size}</p>
          )}

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

          <button className="update-product">Modifier</button>
          <div>{message}</div>
          <button
            className="secondary delete-product"
            onClick={() => handleDeleteProduct(product.id)}
          >
            Supprimer
          </button>
        </form>
        {imagesSection()}
      </div>
      <button onClick={() => closeModaleFicheProduct(product.id)}>
        Fermer
      </button>
    </div>
  );
}
export default ModaleFicheProduct;
