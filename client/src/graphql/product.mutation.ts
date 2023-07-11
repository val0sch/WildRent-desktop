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
export const UPDATE_PRODUCT = gql`
mutation updateProduct($updateProductId: String!, $infos: ProductRegister!) {
  updateProduct(id: $updateProductId, infos: $infos) {
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