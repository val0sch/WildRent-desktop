import { gql } from "@apollo/client";

export const ADD_CART = gql`
mutation AddCart($infos: CartRegister!) {
    addCart(infos: $infos) {
      id
      state
      creation_date
    }
}
`