import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../graphql/product.query";
import { Product } from "../generated";
// style
// *************
//Slider slick
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
//************** */
// import Swiper JS
import Swiper from "swiper";
// import Swiper styles
import "swiper/css";

import "../style/productSheet.css";
import { GET_PRODUCT_IMAGES } from "../graphql/image.query";

function ProductSheet() {
  const { productId } = useParams();
  const navigate = useNavigate();

  // FETCH DATAS
  const { data: imagesData } = useQuery(GET_PRODUCT_IMAGES, {
    variables: {
      productId: productId,
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

  // settings Slider
  // var settings = {
  //   customPaging: function (i: any) {
  //     return (
  //       // eslint-disable-next-line jsx-a11y/anchor-is-valid
  //       <a>
  //         <img
  //           height="110px"
  //           width="150px"
  //           src={`${productImages[i]?.name}`}
  //           alt="équipement"
  //         />
  //       </a>
  //     );
  //   },
  //   dots: true,
  //   dotsClass: "slick-dots slick-thumb",
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  //Swiper
  const swiper = new Swiper(".swiper", {
    // Optional parameters
    direction: "vertical",
    loop: true,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // And if we need scrollbar
    scrollbar: {
      el: ".swiper-scrollbar",
    },
  });

  // Handle functions
  const handleReservation = () => {
    console.log("hello");
  };

  const handleGoBack = () => {
    navigate(`/all-categories/${product.category?.label}`);
  };
  return (
    <div className="container">
      <div className="img-container">
        <button className="secondary" onClick={handleGoBack}>
          Retour
        </button>
        {/* <Slider {...settings}>
          {productImages.map(
            (image: { id: string; name: string; isMain: boolean }) => (
              <img key={image.name} src={image.name} alt={image.name} />
            )
          )}
        </Slider> */}

        <div className="swiper">
          <div className="swiper-wrapper">
            {productImages.map(
              (image: { id: string; name: string; isMain: boolean }) => (
                <div className="swiper-slide">
                  <img key={image.name} src={image.name} alt={image.name} />
                </div>
              )
            )}
          </div>
          <div className="swiper-pagination"></div>

          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>

          <div className="swiper-scrollbar"></div>
        </div>
      </div>
      <div className="text-container">
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
