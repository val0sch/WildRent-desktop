import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LIST_PRODUCT } from "../graphql/listProduct.query";
import { DELETE_PRODUCT } from "../graphql/product.mutation";

function ListProducts(): JSX.Element {
  
  useEffect(() => {
    getList();
  }, []);

  const [products, setProducts] = useState([]);
  
  const [getList, { data }] = useLazyQuery(LIST_PRODUCT, {
    onCompleted(data) {
      console.log("list product", data);
      setProducts(data.products);
    },
    onError(error) {
      console.error(error);
    },
  });

  const [deleteProductInDb] = useMutation(DELETE_PRODUCT, {
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", "Suppression : " , data);
      
    },
    onError(error) {
      console.error("%c⧭", "color: #917399", error);
    },
  });
  
  const handleDeleteProduct = (deleteProductId: String) => {
    console.log("%c⧭", "color: #0088cc", "productId : " , deleteProductId);
    deleteProductInDb({
      variables: {
        deleteProductId
      },
    });
  };

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any, index: number) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.category.label}</td>
              <td>{product.price}</td>
              <td>{product.size}</td>
              <td>{product.stock}</td>
              <td><button>modifier</button><button onClick={()=>handleDeleteProduct(product.id)}>Supprimer</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListProducts;
