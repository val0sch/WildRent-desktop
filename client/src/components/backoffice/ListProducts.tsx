import { useState } from "react";
import ModaleFicheProduct from "./ModaleFicheProduct";
import DataTable from "react-data-table-component";
import { Product } from "../../generated";

function ListProducts({
  products,
  updatedProduct,
}: {
  products: Product[];
  updatedProduct: () => void;
}): JSX.Element {
  const [productModalStates, setProductModalStates] = useState<boolean[]>([]);
  const [index, setIndex] = useState<any>("");

  const handleModaleFicheProduct = (index: any) => {
    setIndex(index);
    setProductModalStates((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const closeModaleFicheProduct: (index: number) => void = (index: number) => {
    updatedProduct();
    setProductModalStates((prevState) => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
  };

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
      selector: (row: any) => (row.category?.label ? row.category?.label : ""),
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
          onClick={() => handleModaleFicheProduct(row.id)}
        >
          Details
        </button>
      ),
    },
  ];
  const conditionalRowStyles = [
    {
      when: (row: any) => row.isAvailable === false,
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
          product={products.find((product: Product) => product.id === index)}
          updatedProduct={updatedProduct}
        />
      )}
    </div>
  );
}

export default ListProducts;
