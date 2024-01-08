import { gql } from "@apollo/client";

export const ADD_PRODUCT_WITH_IMAGES = gql`
  mutation AddProductWithImages($infos: ProductRegister!) {
    addProductWithImages(infos: $infos) {
      id
      name
      description
      price
      size
      stock
      isAvailable
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($updateProductId: ID!, $infos: ProductRegister!) {
    updateProduct(id: $updateProductId, infos: $infos) {
      name
      description
      price
      size
      stock
      isAvailable
      category {
        id
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($deleteProductId: ID!) {
    deleteProduct(id: $deleteProductId) {
      id
    }
  }
`;