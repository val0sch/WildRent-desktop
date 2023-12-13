import { gql } from "@apollo/client";

export const USER_DETAILS = gql`
  query UserDetails($userId: String!) {
    getDetailsUserConnected(id: $userId) {
      detailsUser {
        id
        name
        firstname
        lastname
        birthday
        address
      }
    }
  }
`;
