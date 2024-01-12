import { gql } from "@apollo/client";

export const LIST_USERS = gql`
  query getListUsers {
    getListUsers {
      email
    }
  }
`;
