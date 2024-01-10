import { gql } from "@apollo/client";

export const GET_FULL_CART = gql`
  query getFullCart($cartId: ID!) {
    getFullCart(cartId: $cartId) {
      name
      price
    }
  }
`;


