import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../graphql/product.query";
import { Product } from "../generated";
// style
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../style/productSheet.css";
import { GET_PRODUCT_IMAGES } from "../graphql/image.query";

function ProductSheet() {
  const { productId } = useParams();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(`/all-categories/${product.category?.label}`);
  };
  const { data: imagesData } = useQuery(GET_PRODUCT_IMAGES, {
    variables: {
      productId: productId,
    },
    onCompleted(data) {
      console.log("%c⧭", "color: #0088cc", "imagesData", data);
    },
    onError(error) {
      console.error("%c⧭", "color: #917399", error);
    },
  });

  const productImages = imagesData?.imagesByProduct || [];

  const {
    data: productInfos,
    loading,
    error,
  } = useQuery(GET_PRODUCT, {
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

  const product: Product = productInfos.product || {};

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    objectFit: "cover",
  };

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
            {productImages.map(
              (image: { id: string; name: string; isMain: boolean }) => (
                <img
                  className="slider-img"
                  key={image.name}
                  src={image.name}
                  alt={image.name}
                />
              )
            )}
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
