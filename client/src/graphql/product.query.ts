import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query getProduct($productId: ID!) {
    getProductById(productId: $productId) {
      name
      id
      price
      description
      isAvailable
      size
      stock
      category {
        label
      }
    }
  }
`;

export const LIST_PRODUCT = gql`
  query Products {
    getListProducts {
      id
      name
      description
      category {
        id
        label
      }
      price
      size
      stock
      isAvailable
    }
  }
`;

export const LIST_PRODUCTS_BY_CATEGORY = gql`
  query ProductsByCategory($categoryLabel: String!) {
    getListProductsByCategory(categoryLabel: $categoryLabel) {
      id
      name
      price
      description
      isAvailable
      size
      stock
      images {
        id
        isMain
        name
      }
    }
  }
`;
