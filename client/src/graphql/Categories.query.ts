import { gql } from "@apollo/client";

export const LIST_CATEGORIES = gql`
query listCategories {
  categories {
    id
    label
    imageUrl
  }
}
`

export const CATEGORY = gql`
query getCategory($categoryId: String!) {
  category(id: $categoryId) {
    imageUrl
    label
  }
}
`