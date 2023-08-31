import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../graphql/product.query";
import { Product } from "../generated";
// style
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../style/productSheet.css";

function ProductSheet() {
  const { productId } = useParams();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(`/all-categories/${product.category?.label}`);
  };

  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      productId: productId,
    },
  });

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Erreur de chargement de la fiche produit.</div>;
  }

  const product: Product = data.product || {};

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    objectFit: "cover",
  };

  const productImages = [
    "https://contents.mediadecathlon.com/m11820182/k$4e971de325c6fc1d56f401c7cd557581/sq/masque-et-tuba-de-snorkeling-combo-keewee-adult-menthe.jpg?format=auto&f=969x969",
    "https://contents.mediadecathlon.com/m11820185/k$0624aa8ed6df4b15b30fe4792532e93f/sq/masque-et-tuba-de-snorkeling-combo-keewee-adult-menthe.jpg?format=auto&f=969x969",
    "https://contents.mediadecathlon.com/p2131458/k$6185b3e6d76770102bf16f96173e5a53/sq/velo-tout-chemin-riverside-500-bleu-nuit.jpg?format=auto&f=969x969",
    "https://media.istockphoto.com/id/1205679466/fr/photo/ski-de-neige-poudreuse-le-jour-ensoleill%C3%A9.jpg?s=1024x1024&w=is&k=20&c=Cq4H3pFPVVfegsZSyOzVT-5J71ujsHOj42R2AfolP6I=",
  ];

  const handleReservation = () => {
    console.log("hello");
  };
  return (
    <div className="container">
      <div className="left-container">
        <button className="secondary" onClick={handleGoBack}>
          Retour
        </button>
        <div className="image-container">
          <Slider {...settings}>
            {productImages.map((image) => (
              <img className="slider-img" key={image} src={image} alt={image} />
            ))}
          </Slider>
        </div>
      </div>
      <div className="right-container">
        <h1>{product.name}</h1>
        <div>
          <h2>Description</h2>
          <p>{product.description}</p>
        </div>
        <div>
          <h2>Prix</h2>
          <p>{product.price} €/jour</p>
        </div>
        <div>
          <h2>Caractéristiques</h2>
          <p>{product.description}</p>
        </div>
        <div>
          <h2>Taille</h2>
          <p>{product.size}</p>
        </div>

        <button className="resa-btn" onClick={handleReservation}>
          Je réserve
        </button>
      </div>
    </div>
  );
}

export default ProductSheet;
