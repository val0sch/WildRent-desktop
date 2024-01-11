import { gql } from "@apollo/client";

export const GET_FULL_CART = gql`
  query getFullCart {
    getFullCart {
      id
      start_rent_date
      due_rent_date
      isFavorite
      cart {
        id
        state
        creation_date
      }
      quantity
      productId
      product{
        name
        price
      }
    }
  }
`;
