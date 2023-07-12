import { useQuery } from "@apollo/client";
import { useState } from "react";
import { LIST_PRODUCT } from "../../graphql/listProduct.query";
import ModaleFicheProduct from "./ModaleFicheProduct";

function ListProducts(): JSX.Element {
  
  const [productModalStates, setProductModalStates] = useState<boolean[]>([]);

  const handleModaleFicheProduct: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    const index = Number((event.currentTarget as HTMLButtonElement).dataset.index);
    setProductModalStates((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const closeModaleFicheProduct: (index: number) => void = (index: number) => {
    setProductModalStates((prevState) => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
  };

  const [products, setProducts] = useState([]);
  
  const { data } = useQuery(LIST_PRODUCT, {
    onCompleted(data) {
      console.log("list product", data);
      setProducts(data.products);
    },
    onError(error) {
      console.error(error);
    },
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Catégorie</th>
            <th>Prix</th>
            <th>Taille</th>
            <th>Stock</th>
            <th>Disponible</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any, index: number) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.category?.label}</td>
              <td>{product.price}</td>
              <td>{product.size}</td>
              <td>{product.stock}</td>
              <td>{product.isAvailable? "Oui": "Non"}</td>
              <td><button
                  className="secondary"
                  onClick={handleModaleFicheProduct}
                  data-index={index}
                >
                  Details
                </button></td>
                {productModalStates[index] && (
                <ModaleFicheProduct
                  handleModaleFicheProduct={handleModaleFicheProduct}
                  closeModaleFicheProduct={closeModaleFicheProduct}
                  product={product}
                />
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListProducts;
