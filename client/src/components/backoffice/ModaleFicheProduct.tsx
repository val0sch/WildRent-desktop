import { useMutation, useQuery } from "@apollo/client";
import { DELETE_PRODUCT } from "../../graphql/product.mutation";
import { UPDATE_PRODUCT } from "../../graphql/product.mutation";
import { MouseEventHandler, useState } from "react";

function ModaleFicheProduct({
  handleModaleFicheProduct,
  closeModaleFicheProduct,
  product,
}: {
  handleModaleFicheProduct?: MouseEventHandler<HTMLButtonElement>;
  closeModaleFicheProduct?: (index: number) => void;
  product: any;
}): JSX.Element {
  const [name, setName] = useState<string>(product.name);
  const [description, setDescription] = useState<string>(product.description);
  const [price, setPrice] = useState<number>(product.price);
  const [size, setSize] = useState<string>(product.size);
  const [isAvailable, setIsAvailable] = useState<boolean>(product.isAvailable);
  const [stock, setStock] = useState<number>(product.stock);
  const [categoryId, setCategoryId] = useState<string>(product.categoryId);
  const [message, setMessage] = useState<string>("");

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };
  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };
  const handleSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(e.target.value);
  };
  const handleIsAvailable = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAvailable(e.target.checked);
  };
  const handleStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStock(Number(e.target.value));
  };
  const handleCategoryId = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const [updateProductInDb] = useMutation(UPDATE_PRODUCT, {
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", "update Product", data);
      setMessage("Vous avez modifié le produit");
    },
    onError(error) {
      console.error("%c⧭", "color: #917399", error);
    },
  });
  const handleUpdateProduct = () => {
    const updatedName = name === "" ? product.name : name;
    const updatedDescription =
      description === "" ? product.description : description;
    const updatedPrice = price === 0 ? product.price : price;
    const updatedSize = size === "" ? product.size : size;
    const updatedIsAvailable =
      isAvailable === false ? product.isAvailable : isAvailable;
    const updatedStock = stock === 0 ? product.stock : stock;
    const updatedCategoryId =
      categoryId === "" ? product.categoryId : categoryId;
    updatedName == product.name &&
    updatedDescription == product.description &&
    updatedPrice == product.price &&
    updatedSize == product.size &&
    updatedIsAvailable == product.isAvailable &&
    updatedStock == product.stock &&
    updatedCategoryId == product.categoryId
      ? setMessage("Aucune modification n'a été apporté")
      : updateProductInDb({
          variables: {
            updateProductId: product.id,
            infos: {
              name: updatedName,
              description: updatedDescription,
              price: updatedPrice,
              size: updatedSize,
              stock: updatedStock,
              isAvailable: updatedIsAvailable,
              categoryId: updatedCategoryId,
            },
          },
        });
  };

  return (
    <div>
      <div>Fiche catégorie</div>
      <div>{product.name}</div>

      <label htmlFor="updateNameProduct"> Changer le nom : </label>
      <input
        value={name}
        id="updateNameProduct"
        type="text"
        onChange={handleName}
      />

      <label htmlFor="updateDescriptionProduct">
        {" "}
        Changer la description :{" "}
      </label>
      <input
        value={description}
        id="updateDescriptionProduct"
        type="text"
        onChange={handleDescription}
      />

      <label htmlFor="updatePriceProduct"> Changer le prix : </label>
      <input
        value={price}
        id="updatePriceProduct"
        type="number"
        onChange={handlePrice}
      />

      <label htmlFor="updateSizeProduct"> Changer la taille : </label>
      <input
        value={size}
        id="updateSizeProduct"
        type="text"
        onChange={handleSize}
      />

      <label htmlFor="updateStockProduct"> Changer la quantité : </label>
      <input
        value={stock}
        id="updateStockProduct"
        type="number"
        onChange={handleStock}
      />

      <label htmlFor="updateIsAvailableProduct">
        {" "}
        Le produit est visible :{" "}
      </label>
      <input
        id="updateIsAvailableProduct"
        type="checkbox"
        checked={isAvailable}
        onChange={handleIsAvailable}
      />

      <label htmlFor="updateCategoryIdProduct"> Changer la catégorie : </label>
      <input
        value={categoryId}
        id="updateCategoryIdProduct"
        type="text"
        onChange={handleCategoryId}
      />

      <button onClick={handleUpdateProduct}>modifier</button>
      <button
        className="secondary"
        onClick={() => handleDeleteProduct(product.id)}
      >
        Supprimer
      </button>
      <div>{message}</div>
    </div>
  );
}
export default ModaleFicheProduct;
