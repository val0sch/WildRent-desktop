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
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Pagination } from "swiper/modules";

import "../style/productSheet.css";
import { GET_PRODUCT_IMAGES } from "../graphql/image.query";

function ProductSheet(): JSX.Element {
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
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

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

        <Swiper
          // pagination={{
          //   type: "fraction",
          // }}
          pagination={pagination}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {productImages.map(
            (image: { id: string; name: string; isMain: boolean }) => (
              <SwiperSlide>
                <img key={image.name} src={image.name} alt={image.name} />
              </SwiperSlide>
            )
          )}
        </Swiper>
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
