import { useQuery } from "@apollo/client";
import { LIST_CATEGORIES } from "../../graphql/Categories.query";
import { MouseEventHandler, useState } from "react";
import ModaleFicheCategory from "./ModaleFicheCategory";
import DataTable from "react-data-table-component";
import { Category } from "../../generated";


function ListCategories(): JSX.Element {
  const [categoryModalStates, setCategoryModalStates] = useState<boolean[]>([]);
  const [index, setIndex] = useState<any>("");

  const handleModaleFicheCategory: MouseEventHandler<HTMLButtonElement> = (index:any) => {
    setIndex(index);
    setCategoryModalStates((prevState) => {
      const newState = [...prevState];
      
      newState[index] = !newState[index];
      return newState;
    });
  };

  const closeModaleFicheCategory: (index: number) => void = (index: number) => {
    setCategoryModalStates((prevState) => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
  };

  /// LIST CATEGORIES
  const [categories, setCategories] = useState<Category[]>([]);
  const { data } = useQuery(LIST_CATEGORIES, {
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", "Liste des catégories : ", data);
      setCategories(data.categories);
    },
    onError(error) {
      console.error(error);
    },
  });

  const columns: any = [
    {
      name: "Catégorie",
      selector: "label",
      sortable: true,
      className: "testForCss",
    },
    {
      name: "Image",
      selector: "imageUrl",
      sortable: true,
      cell: (row: any) => (
        <img src={row.imageUrl} alt="image de la catégorie" height={75} />
      ),
    },
    {
      name: "Actions",
      button: true,
      ignoreRowClick: true,
      cell: (row: any) => (
        <button
          style={{ fontSize: 14 }}
          className="secondary"
          onClick={()=>handleModaleFicheCategory(row.id)}
        >
          Details
        </button>
      )
    },
  ];

  return (
    <div>
      <DataTable columns={columns} data={categories} pagination />
      {categoryModalStates[index] && (
        <ModaleFicheCategory
          handleModaleFicheCategory={handleModaleFicheCategory}
          closeModaleFicheCategory={closeModaleFicheCategory}
          category={categories.find((category: any) => category.id === index)}
        />
      )}
    </div>
  );
}

export default ListCategories;
