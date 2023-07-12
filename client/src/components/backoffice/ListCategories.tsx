import { useQuery } from "@apollo/client";
import { LIST_CATEGORIES } from "../../graphql/Categories.query";
import { MouseEventHandler, useState } from "react";
import ModaleFicheCategory from "./ModaleFicheCategory";

function ListCategories(): JSX.Element {

  const [categoryModalStates, setCategoryModalStates] = useState<boolean[]>([]);

  const handleModaleFicheCategory: MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    const index = Number((event.currentTarget as HTMLButtonElement).dataset.index);
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

  const [message, setMessage] = useState<string>("");

  /// LIST CATEGORIES
  const { data } = useQuery(LIST_CATEGORIES, {
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", "Liste des catégories : ", data);    
      setCategoryModalStates(Array(data.categories.length).fill(false));
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
            <th>Catégorie</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {data?.categories.map((category: any, index: number) => (
            <tr key={index}>
              <td>{category?.label}</td>
              <td><img src={category?.imageUrl} alt="image de la catégorie" height={75}/></td>
              <td>
                <button
                  className="secondary"
                  onClick={handleModaleFicheCategory}
                  data-index={index}
                >
                  Details
                </button>
              </td>
              {categoryModalStates[index] && (
                <ModaleFicheCategory
                  handleModaleFicheCategory={handleModaleFicheCategory}
                  closeModaleFicheCategory={closeModaleFicheCategory}
                  category={category}
                  index={index}
                />
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div>{message}</div>
    </div>
  );
}

export default ListCategories;
