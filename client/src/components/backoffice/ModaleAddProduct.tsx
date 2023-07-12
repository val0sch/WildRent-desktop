import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect, MouseEventHandler } from "react";
import { ADD_PRODUCT } from "../../graphql/product.mutation";
import { LIST_CATEGORIES } from "../../graphql/Categories.query";

import "../../style/backoffice.css"

function ModaleAddProduct({
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

  const [message, setMessage] = useState<string>("");

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
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    setIsAvailable(stock === 0 ? false : true);
  }, [stock]);

  const handleAddProduct = () => {
    const selectedCategoryId = category === "" ? null : category;
    addProductInDb({
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
  };
  return (
    <div className="modale-add-product">
      <div className="modale-add-product-form">
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
          placeholder="Taille"
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

        <div>{message}</div>
      </div>
      <button className="secondary" onClick={closeModaleProduct}>Fermer</button>
    </div>
  );
}

export default ModaleAddProduct;
