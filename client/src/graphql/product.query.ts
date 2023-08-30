import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query getProduct($productId: String!) {
    product(productId: $productId) {
      name
      id
      price
      description
      isAvailable
      size
      stock
    }
  }
`;
