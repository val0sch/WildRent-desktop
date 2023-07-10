import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
mutation AddProduct($infos: ProductRegister!) {
  addProduct(infos: $infos) {
    id
    name
    description
    price
    size
    stock
    isAvailable
  }
}
`
export const DELETE_PRODUCT = gql`
mutation deleteProduct($deleteProductId: String!) {
  deleteProduct(id: $deleteProductId) {
    id
  }
}
`