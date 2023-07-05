import { gql } from "@apollo/client";

export const USER = gql`
  query User($userId: String!) {
    user(id: $userId) {
      detailsUser {
        id
      }
    }
  }
`;
