import { gql } from "@apollo/client";

export const GET_PRODUCTS_BY_CART = gql`
  query GetProductsByCart {
    getProductsByCart {
      name
      price
    }
  }
`;


