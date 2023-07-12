import { useParams } from 'react-router-dom';

function Subcategory() {
  const { subcategory } = useParams();
  return (
    <div>Je suis la categorie : {subcategory}</div>
  )
}

export default Subcategory