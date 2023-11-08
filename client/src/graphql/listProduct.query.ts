import { gql } from "@apollo/client";

export const LIST_PRODUCT = gql`
  query Products {
    products {
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
    productsByCategory(categoryLabel: $categoryLabel) {
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
