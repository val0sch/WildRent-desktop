import { useMutation } from "@apollo/client";
import { useState, useEffect, MouseEventHandler } from "react";
import { ADD_PRODUCT } from "../../graphql/product.mutation";
import ListCategories from "../ListCategories";
import { UUID } from "crypto";

function ModaleAddProduct({
  handleModaleProduct,
  closeModaleProduct,
}: {
  handleModaleProduct: MouseEventHandler<HTMLButtonElement>;
  closeModaleProduct: () => void;
}): JSX.Element {
    
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<Number>(0);
  const [size, setSize] = useState<string>("");
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [stock, setStock] = useState<Number>(0);

  const idCategories = (idCategoryId: string) => {
    // On récupère l'id de la catégorie sélectionnée dans ListCategoriesQuery
    setCategory(idCategoryId);
  };

  const [addProductInDb, { data }] = useMutation(ADD_PRODUCT, {
    onCompleted(data) {
      closeModaleProduct();
      console.log("%c⧭", "color: #0088cc", "add Product", data);
    },
    onError(error) {
      console.log("%c⧭", "color: #917399", error);
    },
  });

  function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(String(event.target.value));
  }
  function handleChangeDescription(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(String(event.target.value));
  }
  function handleChangePrice(event: React.ChangeEvent<HTMLInputElement>) {
    setPrice(Number(event.target.value));
  }
  function handleChangeSize(event: React.ChangeEvent<HTMLInputElement>) {
    setSize(String(event.target.value));
  }
  function handleChangeStock(event: React.ChangeEvent<HTMLInputElement>) {
    setStock(Number(event.target.value));
  }

  useEffect(() => {
    setIsAvailable(stock === 0 ? false : true);
  }, [stock]);

  const handleAddProduct = () => {
    console.log(name, description, category, price, size, isAvailable, stock);
    addProductInDb({
      variables: {
        infos: {
          name,
          description,
          category,
          price,
          size,
          isAvailable,
          stock,
        },
      },
    })
  };
  return (
    <div>
      <button onClick={closeModaleProduct}>Fermer</button>
      <div>
        <ListCategories deletable={false} idCategories={idCategories} />
      </div>
      <input
        name="name"
        type="text"
        placeholder="Nom de l'equipement"
        onChange={handleChangeName}
      />
      <input
        name="description"
        type="text"
        placeholder="Description"
        onChange={handleChangeDescription}
      />
      <input
        name="price"
        type="number"
        placeholder="Prix"
        onChange={handleChangePrice}
      />
      <input
        name="size"
        type="text"
        placeholder="Size"
        onChange={handleChangeSize}
      />
      <input
        name="stock"
        type="number"
        min="0"
        placeholder="Quantité"
        onChange={handleChangeStock}
      />
      <button onClick={handleAddProduct}>Ajouter un produit</button>
      {data && (
        <p data-testid="paragraphe">
          Vous avez ajouté l'equipement : {data.addProduct.name}
        </p>
      )}
    </div>
  );
}

export default ModaleAddProduct;
