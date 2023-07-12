import { gql } from "@apollo/client";

export const ADD_CATEGORY = gql`
mutation addCategory($infos: CategoryRegister!) {
  addCategory(infos: $infos) {
    id
    label
    imageUrl
  }
}
`
export const UPDATE_CATEGORY = gql`
mutation updateCategory($updateCategoryId: String!, $infos: CategoryRegister!) {
  updateCategory(id: $updateCategoryId, infos: $infos) {
    label
    imageUrl
  }
}
`

export const DELETE_CATEGORY = gql`
mutation deleteCategory($deleteCategoryId: String!) {
  deleteCategory(id: $deleteCategoryId) {
    id
  }
}
`