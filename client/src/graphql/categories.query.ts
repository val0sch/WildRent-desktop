import { gql } from "@apollo/client";

export const LIST_CATEGORIES = gql`
  query listCategories {
    getListCategories {
      id
      label
      imageUrl
    }
  }
`;