import { gql } from "@apollo/client";

export const USER_DETAILS = gql`
  query UserDetails($user: any) {
    getDetailsUserConnected(user: $user) {
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
