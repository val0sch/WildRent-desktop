import { gql } from "@apollo/client";

export const LIST_PRODUCT = gql`
query Products {
  products {
    id
    name
    description
    category {
      label
    }
    price
    size
    stock
    isAvailable
  }
}
`;
