import { gql } from "@apollo/client";

export const GET_PRODUCT_IMAGES = gql`
  query ImagesByProduct($productId: String!) {
    getImagesByProduct(productId: $productId) {
      id
      isMain
      name
    }
  }
`;
