import { gql } from "@apollo/client";

export const ADD_CATEGORY = gql`
mutation addCategory($infos: CategoryRegister!) {
  addCategory(infos: $infos) {
    id
    label
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