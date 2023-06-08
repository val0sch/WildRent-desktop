import { gql } from "@apollo/client";

export const USER = gql`
  query User($userId: String!) {
    user(id: $userId) {
      detailsUser {
        id
      }
    }
  }

  query Login($infos: UserLogin!) {
    login(infos: $infos) {
      token
      email
    }
  }
`;
