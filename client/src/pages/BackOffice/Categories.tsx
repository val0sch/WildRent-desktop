import { Link } from "react-router-dom";
import AddCategory from "../../components/AddCategory";
import ListCategories from "../../components/ListCategories";

function Categories(): JSX.Element {

  return (
    <div>
      Catégories
      <div>
        <ListCategories deletable={true}/>
        <AddCategory />
      </div>
      <div>
        <button>
          <Link to={"/back-office"}>Retour</Link>
        </button>
      </div>
    </div>
  );
}

export default Categories;