import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../graphql/product.query";
import { Product } from "../generated";
import { GET_PRODUCT_IMAGES } from "../graphql/image.query";

// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Navigation, Pagination } from "swiper/modules";

// style
import "../style/productSheet.css";

function ProductSheet(): JSX.Element {
  const { productId } = useParams();
  const navigate = useNavigate();

  // FETCH DATAS
  const { data: imagesData } = useQuery(GET_PRODUCT_IMAGES, {
    variables: {
      productId: productId,
    },
  });

  const productImages = imagesData?.getImagesByProduct || [];

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

  const product: Product = productInfos.getProductById || {};

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
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

        <Swiper
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
