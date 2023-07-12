import { useQuery } from "@apollo/client";
import { MouseEventHandler, useState } from "react";
import { LIST_PRODUCT } from "../../graphql/listProduct.query";
import ModaleFicheProduct from "./ModaleFicheProduct";
import DataTable from "react-data-table-component";
import { Product } from "../../generated";

function ListProducts(): JSX.Element {
  const [productModalStates, setProductModalStates] = useState<boolean[]>([]);
  const [index, setIndex] = useState<any>("");

  const handleModaleFicheProduct: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    setIndex((event.currentTarget as HTMLButtonElement).dataset.index);
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

  /// LIST PRODUCTS
  const [products, setProducts] = useState<Product[]>([]);
  const { data } = useQuery(LIST_PRODUCT, {
    onCompleted(data) {
      console.log("list product", data);
      setProducts(data.products);
    },
    onError(error) {
      console.error(error);
    },
  });

  const columns: any = [
    {
      name: "Nom",
      selector: "name",
      sortable: true,
    },
    {
      name: "Description",
      selector: "description",
      sortable: true,
    },
    {
      name: "Catégorie",
      selector: "category.label",
      sortable: true,
    },
    {
      name: "Prix",
      selector: "price",
      sortable: true,
    },
    {
      name: "Taille",
      selector: "size",
      sortable: true,
    },
    {
      name: "Stock",
      selector: "stock",
      sortable: true,
    },
    {
      name: "Disponible",
      selector: "isAvailable",
      cell: (row: any) => (row.isAvailable ? "Oui" : "Non"),
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      ignoreRowClick: true,
      cell: (row: any) => (
        <button
          style={{ fontSize: 14 }}
          className="secondary"
          onClick={handleModaleFicheProduct}
          data-index={row.id}
        >
          Details
        </button>
      )
    },
  ];
  const conditionalRowStyles = [
    {
      when: (row: any) => row.isAvailable == false,
      style: {
        backgroundColor: "lightgrey",
        color: "white",
      },
    },
  ];
  return (
    <div>
      <DataTable
        columns={columns}
        data={products}
        pagination
        conditionalRowStyles={conditionalRowStyles}
      />
      {productModalStates[index] && (
        <ModaleFicheProduct
          handleModaleFicheProduct={handleModaleFicheProduct}
          closeModaleFicheProduct={closeModaleFicheProduct}
          product={products.find((product: any) => product.id === index)}
          index={index}
        />
      )}
    </div>
  );
}

export default ListProducts;
